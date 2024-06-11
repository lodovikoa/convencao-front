import { Component, inject } from '@angular/core';
import { EstadoDTO } from '../../../../model/estado/estado-dto';
import { FormsModule } from '@angular/forms';
import { EstadoService } from '../../../../servico/estado/estado.service';
import Swal from 'sweetalert2';
import { ErrorDTO } from '../../../../model/error/error-dto';

@Component({
  selector: 'app-estadodetail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estadodetail.component.html',
  styleUrl: './estadodetail.component.scss'
})
export class EstadodetailComponent {

  estadoDTO = new EstadoDTO();
  errorDTO = new ErrorDTO();
  estadoService = inject(EstadoService);
  mensagemErro!: string;

    constructor() {}


    salvar() {
      if(this.estadoDTO.sqEstado > 0) {
          alert('sqEstado > 0');
      } else {
        this.estadoService.cadastrar(this.estadoDTO).subscribe({
          next: resultado => {
            Swal.fire({
              title: 'Estado ' + resultado.dsNome + ' cadastrado com sucesso.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            document.getElementById("closeModalButton")?.click();
            this.estadoDTO = new EstadoDTO();
          },
          error: erros => {
            this.errorDTO = erros.error;
            if(this.errorDTO != null &&  this.errorDTO.dsMensUsuario != null) {
              this.mensagemErro = this.errorDTO.dsMensUsuario;
            } else {
              this.mensagemErro = 'Ocorreu algum erro não identificado. Contacte o administrador.'
            }
            Swal.fire({
              title: this.mensagemErro,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    }
}
