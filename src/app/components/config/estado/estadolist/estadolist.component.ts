import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { EstadoService } from '../../../../servico/estado/estado.service';
import { EstadoDTO } from '../../../../model/estado/estado-dto';
import { ErrorDTO } from '../../../../model/error/error-dto';
import Swal from 'sweetalert2';
import { EstadodetailComponent } from "../estadodetail/estadodetail.component";

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
  errorDTO = new ErrorDTO;
  mensagemErro!: string;

  nomeDaModal!: string;
  inclusaoModal: boolean = true;

  constructor() {
    this.estadosListar();
  }

  estadosListar() {
    this.estadoService.listar().subscribe({
      next: sucesso => {
        this.estados = sucesso;
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

  estadoNovo() {
    alert('Novo estado');
  }

  estadoEditar(estado: EstadoDTO) {
    alert("Editar estado.");
    this.inclusaoModal = false;
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
              this.estadosListar();
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

    abrirModal() {
      // Alguma ação necessária ao abrir a modal
      if(this.inclusaoModal) {
        this.nomeDaModal = 'Cadastrar';
      } else {
        this.nomeDaModal = 'Alterar';
      }



    }

    fecharModal() {
      this.estadosListar();
    }
}
