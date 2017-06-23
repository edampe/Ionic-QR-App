import { Component } from '@angular/core';
import {  NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  
  lat: number;
  lng: number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController) {
                
    this.lat = 4.681904147221921 
    this.lng = -74.05647081469726

    console.log(navParams.get('coords'))
  }

  cerrarModal(){

    this.viewCtrl.dismiss()

  }



}
