import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';

import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {
  content;
  name;
  price;
  sale_price;
  image;
  pimage;
  pimageFile;
  WooCommerce: any;
  imageUrl;
  imageData;
  hiddenImage= true;

  placeholder_picture = "assets/images/pimage.png";


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private WP: WoocommerceProvider,
			  public viewCtrl: ViewController,
			  public actionSheetCtrl: ActionSheetController,
			  public loadingCtrl: LoadingController,
			  public toastCtrl: ToastController,
			  public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProductPage');
  }
  
  getPhoto() {
	  const actionSheet = this.actionSheetCtrl.create({
	  title: 'Upload Your Photo...',
	  cssClass: 'myaction',
	  buttons: [
		{
		  text: 'Feature Image',
		  role: 'media',
		  cssClass: 'MediaIcon',
		  handler: () => {
			 let profileModal = this.modalCtrl.create('PCMediaPage');
			 profileModal.onDidDismiss(data => {
			   console.log(data);
			   if(data != null) {
				 //this.productNewfeatureimage = data.guid.rendered;
				 let image = {
					id: data.id,
					date_created: data.date,
					date_created_gmt: data.date_gmt,
					date_modified: data.modified,
					date_modified_gmt: data.modified_gmt,
					src: data.guid.rendered,
					name: data.title.rendered,
					alt: data.alt_text,
					position: 0
				 };
				 //this.pimage.splice(0, 1, image);
			   }
			 });
			 profileModal.present();
		  }
		},
		{
		  text: 'Gallery Images',
		  cssClass: 'GalleryIcon',
		  handler: () => {
			let profileModal = this.modalCtrl.create('PCMediaPage');
			 profileModal.onDidDismiss(data => {
			   console.log(data);
			   if(data != null) {
				 //this.productimageNew = data.guid.rendered;
				 //this.pimageFile = data;
				 //this.pimage.push({id: data.id, src: data.guid.rendered});
				 this.pimage = data;
			   }
			 });
			 profileModal.present();
		  }
		 },
		 {
		  text: 'Cancel',
		  role: 'cancel',
		  cssClass: 'CancelIcon',
		  handler: () => {
			console.log('Cancel clicked');
		  }
		}
	  ]
	});
	actionSheet.present();
	  
  }
  
  onCreateProduct(){
    let data = {
		name: this.name,
		short_description: this.content,
		price: this.price,
		regular_price: this.price,
		sale_price: this.sale_price,
    };
    this.WooCommerce = this.WP.init();
	this.WooCommerce.postAsync("products", data).then( (data) => {
      console.log(JSON.parse(data.body));
      this.viewCtrl.dismiss();
    }, (err) => {
      console.log(err);
    });
  }

  
}
