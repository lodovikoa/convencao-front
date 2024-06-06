import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
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
    imports: [MdbFormsModule, FormsModule, PrincipalComponent]
})
export class LoginComponent {

  erroLogin!: string;
  loginDTO = new LoginDTO();
  loginRetornoDTO = new LoginRetornoDTO();
  errorDTO = new ErrorDTO();

  loginService = inject(LoginService);
  router = inject(Router);

  logar() {
    this.loginService.login(this.loginDTO).subscribe({
      next: resultado => {
        this.loginRetornoDTO = resultado;
        localStorage.setItem("convencao-authorization", this.loginRetornoDTO.token);
        localStorage.setItem("convencao-usu", this.loginRetornoDTO.dsNome);
        this.erroLogin = '';
        this.router.navigate(['convencao']);
      },
      error: erros => {
        this.errorDTO = erros.error;
        localStorage.removeItem("convencao-authorization");
        localStorage.removeItem('convencao-usu');
        if(this.errorDTO.dsMensUsuario != null) {
          this.erroLogin = this.errorDTO.dsMensUsuario;
        } else {
          this.erroLogin = 'Erro não identificado, contacte o administrador.';
        }
      }
    });
  }


  recuperarSenha() {
    Swal.fire({
      title: 'Sua senha será reiniciada e enviada para o email cadastrado.',
      icon: 'info',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Voltar'
    }).then(result => {
      if(result.isConfirmed){
        alert('Desenvolver recuperar senha.');
      }
    });
  }

}
