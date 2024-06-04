import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../../models/login/loginDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MdbFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  erroLogin!: string;
  loginDTO = new LoginDTO();

  logar() {
    alert(this.loginDTO.login + ' --- ' + this.loginDTO.password);

    this.erroLogin = "Usuário ou senha inválido!";
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
