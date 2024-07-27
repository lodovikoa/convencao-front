import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DepartamentoDTO } from '../../models/departamento/departamento-dto';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  http = inject(HttpClient);
  urlApi = environment.urlApi + 'departamentos';

  constructor() { }

  listar(): Observable<DepartamentoDTO[]> {
    return this.http.get<DepartamentoDTO[]>(`${this.urlApi}/listar`);
  }

  buscarPorId(id: number): Observable<DepartamentoDTO> {
    return this.http.get<DepartamentoDTO>(this.urlApi + '/consultar/' + id);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/excluir/' + id);
  }

  cadastrar(departamentoDTO: DepartamentoDTO): Observable<DepartamentoDTO> {
    return this.http.post<DepartamentoDTO>(this.urlApi + '/cadastrar', departamentoDTO);
  }

  alterar(departamentoDTO: DepartamentoDTO): Observable<DepartamentoDTO> {
    return this.http.put<DepartamentoDTO>(this.urlApi + '/editar/' + departamentoDTO.sqDepartamento, departamentoDTO);
  }
}
