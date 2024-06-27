import { Component, Input, inject } from '@angular/core';
import { EstadoDTO } from '../../../../model/estado/estado-dto';
import { FormsModule, NgForm } from '@angular/forms';
import { EstadoService } from '../../../../servico/estado/estado.service';
import Swal from 'sweetalert2';
import { ErrorDTO } from '../../../../model/error/error-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-estadodetail',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './estadodetail.component.html',
  styleUrl: './estadodetail.component.scss'
})
export class EstadodetailComponent {

  @Input('estadoDTO') estadoDTO = new EstadoDTO();
  routerActivate = inject(ActivatedRoute);
  router = inject(Router);

  estadoService = inject(EstadoService);
  mensagemErro!: string;
  isFormSubmetido: boolean = false;

  constructor() {
    let id = this.routerActivate.snapshot.params['id'];
    if(id > 0) {
      this.buscarPorId(id);
    }
  }

  buscarPorId(sqEstado: number) {
    this.estadoService.buscarPorId(sqEstado).subscribe({
      next: resultado => {
        this.estadoDTO = resultado;
      },
      error: erros => {
        this.exibirErros(erros.error);
      }
    });
  }

  salvar(form: NgForm) {
    this.isFormSubmetido = true;
    // form.setValue({'dsNome.touched': false, 'dsNome.dirty': false})
    if(this.estadoDTO.sqEstado > 0) {
      this.alterar();
    } else {
      this.cadastrar();
    }
  }

  alterar() {
    this.estadoService.alterar(this.estadoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Estado ' + resultado.dsNome + ' alterado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.estadoDTO = new EstadoDTO();
      },
      error: erros => {
        this.exibirErros(erros.error);
      }
    });
  }

  cadastrar() {
    this.estadoService.cadastrar(this.estadoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Estado ' + resultado.dsNome + ' cadastrado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.estadoDTO = new EstadoDTO();
        this.isFormSubmetido = false;
      },
      error: erros => {
        this.exibirErros(erros.error);
      }
    });
  }

  exibirErros(errorDTO: ErrorDTO) {
    if(errorDTO != null &&  errorDTO.dsMensUsuario != null) {
      this.mensagemErro = errorDTO.dsMensUsuario;
    } else {
      this.mensagemErro = 'Ocorreu algum erro não identificado. Contacte o administrador.'
    }
    Swal.fire({
      title: this.mensagemErro,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }
}
