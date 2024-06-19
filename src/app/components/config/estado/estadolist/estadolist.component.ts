import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
    this.processarPagina(0);
    // this.estadosListar(0, this.QtdeElementosPorPagina);
  }

  estadosListar(page: number, size:number) {
    this.estadoService.listar(page, size).subscribe({
      next: sucesso => {
        this.estados = sucesso.content;
        this.paginacaoDTO = sucesso.pageable;
        console.log('Página número          : ' + this.paginacaoDTO.pageNumber);
        console.log('Qtde por página        : ' + this.paginacaoDTO.pageSize);
        console.log('Qtde de página         : ' + this.paginacaoDTO.totalPages);
        console.log('Qtde total de registros: ' + this.paginacaoDTO.totalElements);
        console.log('É primeira página      : ' + this.paginacaoDTO.firstPage);
        console.log('É última página        : ' + this.paginacaoDTO.lastPage);

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
      this.paginaPrimeira = this.paginacaoDTO.firstPage? 'disabled desabilitarClic': '';
      this.paginaUltima = this.paginacaoDTO.lastPage? 'disabled desabilitarClic': '';

      // let pgTemp = Math.trunc(this.paginacaoDTO.totalPages / 7);

      // console.log('parte: ' + pgTemp);

      this.montarPagina();

    }

    processarPagina(pagina: number) {

      console.log('-----> ' + this.QtdeElementosPorPagina);

      if(pagina == 0) {  //  Clicou para Primeira página
        this.paginaAtual = 0;
      } else if(pagina == -9) { // Clicou para última página
        this.paginaAtual = this.paginacaoDTO.totalPages - 1;
      } else if(pagina == -1) { // Clicou para voltar uma página
        this.paginaAtual = this.paginacaoDTO.pageNumber - 1;
      } else if(pagina == -2) { // Clicou para avançar uma pagina
        this.paginaAtual = this.paginacaoDTO.pageNumber + 1;
      } else if(pagina >= 0) {
        this.paginaAtual = pagina;
      }

      this.estadosListar(this.paginaAtual, this.QtdeElementosPorPagina);

      this.paginaAtiva(this.paginaAtual);

      // for(let i=this.paginacaoDTO.pageNumber; i <= this.paginacaoDTO.totalPages; i++) {

      // }

    }

    montarPagina() {

      console.log('Montando a página................ a página atual é: ' + this.paginaAtual);

      this.ocultarItem1 = this.ocultarItem2 = this.ocultarItem3 = this.ocultarItem4 = this.ocultarItem5 = this.ocultarItem6 =  this.ocultarItem7 =  false;

      if(this.paginacaoDTO.totalPages <=7) {

        this.numPageItem1 = 1; this.numPageItem2 = 2; this.numPageItem3 = 3; this.numPageItem4 = 4; this.numPageItem5 = 5; this.numPageItem6 = 6; this.numPageItem7 = 7;

        this.ocultarItem2 = this.paginacaoDTO.totalPages < 2;
        this.ocultarItem3 = this.paginacaoDTO.totalPages < 3;
        this.ocultarItem4 = this.paginacaoDTO.totalPages < 4;
        this.ocultarItem5 = this.paginacaoDTO.totalPages < 5;
        this.ocultarItem6 = this.paginacaoDTO.totalPages < 6;
        this.ocultarItem7 = this.paginacaoDTO.totalPages < 7;
      } else {
        // TODO desenvolver

        let i = 0;

          if(this.paginaAtual > 6) {
            i = this.paginaAtual;

            if(i-7 >= 0 ) {
              this.numPageItem1 = this.paginaAtual - 7; this.numPageItem2 = this.paginaAtual - 6; this.numPageItem3 = this.paginaAtual - 5; this.numPageItem4 = this.paginaAtual - 4; this.numPageItem5 = this.paginaAtual - 3; this.numPageItem6 = this.paginaAtual - 2; this.numPageItem7 = this.paginaAtual - 1;
            }
          }

      }
    }

    obterSelect(e:any) {
      this.QtdeElementosPorPagina = e.target.value;
      this.processarPagina(0);
    }

    paginaAtiva(pagina: number) {
      // active
      this.paginaItem1 = pagina == 0? 'active desabilitarClic': '' ;
      this.paginaItem2 = pagina == 1? 'active desabilitarClic': '' ;
      this.paginaItem3 = pagina == 2? 'active desabilitarClic': '' ;
      this.paginaItem4 = pagina == 3? 'active desabilitarClic': '' ;
      this.paginaItem5 = pagina == 4? 'active desabilitarClic': '' ;
      this.paginaItem6 = pagina == 5? 'active desabilitarClic': '' ;
      this.paginaItem7 = pagina == 6? 'active desabilitarClic': '' ;
    }
}
