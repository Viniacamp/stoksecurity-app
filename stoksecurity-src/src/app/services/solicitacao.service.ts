import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage-angular'
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
  requestCollection: AngularFirestoreCollection;
  request = '' 
  
  constructor(private afs: AngularFirestore) { 
    this.requestCollection = this.afs.collection('solicitacoes');
  }

  getRequests(){
    return this.requestCollection.valueChanges( {idField: 'id'});
  }

  getRequestById(requestId: string) {
    return this.requestCollection.doc(requestId).snapshotChanges().pipe(
      map((snapshot) => {
        const request = snapshot.payload.data();
        const id = snapshot.payload.id;
        return { id, ...request };
      })
    );
  }

  removeRequest(id: string){
    this.afs.collection('solicitacoes').doc(this.request).update({
      [id]: firebase.firestore.FieldValue.delete()
    });
  }
}
