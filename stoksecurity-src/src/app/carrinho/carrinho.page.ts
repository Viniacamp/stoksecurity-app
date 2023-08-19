import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { take } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  items: any[] = [];
  isCartEmpty = true;
  cartMessage = '';

  constructor(private itemService: ItemService, private alertController: AlertController, private navCtrl: NavController)  { }   
  
  ngOnInit() {
    const cartItems = this.itemService.cart.subscribe((cartItems: { [itemId: string]: number }) => {

    this.itemService.getItems()
      .pipe(take(1))
      .subscribe((allItems: any[]) => {
        this.items = allItems
          .filter(item => cartItems[item.id]) // Filtra apenas os itens presentes no carrinho
          .map(item => {
            return {
              ...item,
              count: cartItems[item.id], // Adiciona a propriedade 'count' com a quantidade selecionada
            };
          });
        
        if (this.items.length === 0) {
          this.cartMessage = 'Seu carrinho está vazio';
        } else {
          this.cartMessage = '';
        }
        
        this.isCartEmpty = this.items.length === 0;  
        console.log('Itens', this.items);
      });
  });

  }

  removerItem(event: any, item: any) {
    event.stopPropagation();
    this.itemService.removeFromCart(item.id);
  }  

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Concluido',
      message: 'Sua solicitação foi enviada com sucesso!',
      buttons: ['OK'],
    });

    await alert.present();
    this.itemService.checkoutCart();
  }
  
  goBack(){
    this.navCtrl.pop()
  }
}