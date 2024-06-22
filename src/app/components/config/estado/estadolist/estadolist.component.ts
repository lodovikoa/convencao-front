import { Component, inject } from '@angular/core';
import { EstadoService } from '../../../../servico/estado/estado.service';
import { EstadoDTO } from '../../../../model/estado/estado-dto';
import { ErrorDTO } from '../../../../model/error/error-dto';
import Swal from 'sweetalert2';
import { EstadodetailComponent } from "../estadodetail/estadodetail.component";
import { PaginacaoDTO } from '../../../../model/paginacao/paginacao-dto';


@Component({
    selector: 'app-estadolist',
    standalone: true,
    templateUrl: './estadolist.component.html',
    styleUrl: './estadolist.component.scss',
    imports: [EstadodetailComponent]
})
export class EstadolistComponent {

  estadoService = inject(EstadoService);
  estados: EstadoDTO[] = [];
  paginacaoDTO = new PaginacaoDTO;
  estadoDTOedit = new EstadoDTO();

  errorDTO = new ErrorDTO;
  mensagemErro!: string;

  nomeDaModal!: string;

  // Variáveis para controlar a paginação
  paginaItens: number[] = [];
  paginaItensTemp: number[] = [];
  paginaDestaque: string[] = [];
  paginaAtual: number = 0;
  paginaPrimeira!: string;
  paginaUltima!: string;

  QtdeElementosPorPagina: number = 10;

  constructor() {
    this.processarPagina(0);
  }

  estadosListar(page: number, size:number) {
    this.estadoService.listar(page, size).subscribe({
      next: sucesso => {
        this.estados = sucesso.content;
        this.paginacaoDTO = sucesso.pageable;
        this.paginacaoDetalhes();
      },
      error: erros => {
        this.errorDTO = erros.error;
        if(this.errorDTO != null && this.errorDTO.dsMensUsuario != null) {
          this.mensagemErro = this.errorDTO.dsMensUsuario;
        } else {
          this.mensagemErro = 'Erro não identificado, contacte o administrador.';
        }
      }
    });
  }

  estadoCadastrar() {
    this.estadoDTOedit = new EstadoDTO();
    this.nomeDaModal = 'Cadastrar';
  }

  estadoEditar(estadoDTO: EstadoDTO) {
    this.estadoDTOedit = Object.assign({}, estadoDTO); //Clonado para evitar referencia de objeto
    this.nomeDaModal = 'Alterar';
  }

  estadoExcluir(estado: EstadoDTO) {
      // Exibe mensagem de confirmação
      Swal.fire({
        title: 'Confirma excluir o estado: ' + estado.dsNome + '?',
        icon: 'warning',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {

          this.estadoService.excluir(estado.sqEstado).subscribe({
            next: mensagem => {
              Swal.fire({
                title: 'Registro excluido com sucesso.',
                icon: 'success',
                confirmButtonText: 'Ok',
              });
              this.estadosListar(0, this.QtdeElementosPorPagina);
            },
            error: erros => {
              this.errorDTO = erros.error;
              if(this.errorDTO != null && this.errorDTO.dsMensUsuario != null) {
                this.mensagemErro = this.errorDTO.dsMensUsuario;
              } else {
                this.mensagemErro = 'Erro não identificado, contacte o administrador.';
              }
              Swal.fire({
                title: this.mensagemErro,
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          });
        }
      });
   }

  fecharModal() {
    this.estadosListar(0, this.QtdeElementosPorPagina);
  }

  paginacaoDetalhes() {

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

  processarPrimeiraPagina(): void {
     this.processarPagina(0);
  }

  processarUltimaPagina(): void {
    this.processarPagina(this.paginacaoDTO.totalPages - 1);
  }

  processarVoltarPagina(): void {
    if(this.paginacaoDTO.pageNumber > 0) {
      this.processarPagina(this.paginacaoDTO.pageNumber - 1);
    }
  }

  processarAvancarPagina(): void {
    if(this.paginacaoDTO.pageNumber < this.paginacaoDTO.totalPages) {
      this.processarPagina(this.paginacaoDTO.pageNumber + 1);
    }
  }

  processarPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.estadosListar(this.paginaAtual, this.QtdeElementosPorPagina);
  }

  obterSelect(e:any) {
    this.QtdeElementosPorPagina = e.target.value;
    this.processarPagina(0);
  }

}
