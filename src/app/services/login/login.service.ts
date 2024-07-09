import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO } from '../../models/login/login-dto';
import { Observable } from 'rxjs';
import { RecuperarSenhaDTO } from '../../models/login/recuperar-senha-dto';
import { environment } from '../../../environments/environment';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LoginTokenDTO } from '../../models/login/login-token-dto';
import { LoginUsuarioLogado } from '../../models/login/login-usuario-logado';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)

  constructor() { }

  login(obj: LoginDTO): Observable<LoginTokenDTO> {
    return  this.http.post<LoginTokenDTO>(environment.urlApi + 'auth/login', obj);
  }


  recuperarSenha(login: string):Observable<RecuperarSenhaDTO>{
    return this.http.post<RecuperarSenhaDTO>(environment.urlApi + "usuarios/recuperarSenha", login);
  }

  setToken(token: string) {
    localStorage.setItem('tokenApiConvencao', token);
  }

  removeToken() {
    localStorage.removeItem('tokenApiConvencao');
  }

  getToken() {
    return localStorage.getItem('tokenApiConvencao');
  }

  jwtDecodeToken() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecodeToken() as LoginUsuarioLogado;

    let roles = user.role;

    let resultado = roles.indexOf('ROLE_' + role) > -1;

    console.log(resultado);


    console.log(user.id);
    console.log(user.username);
    console.log(user.usernamefull);
    console.log(user.role);

  }

  getUsuarioLogado() {
    this.hasPermission('ROLE_T_CFT_ESTADO_LISTAR');
    return this.jwtDecodeToken()  as LoginUsuarioLogado;
  }

}
