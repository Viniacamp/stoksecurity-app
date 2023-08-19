import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage {

  constructor(private navCtrl: NavController, private storage: Storage, private rendener: Renderer2) {
    this.init();
   }

  async init() {
    await this.storage.create();
  }

  onActivateDarkMode(event: any) {
    if (event.detail.checked) {
      this.rendener.setAttribute(document.body, 'color-theme', 'dark');
      this.rendener.setAttribute(this.storage.set, 'color-theme', 'dark');
    } else {
      this.rendener.setAttribute(document.body, 'color-theme', 'light');
      this.rendener.setAttribute(this.storage.set, 'color-theme', 'light');
    }
  }

  goBack(){
    this.navCtrl.pop()
  }

}
