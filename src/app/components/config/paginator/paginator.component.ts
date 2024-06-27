import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginacaoDTO } from '../../../model/paginacao/paginacao-dto';
import { PaginacaoRetornoDTO } from '../../../model/paginacao/paginacao-retorno-dto';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input('paginacaoDTO') paginacaoDTO = new PaginacaoDTO;
  @Output() paginacaoRetorno = new EventEmitter();

  paginacaoRetornoDTO = new PaginacaoRetornoDTO;

    // Variáveis para controlar a paginação
    paginaItens: number[] = [];
    paginaItensTemp: number[] = [];
    paginaDestaque: string[] = [];
    paginaAtual: number = 0;
    paginaPrimeira: string = '';
    paginaUltima: string = '';

    qtdeElementosPorPagina: number = 10;

  constructor() {
  }


  processarPrimeiraPagina() {
    this.paginaAtual = 0;
    this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina);
    this.paginacaoRetorno.emit(this.paginacaoRetornoDTO);
  }

  processarUltimaPagina() {
    this.paginaAtual = this.paginacaoDTO.totalPages - 1;
    this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina);
    this.paginacaoRetorno.emit(this.paginacaoRetornoDTO);
  }

  processarAvancarPagina() {
    if(this.paginacaoDTO.pageNumber < this.paginacaoDTO.totalPages) {
      this.paginaAtual = this.paginacaoDTO.pageNumber + 1;
      this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina);
      this.paginacaoRetorno.emit(this.paginacaoRetornoDTO);
    }
  }

  processarVoltarPagina() {
    if(this.paginacaoDTO.pageNumber > 0) {
      this.paginaAtual = this.paginacaoDTO.pageNumber - 1;
      this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina)
      this.paginacaoRetorno.emit(this.paginacaoRetornoDTO)
    }
  }

  processarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina);
    this.paginacaoRetorno.emit(this.paginacaoRetornoDTO);
  }

  obterSelect(event: any) {
    this.qtdeElementosPorPagina = event.target.value;
    this.paginaAtual = 0;
    this.atualizarRetorno(this.paginaAtual, this.qtdeElementosPorPagina);

    this.paginacaoRetorno.emit(this.paginacaoRetornoDTO);
  }

  paginacaoDetalhes() {
    if(this.paginacaoDTO.totalPages != undefined) {
      this.paginaAtual = this.paginacaoDTO.pageNumber;

      let primeiroItemExibir = 0;
      let ultimoItemExibir = this.paginacaoDTO.totalPages;

      if(this.paginacaoDTO.totalPages > 7) {
        ultimoItemExibir = 7;
        if(this.paginacaoDTO.pageNumber > 3) {

          primeiroItemExibir = this.paginacaoDTO.pageNumber - 3;

          if((this.paginacaoDTO.pageNumber + 3) < this.paginacaoDTO.totalPages) {
            ultimoItemExibir = this.paginacaoDTO.pageNumber + 4;
          } else {
            ultimoItemExibir = this.paginacaoDTO.totalPages;

            switch (this.paginacaoDTO.totalPages - this.paginacaoDTO.pageNumber) {
              case 1:
                primeiroItemExibir -= 3;
                break;
              case 2:
                primeiroItemExibir -= 2;
                break;
              case 3:
                primeiroItemExibir -= 1;
                break;
              default:
                break;
            }
          }
        }

      }

      this.paginaItens = Array(ultimoItemExibir - primeiroItemExibir);

      for(let i = 0; i < ultimoItemExibir; i++) {
        this.paginaItensTemp[i] = i;
      }

      this.paginaItens = this.paginaItensTemp.filter(n =>  n >= primeiroItemExibir && n < ultimoItemExibir);

      for(let k = 0; k < this.paginaItens.length; k++) {
        if(this.paginaAtual == this.paginaItens[k]) {
          this.paginaDestaque[k] = 'active desabilitarClic'
        } else {
          this.paginaDestaque[k] = '';
        }
      }
      this.paginaPrimeira = this.paginacaoDTO.firstPage? 'disabled desabilitarClic': '';
      this.paginaUltima = this.paginacaoDTO.lastPage? 'disabled desabilitarClic': '';
    }
  }


  atualizarRetorno(pgSelecionada: number, qtdeElementos: number) {
    this.paginacaoRetornoDTO.paginaSelecionada = pgSelecionada;
    this.paginacaoRetornoDTO.qtdeElementosPorPagina = qtdeElementos;
  }
}
