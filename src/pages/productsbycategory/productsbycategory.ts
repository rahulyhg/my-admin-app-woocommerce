import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

/**
 * Generated class for the ProductsbycategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productsbycategory',
  templateUrl: 'productsbycategory.html',
})
export class ProductsByCategoryPage {

  category: any;
  productsbycategory: any[] = [];
  WooCommerce: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider, public loadingCtrl: LoadingController) {
	this.category = this.navParams.get("category");
	console.log(this.category);
	let loading = this.loadingCtrl.create();

    loading.present();    
	this.WooCommerce = this.WP.init();
	this.WooCommerce.getAsync("products?filter[product_cat]=" + this.category.slug).then( (data) => {
      this.productsbycategory = JSON.parse(data.body);
      console.log(this.productsbycategory);
    }, (err) => {
      console.log(err);
    });
  setTimeout(() => {
	loading.dismiss();
  }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsbycategoryPage');
    
  }
  
  itemTapped(event, product) {
	this.navCtrl.push('ProductDetails', {product});
  }

}
