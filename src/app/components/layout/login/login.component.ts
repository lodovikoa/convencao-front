import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../../models/login/login-dto';
import { FormsModule } from '@angular/forms';
import { ErrorDTO } from '../../../models/error/error-dto';
import { Router } from '@angular/router';
import { PrincipalComponent } from "../principal/principal.component";
import { LoginService } from '../../../services/login/login.service';
import { LoginTokenDTO } from '../../../models/login/login-token-dto';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormsModule, PrincipalComponent]
})
export class LoginComponent {

  mensagemLogin!: string;
  classMensagem: string = "alert alert-danger negrito";
  loginDTO = new LoginDTO();
  tokenDTO = new LoginTokenDTO();
  errorDTO = new ErrorDTO();

  loginService = inject(LoginService);
  router = inject(Router);

  constructor() {
    this.loginService.removeToken();
  }

  logar() {
    this.mensagemLogin = '';

    this.loginService.login(this.loginDTO).subscribe({
      next: resultado => {
        this.tokenDTO = resultado;
        this.loginService.setToken(this.tokenDTO.token);

        this.router.navigate(['convencao']);
      },
      error: erros => {
        this.errorDTO = erros.error;
        if(this.errorDTO != null && this.errorDTO.dsMensUsuario != null) {
          this.mensagemLogin = this.errorDTO.dsMensUsuario;
          this.classMensagem = "alert alert-danger negrito";
        } else {
          this.mensagemLogin = environment.erroNaoIdntificado;
          this.classMensagem = "alert alert-danger negrito";
        }
      }
    });
  }


  recuperarSenha() {
    this.mensagemLogin = '';

    Swal.fire({
      title: 'Sua senha será reiniciada e enviada para o email cadastrado.',
      icon: 'info',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar'
    }).then(result => {
      if(result.isConfirmed){
        this.loginService.recuperarSenha(this.loginDTO.login).subscribe({
          next: resultado => {
            this.mensagemLogin = resultado.dsMensagem;
            this.classMensagem = "alert alert-success negrito";
          },
          error: erros => {
            this.errorDTO = erros.error;
            if(this.errorDTO.dsMensUsuario != null) {
              this.mensagemLogin = this.errorDTO.dsMensUsuario;
              this.classMensagem = "alert alert-danger negrito";
            } else {
              this.mensagemLogin = environment.erroNaoIdntificado;
              this.classMensagem = "alert alert-danger negrito";
            }
          }
        });
      }
    });
  }
}
