
import { Component, inject } from '@angular/core';
import { EstadoService } from '../../../../services/estado/estado.service';
import { EstadoDTO } from '../../../../models/estado/estado-dto';
import { ErrorDTO } from '../../../../models/error/error-dto';
import Swal from 'sweetalert2';
import { EstadodetailComponent } from "../estadodetail/estadodetail.component";
import { PaginacaoDTO } from '../../../../models/paginacao/paginacao-dto';
import { PaginatorComponent } from "../../paginator/paginator.component";
import { PaginacaoRetornoDTO } from '../../../../models/paginacao/paginacao-retorno-dto';
import { environment } from '../../../../../environments/environment';


@Component({
    selector: 'app-estadolist',
    standalone: true,
    templateUrl: './estadolist.component.html',
    styleUrl: './estadolist.component.scss',
    imports: [EstadodetailComponent, PaginatorComponent]
})
export class EstadolistComponent {

  estadoService = inject(EstadoService);
  estados: EstadoDTO[] = [];
  paginacaoDTO = new PaginacaoDTO;
  estadoDTOedit = new EstadoDTO();

  errorDTO = new ErrorDTO;
  mensagemErro!: string;

  nomeDaModal!: string;

  constructor() {
    this.estadosListar(0, environment.qdteElementosPorPagina);
  }

  estadosListar(page: number, size:number) {
    this.estadoService.listar(page, size).subscribe({
      next: sucesso => {
        console.log('Sucesso');
        console.log(sucesso);

        this.estados = sucesso.content;
        this.paginacaoDTO = sucesso.pageable;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status);
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
              this.estadosListar(0, environment.qdteElementosPorPagina);
            },
            error: erros => {
              this.exibirErros(erros.error, erros.status);
            }
          });
        }
      });
   }

  fecharModal() {
    this.estadosListar(0, environment.qdteElementosPorPagina);
  }

   onPaginacaoProcessar(pg: PaginacaoRetornoDTO) {
    this.estadosListar(pg.paginaSelecionada, pg.qtdeElementosPorPagina);
  }

  exibirErros(errorDTO: ErrorDTO, codErro: number) {
    Swal.fire({
      title: errorDTO != null && errorDTO.dsMensUsuario != null? errorDTO.dsMensUsuario + ' Código erro: ' + codErro: environment.erroNaoIdntificado + ' Código erro: ' + codErro,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}
