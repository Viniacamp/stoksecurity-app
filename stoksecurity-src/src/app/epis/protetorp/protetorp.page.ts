import { AfterViewInit, Component, OnInit} from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-protetorp',
  templateUrl: './protetorp.page.html',
  styleUrls: ['./protetorp.page.scss'],
})

export class ProtetorpPage implements OnInit {
  count = 0;
  items: any;
  cart: { [itemId: string]: number } = {};
  itemId!: string;
  item: any;

  constructor(private navCtrl: NavController, private itemService: ItemService, private route: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit(){
    this.items = this.itemService.getItems();
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;
    if (this.itemId) {
      this.itemService.getItemById(this.itemId).subscribe(item => {
        this.item = item;
      });
    }
    this.itemService.cart.subscribe(value => {
      console.log('My cart now: ', value);
      this.cart = value;
    });
  }

    menorZero(){
      return this.count === 0;
    }

    maiorTres(){
      return this.count === 3;
    }

    addToCart(event: any, item: any){
      event.stopPropagation();
      this.itemService.addToCart(item.id);
    }

    removeFromCart(event: any, item: any){
      event.stopPropagation();
      this.itemService.removeFromCart(item.id);
    }

  goBack(){
    this.navCtrl.pop()
  }

  async alert(){
    try {
      const alert = await this.alertController.create({
        header: 'Concluído',
        message: 'Item adicionado ao carrinho!',
        buttons: ['OK']
      })

      await alert.present();
      
    } catch (error) {
      console.error(error);
}

}

}
