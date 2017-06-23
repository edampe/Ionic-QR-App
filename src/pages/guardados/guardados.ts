import { Component } from '@angular/core';
import { HistorialService } from '../../providers/historial/historial';
import { ScanData } from '../../models/scan-data.model';

@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {

  historial: ScanData[] = []

  constructor( private _historialService: HistorialService ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardadosPage');
    this.historial = this._historialService.cargarHistorial()

  }

  abril_scan(idx: number){

    this._historialService.abrirScan(idx)

  }

}
