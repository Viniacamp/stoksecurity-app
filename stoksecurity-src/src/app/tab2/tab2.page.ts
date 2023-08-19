import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection, Query } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { ItemService } from '../services/item.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  items: any;
  public searchTerm!: string;
  itemsCollection!: AngularFirestoreCollection;
  ordem: any;

  constructor(private afs: AngularFirestore, private modal: ModalController, private itemService: ItemService, private navCtrl: NavController) {}

  ngOnInit(){
    this.items = this.itemService.getItems();
  }

  goToItemDetails(itemId: string) {
    this.navCtrl.navigateForward(`/protetorp/${itemId}`);
  }

  orderItems() {
    this.itemsCollection = this.afs.collection('estoque', (ref: Query) => {
      return ref.orderBy('nome', this.ordem);
    });
  
    this.items = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  cancel() {
    this.modal.dismiss(null, 'Cancelar');
  }

  confirm() {
    this.modal.dismiss(null, 'Aplicar');
  }

}