import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavParams } from 'ionic-angular';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root;
  tab2Root;
  tab3Root;
  
  fooId;
  ordersData;
  productsData;
  WooCommerce : any;
  chartLabels               : any    = [];
  chartValues               : any    = [];
  chartValuesReview         : any    = [];
  
  constructor(private WP: WoocommerceProvider,
			  public loadingCtrl: LoadingController,
			  public params: NavParams) {
	console.log('ionViewDidLoad TabPageCon');

	let loading = this.loadingCtrl.create();
    loading.present();
    this.WooCommerce = this.WP.init();
	this.WooCommerce.getAsync("orders?per_page=100").then( (data) => {
      console.log(JSON.parse(data.body));
      this.ordersData = JSON.parse(data.body);
      let i : any;

      for(i in this.ordersData)
      {
         var tech  =      this.ordersData[i];

         console.log(tech.status);
         this.chartValues.push(tech.status);
         
      }
      }, (err) => {
      console.log(err);
    });
   	
	setTimeout(() => {
		loading.dismiss();
	  }, 5000);

    this.WooCommerce.getAsync("reports/top_sellers?period=week").then( (data) => {
      console.log(JSON.parse(data.body));
      this.ordersData = JSON.parse(data.body);
      let k:any;
		for(k in this.ordersData) {
			var tech  =      this.ordersData[k];

			 console.log(tech);
			this.chartLabels.push(tech.name);
			this.chartValuesReview.push(tech.quantity);
			
		}
    }, (err) => {
      console.log(err);
    });
    
	this.fooId = {
		counts: this.chartValues,
		reviewlabel : this.chartLabels,
		reviewqty : this.chartValuesReview

	  }
	
	this.tab1Root = 'DashboardPage';
	this.tab2Root = 'OrderChartPage';
	this.tab3Root = 'ReviewPage';
 
  }
}

