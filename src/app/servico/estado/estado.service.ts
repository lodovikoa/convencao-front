import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDTO } from '../../model/estado/estado-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  http = inject(HttpClient);

  constructor() { }

  listar(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(environment.urlApi + 'estados');
  }

  excluir(sqEstado: number): Observable<any> {
    return this.http.delete<any>(environment.urlApi + 'estados/' + sqEstado);
  }

  cadastrar(estadoDTO: EstadoDTO): Observable<EstadoDTO> {
    return this.http.post<EstadoDTO>(environment.urlApi + 'estados',estadoDTO);
  }
}
