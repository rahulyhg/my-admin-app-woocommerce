import { Component } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, IonicPage, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { WoocommerceProvider } from '../../../providers/woocommerce/woocommerce';
import * as WC from 'woocommerce-api';
import { ImageProvider } from '../../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-editproduct',
  templateUrl: 'editproduct.html'
})
export class EditProductPage {
  product_edit_form: FormGroup;
  id : any;
  pid :any;
  product : any;
  productname :string; 
  productdescription : string; 
  productprice :any;
  productsprice : any;	
  productimage : any;
  productimageNew : any;	
  pimage : any[] = [];  
  pimageFile: any;
  placeholder_picture = "assets/images/pimage.png";
  
  WooCommerce: any;
  
  constructor(
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
	public toastCtrl: ToastController, 
	public _IMG: ImageProvider,
	public modalCtrl: ModalController,
	private WP: WoocommerceProvider) {
		this.product= navParams.get('editProduct');
		console.log(this.product);
		this.product_edit_form = this.formBuilder.group({
		  productname: new FormControl('', Validators.required),
		  productdescription : new FormControl('', Validators.required),
		  productprice: new FormControl('', Validators.required),
		  productsprice : new FormControl('', Validators.required),
		  productimage : new FormControl('', Validators.required)
		});
  }

  ionViewWillEnter(){
   
    let loading = this.loadingCtrl.create();

    loading.present();    
    this.productname = this.product.name;
    this.productdescription = this.product.short_description;
    this.productprice = this.product.regular_price;
    this.productsprice = this.product.sale_price;
    this.pimage = this.product.images;
    this.productimage = this.pimage[0]['src'];
    loading.dismiss();
    this.product_edit_form = this.formBuilder.group({
      productname: this.productname,
	  productdescription : this.productdescription,
	  productprice: this.productprice,
	  productsprice : this.productsprice,
	  productimage : this.productimage
   	  
    });
  }
  
  getPhoto() {
	const actionSheet = this.actionSheetCtrl.create({
	  title: 'Upload Your Photo...',
	  cssClass: 'myaction',
	  buttons: [
		{
		  text: 'Media Library',
		  role: 'media',
		  cssClass: 'MediaIcon',
		  handler: () => {
			 let profileModal = this.modalCtrl.create('MediaPage');
			 profileModal.onDidDismiss(data => {
			   console.log(data);
			   if(data != null) {
				 this.productimageNew = data.guid.rendered;
				 this.pimageFile = data;
			   }
			 });
			 profileModal.present();
		  }
		},
		{
		  text: 'Upload File',
		  cssClass: 'UploadIcon',
		  handler: () => {
			this._IMG.selectImage().then(data=>{
			
			   this.productimageNew = data;
			   //this.uploadFile();
			});
			
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
	
  updateProduct(values){
    console.log(values);

	this.WooCommerce = this.WP.init();
	this.WooCommerce.putAsync("products/" + this.product.id, values).then( (data) => {
	  console.log(JSON.parse(data.body));
    }, (err) => {
	  console.log(err);
	});
  }
}
