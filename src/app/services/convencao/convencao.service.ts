import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvencaoDTO } from '../../models/convencao/convencao-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvencaoService {

http = inject(HttpClient);
urlApi = environment.urlApi + 'convencao';

  constructor() { }

  listar(): Observable<ConvencaoDTO[]> {
    return this.http.get<ConvencaoDTO[]>(this.urlApi + '/listar');
  }

  buscarPorId(sqConvencao: number): Observable<ConvencaoDTO> {
    return this.http.get<ConvencaoDTO>(this.urlApi + '/consultar/' + sqConvencao);
  }

  excluir(sqConvencao: number): Observable<any> {
    return this.http.delete<any>(this.urlApi + '/excluir/' + sqConvencao);
  }

  cadastrar(convencaoDTO: ConvencaoDTO): Observable<ConvencaoDTO> {
    return this.http.post<ConvencaoDTO>(this.urlApi + '/cadastrar', convencaoDTO);
  }

  alterar(convencaoDTO: ConvencaoDTO): Observable<ConvencaoDTO> {
    return this.http.put<ConvencaoDTO>(this.urlApi + '/editar/' + convencaoDTO.sqConvencao, convencaoDTO);
  }
}
