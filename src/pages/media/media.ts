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
  page: number;
  morePagesAvailable: boolean = true;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public viewCtrl: ViewController,
			  private wordpress: WordpressProvider) {
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
  
  dismiss() {
   console.log(this.autoManufacturers);
   this.wordpress.getMediaByID(this.autoManufacturers).subscribe(data => {
      this.mimage = data;
      console.log(this.mimage);
  
   this.viewCtrl.dismiss(this.mimage);
   });
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
