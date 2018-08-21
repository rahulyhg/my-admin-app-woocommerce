import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';
/**
 * Generated class for the PcmediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pcmedia',
  templateUrl: 'pcmedia.html',
}) 
export class PcmediaPage {

  feature: boolean;
  newfimage : any;
  galleryImage: any[]= [];
  media: any;
  autoManufacturers;
  mimage: any;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public viewCtrl: ViewController,
			  private wordpress: WordpressProvider) {
	this.feature = navParams.get('feature');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PcmediaPage');
    this.getMedia();
  }

  getMedia() {
    console.log('getmedia is work');
	this.wordpress.getMedia().subscribe( (data) => {
	  console.log(data);
	  this.media = data;
	  
    }, (err) => {
	  console.log(err);
	});
	
  }
  
  changeStatus(preimg) {
	  console.log(preimg);
	  if(this.feature) {
		this.newfimage = preimg.guid.rendered;
	  }
	  else {
		let image = {
			id: preimg.id,
			date_created: preimg.date,
			date_created_gmt: preimg.date_gmt,
			date_modified: preimg.modified,
			date_modified_gmt: preimg.modified_gmt,
			src: preimg.guid.rendered,
			name: preimg.title.rendered,
			alt: preimg.alt_text
		 };
		this.galleryImage.push(image);
	  }
	  console.log(this.galleryImage);
  }	
  
  deleteImage(img) {
	this.galleryImage.splice(img,1);
	console.log(this.galleryImage);
  }
  
  dismiss() {
   console.log(this.autoManufacturers);
   if(this.feature) {
	   this.wordpress.getMediaByID(this.autoManufacturers).subscribe(data => {
		  this.mimage = data;
		  console.log(this.mimage);
		  this.viewCtrl.dismiss(this.mimage);
	   });
   }
   else {
   
		let data:any[] = [];
		for(var i=0; i< this.galleryImage.length ; i++) {
			data.push(this.galleryImage[i]);
		}
		console.log(data);
		this.viewCtrl.dismiss(data);
   }
   
 }
 
 cancel() {
	this.viewCtrl.dismiss();
 }
}
