import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  constructor(private modal: ModalController, private navCtrl: NavController) { }

  cancel(){
    this.modal.dismiss(null, 'cancelar');
  }

  confirm(){
    this.modal.dismiss(null, 'Aplicar');
  }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.pop()
  }
}
