import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-alterarsenha',
  templateUrl: './alterarsenha.page.html',
  styleUrls: ['./alterarsenha.page.scss'],
})
export class AlterarsenhaPage implements OnInit {
email!: string;

  constructor(private afAuth: AngularFireAuth, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
    
  }

  async changePassword() {
    const user = await this.afAuth.currentUser;
    //if (user) {
    // const email = user.email;
      if (this.email) {
        firebase.auth().sendPasswordResetEmail(this.email)
          .then(() => {
            this.presentAlert('Sucesso', 'Um e-mail de redefinição de senha foi enviado.');
          })
          .catch((error) => {
            this.presentAlert('Erro', 'O e-mail inserido não está cadastrado no sistema ou está incorreto. Tente novamente');
            console.log(error);
          });
      }
   //}
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  }
