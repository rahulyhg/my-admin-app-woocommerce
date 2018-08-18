import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  Woocommerce: any;
  WoocommerceV2: any;
  
  constructor() {
    console.log('Hello WoocommerceProvider Provider');
    
    this.Woocommerce = WC({
      url: "https://catalog.tworksystem.com",
      consumerKey: "ck_c13a1bc75d4bc671d36f57437e77dc4a9f185723",
      consumerSecret: "cs_2e8b00282d7673b362749af0c0d82dcf408895ca",
      wpAPI: true,
      version: "wc/v1",
      queryStringAuth: true
    });
     
     this.WoocommerceV2 = WC({
      url: "https://catalog.tworksystem.com",
      consumerKey: "ck_c13a1bc75d4bc671d36f57437e77dc4a9f185723",
      consumerSecret: "cs_2e8b00282d7673b362749af0c0d82dcf408895ca",
      wpAPI: true,
      version: "wc/v2",
      queryStringAuth: true
    });
     console.log(this.Woocommerce);
  }

  init(v2?: boolean){
    if(v2 == true){
      return this.WoocommerceV2;
    } else {
      return this.Woocommerce;
    }
  }
}
