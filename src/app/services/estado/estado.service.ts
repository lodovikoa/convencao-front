import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDTO } from '../../models/estado/estado-dto';
import { EstadoDTOList } from '../../models/estado/estado-dtolist';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  http = inject(HttpClient);
  urlApi = environment.urlApi + 'estados';

  constructor() { }

  listar(page: number, size: number): Observable<EstadoDTOList> {
    return this.http.get<EstadoDTOList>(`${this.urlApi}/listar?page=${page}&size=${size}`);
  }

  listarTudo(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${this.urlApi}/listarTudo`);
  }

  buscarPorId(sqEstado: number): Observable<EstadoDTO> {
    return this.http.get<EstadoDTO>(this.urlApi + '/consultar/' + sqEstado);
  }

  excluir(sqEstado: number): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/excluir/' + sqEstado);
  }

  cadastrar(estadoDTO: EstadoDTO): Observable<EstadoDTO> {
    return this.http.post<EstadoDTO>(this.urlApi + '/cadastrar', estadoDTO);
  }

  alterar(estadoDTO: EstadoDTO): Observable<EstadoDTO> {
    return this.http.put<EstadoDTO>(this.urlApi + '/editar/' + estadoDTO.sqEstado, estadoDTO);
  }
}
