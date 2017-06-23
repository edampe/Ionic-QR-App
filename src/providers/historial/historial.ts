import { Injectable } from '@angular/core';

import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ModalController, Platform, ToastController } from 'ionic-angular';

import { MapaPage } from '../../pages/index.paginas';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

import { EmailComposer } from '@ionic-native/email-composer';



@Injectable()
export class HistorialService {

  private _historial: ScanData[] = []

  constructor( private iab: InAppBrowser, 
               private modalCtrl: ModalController,
               private contacts: Contacts,
               private platform:Platform,
               private toastCtrl: ToastController,
               private emailComposer: EmailComposer ) {

  }

  agregarHistorial(texto: string){


    let data =  new ScanData(texto)

    this._historial.unshift(data)

    this.abrirScan(0)


    return
  }

  cargarHistorial(){
    return this._historial
  }

  abrirScan( index: number = 0){

    let scanData:ScanData = this._historial[index]

    switch( scanData.tipo ){
      case 'http':

            this.iab.create(scanData.info, "_system");

      break      
      case 'mapa':
      //let modal = this.modalCtrl.create(MapaPage);
      //modal.present();

    
      break
      case 'contacto':      
        
        this.crearContacto( scanData.info )
    
      break
      case 'email':      
        
        this.enviarEmail( scanData.info )
        
    
      break
      default:
        console.error("Tipo no soportado")
    }

  }

  enviarEmail(texto: string){

      //this._historialService.agregarHistorial("MATMSG:TO:edampe_01@hotmail.com;SUB:Prueba Ionic;BODY:Prueba de Barcode Email;;")

    console.log(texto)
    let dataEmail: any = texto.split(';')

    let para: any = dataEmail[0].replace("MATMSG:TO:","")
    let asunto: any = dataEmail[1].replace("SUB:","")
    let body: any = dataEmail[2].replace("BODY:","")


    console.log(asunto)
    console.log(body)
    console.log(para)

    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
       //Now we know we can send
       this.crearToast("Mensaje enviado" + para );
     }
    });
    
    let email = {
      to: para,
      subject: asunto,
      body: body,
      isHtml: false
    };
    
    // Send a text message using default options
    this.emailComposer.open(email);
    
    
  }

  private crearContacto( texto: string){

    let campos: any = this.parse_vcard(texto)

    if( !this.platform.is('cordova')){
      console.warn('Estoy en el compu')
      return
    }

    let contact: Contact = this.contacts.create();

    let nombre = campos['fn']
    let tel = campos.tel[0].value[0]
    
    
    contact.name = new ContactName(null, nombre)
    contact.phoneNumbers = [ new ContactField ('mobile', tel)]


    contact.save().then(
          () => this.crearToast('Contacto: ' + nombre + ' Creado'),
      (error: any) => this.crearToast('Error saving contact.'+ error)
      );


  }

  private crearToast( mensaje: string){

     let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();


  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
};

}
