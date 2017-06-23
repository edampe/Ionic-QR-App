import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';



// Maps
import { AgmCoreModule } from '@agm/core';

// Servicios
import { HistorialService } from '../providers/historial/historial';

import { MyApp } from './app.component';

import {  TabsPage, 
          GuardadosPage, 
          HomePage, 
          MapaPage } from '../pages/index.paginas';


@NgModule({
  declarations: [
    MyApp,
    TabsPage, 
    GuardadosPage, 
    HomePage, 
    MapaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAz88V0R_ItWQqTNaKGmsO40Q1ODd51yJc'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage, 
    GuardadosPage, 
    HomePage, 
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HistorialService,    
    InAppBrowser,
    Contacts,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
