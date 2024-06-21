import { Component, inject } from '@angular/core';
import { EstadoService } from '../../../../servico/estado/estado.service';
import { EstadoDTO } from '../../../../model/estado/estado-dto';
import { ErrorDTO } from '../../../../model/error/error-dto';
import Swal from 'sweetalert2';
import { EstadodetailComponent } from "../estadodetail/estadodetail.component";
import { PaginacaoDTO } from '../../../../model/paginacao/paginacao-dto';
import { EMPTY } from 'rxjs';


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

  paginaItem1!: string;
  paginaItem2!: string;
  paginaItem3!: string;
  paginaItem4!: string;
  paginaItem5!: string;
  paginaItem6!: string;
  paginaItem7!: string;


  ocultarItem1: boolean = false;
  ocultarItem2: boolean = false;
  ocultarItem3: boolean = false;
  ocultarItem4: boolean = false;
  ocultarItem5: boolean = false;
  ocultarItem6: boolean = false;
  ocultarItem7: boolean = false;

  numPageItem1: number = 1;
  numPageItem2: number = 2;
  numPageItem3: number = 3;
  numPageItem4: number = 4;
  numPageItem5: number = 5;
  numPageItem6: number = 6;
  numPageItem7: number = 7;


  QtdeElementosPorPagina: number = 10;

  constructor() {
    this.processarPagina(0, 1);
    // this.estadosListar(0, this.QtdeElementosPorPagina);
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
    // this.paginaItens = Array(this.paginacaoDTO.totalPages).fill(0).map((x,i) => i);

    let primeiroItemExibir = 0;
    let ultimoItemExibir = this.paginacaoDTO.totalPages

    if(this.paginacaoDTO.pageNumber > 3 && this.paginacaoDTO.totalPages > 7) {
      primeiroItemExibir = this.paginacaoDTO.pageNumber - 3;
    }

    this.paginaItens = Array(ultimoItemExibir - primeiroItemExibir);


    for(let i = 0; i < ultimoItemExibir; i++) {
     if(i >= primeiroItemExibir) {
        this.paginaItensTemp[i] = i;
      }

    }

    this.paginaItens = this.paginaItensTemp.filter(n => n >= primeiroItemExibir);

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
     this.processarPagina(0, 1);
  }

  processarUltimaPagina(): void {
    this.processarPagina(this.paginacaoDTO.totalPages - 1, 7);
  }

  processarVoltarPagina(): void {
    if(this.paginacaoDTO.pageNumber > 0) {
      this.processarPagina(this.paginacaoDTO.pageNumber - 1, 1);
    }
  }

  processarAvancarPagina(): void {
    if(this.paginacaoDTO.pageNumber < this.paginacaoDTO.totalPages) {
      this.processarPagina(this.paginacaoDTO.pageNumber + 1, 7);
    }
  }

  processarPagina(pagina: number, item: number) {
    this.paginaAtual = pagina;

    this.estadosListar(this.paginaAtual, this.QtdeElementosPorPagina);

  }

  obterSelect(e:any) {
    this.QtdeElementosPorPagina = e.target.value;
    this.processarPagina(0, 1);
  }

}
