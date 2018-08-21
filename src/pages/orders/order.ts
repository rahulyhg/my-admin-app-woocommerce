import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  WooCommerce: any;
  orders: any[];
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;
  categoryId: number;
  categoryTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private WP: WoocommerceProvider
  ) {}

  ionViewWillEnter() {
      
      let loading = this.loadingCtrl.create();
      loading.present();

      this.WooCommerce = this.WP.init();
	  this.WooCommerce.getAsync("orders").then( (data) => {
        console.log(JSON.parse(data.body));
        this.orders = JSON.parse(data.body);
      }, (err) => {
        console.log(err);
      });
      setTimeout(() => {
		loading.dismiss();
	  }, 3000);
      
	  
  }

  
  
  itemTapped(event, order) {
		this.navCtrl.push('OrderDetailPage', {order});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.orders.length/10)) + 1;
    let loading = true;

   
  }

}
