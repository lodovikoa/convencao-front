import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartamentoDTO } from '../../../../models/departamento/departamento-dto';
import { DepartamentoService } from '../../../../services/departamento/departamento.service';
import { ErrorDTO } from '../../../../models/error/error-dto';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-departamentodetail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './departamentodetail.component.html',
  styleUrl: './departamentodetail.component.scss'
})
export class DepartamentodetailComponent {

  @Input('departamentoDTO') departamentoDTO = new DepartamentoDTO();
  departamentoService = inject(DepartamentoService);
  mensagemErro!: string;

  isFormSubmetido: boolean = false;

  constructor() {}

  salvar() {
    if(this.departamentoDTO.sqDepartamento > 0) {
      this.alterar();
    } else {
      this.cadastrar();
    }
  }

  alterar() {
    this.departamentoService.alterar(this.departamentoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Departamento ' + resultado.dsReduzido + ' alterado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.departamentoDTO = new DepartamentoDTO();
        this.isFormSubmetido = false;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status, erros.url);
      }
    });
  }

  cadastrar() {
    this.departamentoService.cadastrar(this.departamentoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Departamento ' + resultado.dsReduzido + ' cadastrado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.departamentoDTO = new DepartamentoDTO();
        this.isFormSubmetido = false;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status, erros.url);
      }
    });
  }

  exibirErros(errorDTO: ErrorDTO, codErro: number, url: string) {
    Swal.fire({
      title: errorDTO != null && errorDTO.dsMensUsuario != null? errorDTO.dsMensUsuario + '<br>Código erro: ' + codErro: environment.erroNaoIdntificado + '<br>Código erro: ' + codErro + '<br>url:' + url,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}
