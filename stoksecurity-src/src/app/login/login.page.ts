import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public navCtrl: NavController,
    private alertController: AlertController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadSavedCredentials();
    });
  }

  saveCredentials(email: string, password: string) {
    const credentials = {
      email: email,
      password: password,
    };
  
    localStorage.setItem('savedCredentials', JSON.stringify(credentials));
  }

  loadSavedCredentials() {
    const savedCredentials = localStorage.getItem('savedCredentials');
  
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      this.email = credentials.email;
      this.password = credentials.password;
    }
  }

  email!: string;
  password!: string;

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );

      this.router.navigate(['tabs/tabs/tab1']);
    } catch(error){
      const alert = await this.alertController.create({
        header: 'Dados incorretos',
        message: 'O e-mail ou senha digitados estão incorretos. Por favor, tente novamente.',
        buttons: ['OK']
      })

      await alert.present();
    }
  }
}
