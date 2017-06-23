import { Component } from '@angular/core';
import { HomePage, GuardadosPage } from '../index.paginas';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {

  tab1 = HomePage
  tab2 = GuardadosPage

  constructor() {
  }


}
