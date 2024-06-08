import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO } from '../../model/login/login-dto';
import { Observable } from 'rxjs';
import { LoginRetornoDTO } from '../../model/login/login-retorno-dto';
import { environment } from '../../environments/environment';
import { RecuperarSenhaDTO } from '../../model/login/recuperar-senha-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient)

  constructor() { }

  login(obj: LoginDTO): Observable<LoginRetornoDTO> {
    return  this.http.post<LoginRetornoDTO>(environment.urlApi + 'auth/login', obj);
  }

  recuperarSenha(login: string):Observable<RecuperarSenhaDTO>{
    return this.http.post<RecuperarSenhaDTO>(environment.urlApi + "usuarios/recuperarSenha", login);
  }

}
