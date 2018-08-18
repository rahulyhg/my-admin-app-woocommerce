import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public modalCtrl: ModalController, private WP: WoocommerceProvider, private loadingCtrl: LoadingController) {

    this.product = this.navParams.get("product");
    console.log(this.product);
	
  }

  editProduct() {
    let editProduct = this.product;
	this.navCtrl.push('EditProductPage', {editProduct});
  }
}
