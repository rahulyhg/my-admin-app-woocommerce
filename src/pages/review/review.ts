import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  ordersData;
  WooCommerce : any;
  filterBestseller;
  chartLabels               : any    = [];
  chartValues               : any    = [];
  arrayLabels               : any    = [];
  arrayValue               : any    = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private WP: WoocommerceProvider) {
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
    this.chartLabels = this.navParams.get('reviewlabel');
    this.chartValues = this.navParams.get('reviewqty');
	console.log(this.chartLabels);
	console.log(this.chartValues);
    
    this.defineChartData();
    
  }


   defineChartData() : void
	   {
		  
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
           
            data: {
                labels: this.chartLabels,
                datasets: [{
                    label: this.arrayValue,
                    data: this.chartValues,
                    backgroundColor: 'rgba(18, 141, 229, 0.2)',
                    hoverBackgroundColor: "#128de5",                       
                    borderColor: 'rgba(18, 141, 229, 0.5)',
					borderWidth: 1
                }]
            },
             options : {
				  circumference: 2 * Math.PI,
				  rotation: Math.PI,
				  cutoutPercentage: 30,
				  legend: {
					display: false,
					position: 'left',
					
				  },
				  layout:{
					padding: -10,
				  }, 
				  animation: {
					animateRotate: true,
					animateScale: true
				  },
						  
			
			 }
 
        });
		
		
	   }
	
	  
	  onChange(value) {
		console.log(value);
		this.WooCommerce = this.WP.init();
		this.WooCommerce.getAsync("reports/top_sellers?period=" + value).then( (data) => {
		  console.log(JSON.parse(data.body));
		  this.ordersData = JSON.parse(data.body);
		
		  this.chartLabels = [];
		  this.chartValues = [];
		  let k:any;
			for(k in this.ordersData) {
				var tech  =      this.ordersData[k];			 
				this.chartLabels.push(tech.name);
				this.chartValues.push(tech.quantity);
				
			}
			console.log(this.chartLabels);
			console.log(this.chartValues);
		
			this.doughnutChart.data.labels = this.chartLabels;
			this.doughnutChart.data.datasets[0].data = this.chartValues;
			this.doughnutChart.update();
		}, (err) => {
		  console.log(err);
		});
	  }
  
}
