import { PaginacaoDTO } from '../paginacao/paginacao-dto';
import { EstadoDTO } from './estado-dto';

export class EstadoDTOList {
  content!: EstadoDTO[];
  pageable!: PaginacaoDTO
}
