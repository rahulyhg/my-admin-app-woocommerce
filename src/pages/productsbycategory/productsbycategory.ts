import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {
	this.category = this.navParams.get("category");
	console.log(this.category);
	
	this.WooCommerce = this.WP.init();
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsbycategoryPage');
    this.WooCommerce.getAsync("products?filter[product_cat]=" + this.category.slug).then( (data) => {
      this.productsbycategory = JSON.parse(data.body);
      console.log(this.productsbycategory);
    }, (err) => {
      console.log(err);
    });
  }

}
