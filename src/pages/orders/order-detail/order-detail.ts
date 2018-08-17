import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

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
  
  order: any;
  items: any;
  billing: any;
  categories: Array<any> = new Array<any>();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get('order');
    this.billing = this.order.billing;
    this.items = this.order.line_items;
    console.log(this.items);
  }

  confirmOrder(){
  
  }
}
