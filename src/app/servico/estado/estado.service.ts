import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDTO } from '../../model/estado/estado-dto';
import { environment } from '../../environments/environment';
import { EstadoDTOList } from '../../model/estado/estado-dtolist';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  http = inject(HttpClient);
  urlApi = environment.urlApi + 'estados';

  constructor() { }

  listar(page: number, size: number): Observable<EstadoDTOList> {
    return this.http.get<EstadoDTOList>(`${this.urlApi}?page=${page}&size=${size}`);
  }

  buscarPorId(sqEstado: number): Observable<EstadoDTO> {
    return this.http.get<EstadoDTO>(this.urlApi + '/' + sqEstado);
  }

  excluir(sqEstado: number): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/' + sqEstado);
  }

  cadastrar(estadoDTO: EstadoDTO): Observable<EstadoDTO> {
    return this.http.post<EstadoDTO>(this.urlApi, estadoDTO);
  }

  alterar(estadoDTO: EstadoDTO): Observable<EstadoDTO> {
    return this.http.put<EstadoDTO>(this.urlApi + '/' + estadoDTO.sqEstado, estadoDTO);
  }
}
