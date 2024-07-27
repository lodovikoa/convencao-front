import { Component, Input, inject } from '@angular/core';
import { EstadoDTO } from '../../../../models/estado/estado-dto';
import { FormsModule } from '@angular/forms';
import { EstadoService } from '../../../../services/estado/estado.service';
import Swal from 'sweetalert2';
import { ErrorDTO } from '../../../../models/error/error-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';

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
        this.exibirErros(erros.error, erros.status, erros.url);
      }
    });
  }

  salvar() {
    this.isFormSubmetido = true;
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
        this.exibirErros(erros.error, erros.status, erros.url);
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
