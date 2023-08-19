import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import 'firebase/firestore';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  openCapacitorSite = async () => {
    await Browser.open({ url: 'http://google.com/' });
  };

  logout(){
    this.afAuth.signOut()
    .then(() => {
      this.router.navigate(['/']);
    })
    .catch((error) => {
      alert('Erro. Tente Novamente');
    })
  }
  
}
