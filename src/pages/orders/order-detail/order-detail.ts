import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { WoocommerceProvider } from '../../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

/**
 * Generated class for the QuotesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
 
  orderform: string = "order-item";
  WooCommerce: any;
  order: any;
  items: any;
  billing: any;
  categories: Array<any> = new Array<any>();
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public actionSheetCtrl: ActionSheetController,
			  private WP: WoocommerceProvider) {
    this.order = this.navParams.get('order');
    this.billing = this.order.billing;
    this.items = this.order.line_items;
    console.log(this.items);
  }

  confirmOrder(){
	this.WooCommerce = this.WP.init();
	
	const actionSheet = this.actionSheetCtrl.create({
	  title: 'Change Your Order Status ...',
	  cssClass: 'myaction',
	  buttons: [
	    {
		  text: 'Processing',
		  cssClass: 'processing',
		  handler: () => {
			let data = {
			  status: 'processing'
			};
			 this.WooCommerce.putAsync("orders/" + this.order.id, data).then( (data) => {
			  console.log(JSON.parse(data.body));
			  this.navCtrl.push("OrderPage");
			}, (err) => {
			  console.log(err);
			});
		  }
		},
	    {
		  text: 'On Hold',
		  cssClass: 'onhold',
		  handler: () => {
			let data = {
			  status: 'on-hold'
			};
			 this.WooCommerce.putAsync("orders/" + this.order.id, data).then( (data) => {
			  console.log(JSON.parse(data.body));
			  this.navCtrl.push("OrderPage");
			}, (err) => {
			  console.log(err);
			});
		  }
		},
		{
		  text: 'Complete',
		  cssClass: 'complete',
		  handler: () => {
			let data = {
			  status: 'completed'
			};
			 this.WooCommerce.putAsync("orders/" + this.order.id, data).then( (data) => {
			  console.log(JSON.parse(data.body));
			  this.navCtrl.push("OrderPage");
			}, (err) => {
			  console.log(err);
			});
		  }
		},
		{
		  text: 'Pending',
		  cssClass: 'pending',
		  handler: () => {
			let data = {
			  status: 'pending'
			};
			 this.WooCommerce.putAsync("orders/" + this.order.id, data).then( (data) => {
			  console.log(JSON.parse(data.body));
			  this.navCtrl.push("OrderPage");
			}, (err) => {
			  console.log(err);
			});
		  }
		 },
		 {
		  text: 'Cancel',
		  cssClass: 'cancel',
		  handler: () => {
			let data = {
			  status: 'cancelled'
			};
			 this.WooCommerce.putAsync("orders/" + this.order.id, data).then( (data) => {
			  console.log(JSON.parse(data.body));
			  this.navCtrl.push("OrderPage");
			}, (err) => {
			  console.log(err);
			});
		  }
		}
	  ]
	});
	actionSheet.present();
  }
}
