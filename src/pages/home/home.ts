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
  
  constructor(public navCtrl: NavController, public WP: WoocommerceProvider) {
	//this.WooCommerce = this.WP.init();
	//this.WooCommerce.getAsync("products/categories").then( (data) => {
      //console.log(JSON.parse(data.body));
      //this.categories = JSON.parse(data.body);
    //}, (err) => {
      //console.log(err);
    //});
    
    this.WP.getCategories().then(data => {
		console.log(JSON.parse(data.body));
		this.categories = JSON.parse(data.body);
    });
	
  }
  
  itemTapped(event, category) {
	this.navCtrl.push('ProductsByCategoryPage', {category});
  }
  
}
