import { Component, inject } from '@angular/core';
import { ConvencaoService } from '../../../../services/convencao/convencao.service';
import { ConvencaoDTO } from '../../../../models/convencao/convencao-dto';
import { ErrorDTO } from '../../../../models/error/error-dto';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { ConvencaodetailComponent } from "../convencaodetail/convencaodetail.component";
import { EstadoDTO } from '../../../../models/estado/estado-dto';

@Component({
    selector: 'app-convencaolist',
    standalone: true,
    templateUrl: './convencaolist.component.html',
    styleUrl: './convencaolist.component.scss',
    imports: [ConvencaodetailComponent]
})
export class ConvencaolistComponent {

  convencaoService = inject(ConvencaoService);
  convencoes: ConvencaoDTO[] = [];
  convencaoDTOEdit = new ConvencaoDTO();

  mensagemErro!: string;

  nomeDaModal!: string;

  constructor() {
    this.convencaoListar();
  }

  convencaoListar() {
    this.convencaoService.listar().subscribe({
      next: sucesso => {
        this.convencoes = sucesso;
      },
      error: erros => {
        console.log(erros.status);

        this.exibirErros(erros.error, erros.status);
      }
    });
  }

  convencaoCadastrar() {
    this.convencaoDTOEdit = new ConvencaoDTO();
    this.convencaoDTOEdit.estado = new EstadoDTO();
    this.nomeDaModal = 'Cadastrar';

  }

  convencaoEditar(convencaoDTO: ConvencaoDTO) {
    this.convencaoDTOEdit = Object.assign({}, convencaoDTO); //Clonado para evitar referencia de objeto
    this.nomeDaModal = 'Alterar';
  }

  convencaoExcluir( convenvao: ConvencaoDTO ) {
    Swal.fire({
      title: 'Confirmar excluir a convenção: ' + convenvao.dsReduzido + '?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: "Não"
    }).then((result) => {
      if(result.isConfirmed) {
        this.convencaoService.excluir(convenvao.sqConvencao).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Registro excluido com sucesso.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.convencaoListar();
          },
          error: erros => {
            this.exibirErros(erros.error, erros.status);
          }
        });
      }

    })
  }

  fecharModal() {
    this.convencaoListar();
  }

  exibirErros(errorDTO: ErrorDTO, codErro: number) {
    Swal.fire({
      title: errorDTO != null && errorDTO.dsMensUsuario != null? errorDTO.dsMensUsuario + ' Código do erro: ' + codErro: environment.erroNaoIdntificado + ' Código do erro: ' + codErro,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

}
