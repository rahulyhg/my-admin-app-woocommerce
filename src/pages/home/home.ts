import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Slides } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  WooCommerce: any;
  categories: any[];
  cate: any;
  @ViewChild('categorySlides') categorySlides: Slides;
  
  constructor(public navCtrl: NavController, private WP: WoocommerceProvider) {
	this.WooCommerce = WP.init();
	this.WooCommerce.getAsync("products/categories?per_page=100").then( (data) => {
      console.log(JSON.parse(data.body));
      this.categories = JSON.parse(data.body);
    }, (err) => {
      console.log(err);
    });
	
  }
  
  itemTapped(event, category) {
	this.navCtrl.push('ProductsByCategoryPage', {category});
  }
  
}
