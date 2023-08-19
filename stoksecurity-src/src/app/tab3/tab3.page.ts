
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { SolicitacaoService } from '../services/solicitacao.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Query } from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  requests: any;
  solicitacoes: any[] = [];
  itemsCollection!: AngularFirestoreCollection;
  ordem: 'desc' | 'asc' = 'desc';
  items: any;  
  
  constructor(private alertController: AlertController, private solicitacaoService: SolicitacaoService, private itemService: ItemService, private afs: AngularFirestore){}

  ngOnInit(){
    this.requests = this.solicitacaoService.getRequests();
    this.orderRequests();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  orderRequests() {
    this.itemsCollection = this.afs.collection('solicitacoes', (ref: Query) => {
      return ref.orderBy('lastUpdate', this.ordem);
    });
  
    this.requests = this.itemsCollection.valueChanges({ idField: 'id' });
  }

  async loadSolicitacoes() {
    this.afs.collection('solicitacoes').valueChanges().subscribe((solicitacoes: any[]) => {
      this.solicitacoes = solicitacoes;
      this.solicitacoes.forEach((solicitacao) => {
        solicitacao.produtos.forEach(async (produto: any) => {
          const item = await this.itemService.getItemById(produto.id).toPromise();
          produto.detalhes = item;
        });
      });
    });
  }  

  removerRequest(event: any, request: any) {
    event.stopPropagation();
    this.solicitacaoService.removeRequest(request.id);
  } 
  
  async presentAlertAp() {
    const alert = await this.alertController.create({
      header: 'Detalhes da solicitação',
      subHeader: '',
      message: '<div>Solitação aprovada! Vá até o local de retirada e mostre o QRCode abaixo para retirar os seus epis</div><center><img src="https://chart.googleapis.com/chart?chs=180x180&cht=qr&chl="http://127.0.0.1:5500/src/app/tab3/tab3.page.html"><center>',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertP() {
    const alert = await this.alertController.create({
      header: 'Detalhes da solicitação',
      subHeader: '',
      message: 'Solicitação em andamento. Aguarde',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertRej() {
    const alert = await this.alertController.create({
      header: 'Detalhes da solicitação',
      subHeader: '',
      message: 'Solicitação rejeitada! Motivo: solicitação do mesmo tipo já foi feita anteriormente',
      buttons: ['OK'],
  });

    await alert.present();

  }
}
