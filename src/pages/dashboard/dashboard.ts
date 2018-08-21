import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;
  
  chartLabels: any[] = [];
  chartValues: any[] = [];
  arrayLabels : Array<any> = new Array<any>(10);
  arrayValue : Array<any> = new Array<any>(10);
  ordersData : any[];
  toggoleShowHide: boolean;
  WooCommerce : any;


  technologies				: any	 = [];
  Object = Object;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public loadingCtrl: LoadingController, 
			  private WP: WoocommerceProvider) {  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    
    let loading = this.loadingCtrl.create();
    loading.present();
    this.WooCommerce = this.WP.init();
	this.WooCommerce.getAsync("reports/sales").then( (data) => {
      console.log(JSON.parse(data.body));
      this.technologies = JSON.parse(data.body);
    }, (err) => {
      console.log(err);
    });
    
    setTimeout(() => {
		loading.dismiss();
	  }, 5000);
    
    this.toggoleShowHide = true;
    
    this.WooCommerce.getAsync("reports/top_sellers?period=month").then( (data) => {
      console.log(JSON.parse(data.body));
      this.ordersData = JSON.parse(data.body);
      let k:any;
		for(k in this.ordersData) {
			var tech = this.ordersData[k];

			 console.log(tech);
			this.chartLabels.push(tech.name);
			this.chartValues.push(tech.quantity);
			
		}
    }, (err) => {
      console.log(err);
    });
    
  }

 defineChartData() : void
	   {
		
    
		this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
           
            data: {
                labels: this.arrayLabels,
                datasets: [{
                    label: this.arrayValue,
                    data: this.arrayValue,
                    backgroundColor: [
                        'rgba(255, 0, 53, 0.2)',
                        'rgba(255, 0, 127, 0.2)',
                        'rgba(255, 0, 238, 0.2)',
                        'rgba(42, 0, 255, 0.2)',
                        'rgba(0, 225, 255, 0.2)',
                        'rgba(0, 255, 119, 0.2)',
                        'rgba(242, 255, 0, 0.2)',
                        'rgba(255, 144, 0, 0.2)',
                        'rgba(186, 196, 196, 0.2)',
                        'rgba(42, 48, 48, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#ff0035",
                        "#ff007f",
                        "#ff00ee",
                        "#2a00ff",
                        "#00e1ff",
                        "#00ff77",
                        "#f2ff00",
                        "#ff9000",
                        "#bac4c4",
                        "#2a3030"
                    ],
                    borderColor: [
                        'rgba(255, 0, 53, 0.5)',
                        'rgba(255, 0, 127, 0.5)',
                        'rgba(255, 0, 238, 0.5)',
                        'rgba(42, 0, 255, 0.5)',
                        'rgba(0, 225, 255, 0.5)',
                        'rgba(0, 255, 119, 0.5)',
                        'rgba(242, 255, 0, 0.5)',
                        'rgba(255, 144, 0, 0.5)',
                        'rgba(186, 196, 196, 0.5)',
                        'rgba(42, 48, 48, 0.5)'
                    ],
					borderWidth: 1
                }]
            },
             options : {
				  circumference: 2 * Math.PI,
				  rotation: Math.PI,
				  cutoutPercentage: 30,
				  legend: {
					display: true,
					position: 'right',
					
				  },
				  layout:{
					padding: 0,
				  }, 
				  animation: {
					animateRotate: true,
					animateScale: true,
					duration: 5000
				  }
				  
			
			 }
 
        });
		
		
		
	   }
	   
  onButtonClick(){
	  this.arrayLabels[0] = this.chartLabels[0];
		this.arrayLabels[1] = this.chartLabels[1];
		this.arrayLabels[2] = this.chartLabels[2];
		this.arrayLabels[3] = this.chartLabels[3];
		this.arrayLabels[4] = this.chartLabels[4];
		this.arrayLabels[5] = this.chartLabels[5];
		this.arrayLabels[6] = this.chartLabels[6];
		this.arrayLabels[7] = this.chartLabels[7];
		this.arrayLabels[8] = this.chartLabels[8];
		this.arrayLabels[9] = this.chartLabels[9];
		
		this.arrayValue[0] = this.chartValues[0];
		this.arrayValue[1] = this.chartValues[1];
		this.arrayValue[2] = this.chartValues[2];
		this.arrayValue[3] = this.chartValues[3];
		this.arrayValue[4] = this.chartValues[4];
		this.arrayValue[5] = this.chartValues[5];
		this.arrayValue[6] = this.chartValues[6];
		this.arrayValue[7] = this.chartValues[7];
		this.arrayValue[8] = this.chartValues[8];
		this.arrayValue[9] = this.chartValues[9];
		console.log(this.arrayValue);
		console.log(this.arrayLabels);
	    
	    this.toggoleShowHide = !this.toggoleShowHide;

		this.defineChartData();
	}
}

