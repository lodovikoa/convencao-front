import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service';
import { LoginUsuarioLogado } from '../../../models/login/login-usuario-logado';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  loginService = inject(LoginService);
  // usuarioLogado = new LoginUsuarioLogado();

  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';

  router = inject(Router);

  constructor(){
   // this.obterUsuarioLogado();
  }

  openMenu() {
    this.menuValue =! this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  // obterUsuarioLogado() {
  //   this.usuarioLogado = this.loginService.getUsuarioLogado();
  // }

  fechar() {
    Swal.fire({
      title: 'O sistema será fechado',
      icon: 'info',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if(result.isConfirmed){
        localStorage.removeItem("cvn-authorization");
        localStorage.removeItem('cvn-usu');
        localStorage.removeItem("cvn-trancode")

        this.router.navigate(['']);
      }
    });

  }

  convencaoListar() {
    this.router.navigate(['convencao/convencao']);
  }

  departamentoListar() {
    this.router.navigate(['convencao/departamento']);
  }

  estadosListar() {
    this.router.navigate(['convencao/estados']);
  }

}
