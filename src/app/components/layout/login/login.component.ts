import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../../model/login/login-dto';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../servico/login/login.service';
import { LoginRetornoDTO } from '../../../model/login/login-retorno-dto';
import { ErrorDTO } from '../../../model/error/error-dto';
import { Router } from '@angular/router';
import { PrincipalComponent } from "../principal/principal.component";

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
  loginRetornoDTO = new LoginRetornoDTO();
  errorDTO = new ErrorDTO();

  loginService = inject(LoginService);
  router = inject(Router);

  logar() {
    this.mensagemLogin = '';
    localStorage.removeItem("cvn-authorization");
    localStorage.removeItem('cvn-usu');
    localStorage.removeItem("cvn-trancode")

    this.loginService.login(this.loginDTO).subscribe({
      next: resultado => {
        this.loginRetornoDTO = resultado;
        localStorage.setItem("cvn-authorization", this.loginRetornoDTO.token);
        localStorage.setItem("cvn-usu", this.loginRetornoDTO.dsNome);
        localStorage.setItem("cvn-trancode", this.loginRetornoDTO.trancodes)

        this.router.navigate(['convencao']);
      },
      error: erros => {
        this.errorDTO = erros.error;
        if(this.errorDTO != null && this.errorDTO.dsMensUsuario != null) {
          this.mensagemLogin = this.errorDTO.dsMensUsuario;
          this.classMensagem = "alert alert-danger negrito";
        } else {
          this.mensagemLogin = 'Erro não identificado, contacte o administrador.';
          this.classMensagem = "alert alert-danger negrito";
        }
      }
    });
  }


  recuperarSenha() {
    this.mensagemLogin = '';
    localStorage.removeItem("cvn-authorization");
    localStorage.removeItem('cvn-usu');
    localStorage.removeItem("cvn-trancode")

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
              this.mensagemLogin = 'Erro não identificado, contacte o administrador.';
              this.classMensagem = "alert alert-danger negrito";
            }
          }
        });
      }
    });
  }
}
