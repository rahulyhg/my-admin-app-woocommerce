import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {
  autoManufacturers;
  media: any;
  mimage : any;
  newfimage : any;
  images : any[];
  galleryImage: any[];
  page: number;
  feature: boolean;
  morePagesAvailable: boolean = true;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public viewCtrl: ViewController,
			  private wordpress: WordpressProvider) {
	this.images = navParams.get('pimage');
	this.feature = navParams.get('feature');
	console.log(this.images);
	this.galleryImage = [];
	for(var i=1; i< this.images.length ; i++) {
		this.galleryImage.push(this.images[i]);
	}
	console.log(this.galleryImage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaPage');
    this.page = 1;
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
   console.log(this.images[0]);
		let data:any[] = [this.images[0]];
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
 
  doInfinite(infiniteScroll) {
	this.page++;
	
    let loading = true;
    console.log("Getting page " + this.page);
	this.wordpress.getMedia(this.page).subscribe(data => {
    let med : any = data;
      for(let m of med){
        if(!loading){
          infiniteScroll.complete();
        }
        m.description.rendered = m.description.rendered.split('<a')[0] + "</p>";
        this.media.push(m);
        loading = false;
        this.morePagesAvailable = true;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
    
  }
  
}
