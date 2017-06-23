import { Component } from '@angular/core';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// Components
import { ToastController, Platform } from 'ionic-angular';

// Servicios
import { HistorialService } from '../../providers/historial/historial';


import { ModalController } from 'ionic-angular'

import { MapaPage } from '../../pages/index.paginas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private _historialService: HistorialService, 
              private modalCtrl: ModalController ) {

  }

  scan(){

    console.log("Realizando Scan")

    if( !this.platform.is('cordova')){
      this._historialService.agregarHistorial("MATMSG:TO:edampe_01@hotmail.com;SUB:Prueba Ionic;BODY:Prueba de Barcode Email;;")
      
      return
    }

    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      
      
      console.log(barcodeData.text)

      if( !barcodeData.cancelled && barcodeData.text != null){
        this._historialService.agregarHistorial( barcodeData.text )
      }

    }, (err) => {
        // An error occurred
        console.error("Error: " , err)

      this.mostrarError("Error: " + err)
        
    });  
  }

  mostrarError( msgError: string ){
     let toast = this.toastCtrl.create({
      message: msgError,
      duration: 2500
    });
    toast.present();
  
  }


}
