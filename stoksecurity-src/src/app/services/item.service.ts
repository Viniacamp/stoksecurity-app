import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage-angular'
import firebase from '@firebase/app-compat';

const CART_STORAGE_KEY = 'MY_CART';

const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  cart = new BehaviorSubject({});
  itemsCollection: AngularFirestoreCollection;
  cartKey = '';

  constructor(private afs: AngularFirestore, private storage: Storage) { 
    this.init();
    this.itemsCollection = this.afs.collection('estoque');
    this.loadCart();
  }

  init(){
    this.storage.create();
  }
  
  getItems(){
    return this.itemsCollection.valueChanges( {idField: 'id'});
  }

  getItemById(itemId: string) {
    return this.itemsCollection.doc(itemId).snapshotChanges().pipe(
      map((snapshot) => {
        const item = snapshot.payload.data();
        const id = snapshot.payload.id;
        return { id, ...item };
      })
    );
  }

  async loadCart(){
    const result = await this.storage.get(CART_STORAGE_KEY);
    console.log('Cart from storage: ', result);

      if(result) {
        this.cartKey = result;
        
        this.afs.collection('carrinho').doc(this.cartKey).valueChanges().subscribe((result: any) => {
          console.log('cart changed: ', result);
          this.cart.next(result || {});
        });
        
      } else {
        const fbDocument = await this.afs.collection('carrinho').add({
          lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('new cart: ', fbDocument);
        this.cartKey = fbDocument.id;
        await this.storage.set( CART_STORAGE_KEY, this.cartKey )
      }
  }

  addToCart(id: string){
    console.log('id:', id);

    this.afs.collection('carrinho').doc(this.cartKey).update({
      [id]: INCREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    this.itemsCollection.doc(id).update({
      qt_estoque: DECREMENT
    });
  }

  removeFromCart(id: string){
    this.afs.collection('carrinho').doc(this.cartKey).update({
      [id]: DECREMENT,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    });

    this.itemsCollection.doc(id).update({
      qt_estoque: INCREMENT
    });
  }

  async checkoutCart(){
    await this.afs.collection('solicitacoes').add(this.cart.value);

    this.afs.collection('carrinho').doc(this.cartKey).set({
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    })
  }
}
