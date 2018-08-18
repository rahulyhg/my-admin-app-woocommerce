import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
/*
  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordpressProvider {
  api_url = "https://catalog.tworksystem.com/wp-json/wp/v2/";
  constructor(public http: HttpClient) {
    console.log('Hello WordpressProvider Provider');
  }
  
  getMedia(page:number = 1) {
	let url = this.api_url + 'media?per_page=20&page=' + page;
	return this.http.get(url);
  }
  
  getMediaByID(id) {	
    let url = this.api_url + 'media/' + id;
	return this.http.get(url);
  }

}
