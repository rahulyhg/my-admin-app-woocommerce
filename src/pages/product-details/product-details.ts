import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, LoadingController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public toastCtrl: ToastController, 
			  public modalCtrl: ModalController, 
			  private WP: WoocommerceProvider, 
			  private alertCtrl: AlertController,
			  public loadingCtrl: LoadingController) {

    this.product = this.navParams.get("product");
    console.log(this.product);
	
  }

  editProduct() {
    let editProduct = this.product;
	this.navCtrl.push('EditProductPage', {editProduct});
  }
  
  deleteProduct() {
	
	  let alert = this.alertCtrl.create({
		title: 'Delete Product',
		message: 'Are you sure to delete this product?',
		buttons: [
		  {
			text: 'No',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Yes',
			handler: () => {
			    this.WooCommerce = this.WP.init();
				this.WooCommerce.deleteAsync("products/" + this.product.id + "?force=true").then( (data) => {
				  console.log(JSON.parse(data.body));
				  this.navCtrl.push("ProductsByCategoryPage", { category : this.product.categories[0]});
				}, (err) => {
				  console.log(err);
				});
			}
		  }
		]
	  });
	  alert.present();
	}
  
}
