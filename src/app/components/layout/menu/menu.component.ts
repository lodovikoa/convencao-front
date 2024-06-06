import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MdbCollapseModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';

  constructor(){
  }

  openMenu() {
    this.menuValue =! this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  obterUsuarioLogado() {
    return localStorage.getItem('convencao-usu');
  }

}
