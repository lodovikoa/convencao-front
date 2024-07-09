import { Component, Input, inject } from '@angular/core';
import { ConvencaoDTO } from '../../../../models/convencao/convencao-dto';
import { ConvencaoService } from '../../../../services/convencao/convencao.service';
import { ErrorDTO } from '../../../../models/error/error-dto';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstadoDTO } from '../../../../models/estado/estado-dto';
import { EstadoService } from '../../../../services/estado/estado.service';

@Component({
  selector: 'app-convencaodetail',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './convencaodetail.component.html',
  styleUrl: './convencaodetail.component.scss'
})
export class ConvencaodetailComponent {

  @Input('convencaoDTO') convencaoDTO = new ConvencaoDTO();

  convencaoService = inject(ConvencaoService);
  estadoService = inject(EstadoService);
  mensagemErro!: string;
  isFormSubmetido: boolean = false;

  estadosDTO: EstadoDTO[] = [];
  dsEstadoSelecionado = new FormControl('');
  sqEstadoSelecionado: string = '';

  constructor() {
  }

  ngOnInit() {
    console.log('============== LISTANDO ESTADOS ===========');

    this.listarEstados();
  }

  capturarEstado(value: any) {
    this.sqEstadoSelecionado = value.target.value ?? ''

    this.convencaoDTO.estado.sqEstado =  parseInt(this.sqEstadoSelecionado);

    console.log('sqEstadoSelecionado: ' + this.sqEstadoSelecionado);
    console.log('convencaoDTO.estado: ' + this.convencaoDTO.estado);
    console.log('convencaoDTO.estado.sqEstado: ' + this.convencaoDTO.estado.sqEstado);


  }

  listarEstados() {
    this.estadoService.listarTudo().subscribe({
      next: resultado => {
        this.estadosDTO = resultado;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status);
      }
    });
  }

  buscarPorId(sqConvencao: number) {
    this.convencaoService.buscarPorId(sqConvencao).subscribe({
      next: resultado => {
        this.convencaoDTO = resultado;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status);
      }
    });
  }

  salvar() {
    console.log('Estados: ' + this.estadosDTO);
    if(this.convencaoDTO.sqConvencao > 0) {
      this.alterar();
    } else {
      this.cadastrar();
    }
  }

  alterar() {
    this.convencaoService.alterar(this.convencaoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Convenção ' + resultado.dsReduzido + 'alterado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.convencaoDTO = new ConvencaoDTO();
        this.isFormSubmetido = false;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status);
      }
    });
  }

  cadastrar() {
    this.convencaoService.cadastrar(this.convencaoDTO).subscribe({
      next: resultado => {
        Swal.fire({
          title: 'Convenção ' + resultado.dsReduzido + ' cadastrado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        document.getElementById("closeModalButton")?.click();
        this.convencaoDTO = new ConvencaoDTO();
        this.isFormSubmetido = false;
      },
      error: erros => {
        this.exibirErros(erros.error, erros.status);
      }
    });
  }

  exibirErros(errorDTO: ErrorDTO, codErro: number) {
    Swal.fire({
      title: errorDTO != null && errorDTO.dsMensUsuario  + ' Código do erro: ' + codErro!= null? errorDTO.dsMensUsuario: environment.erroNaoIdntificado + ' Código do erro: ' + codErro,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

  compareStates(s1: ConvencaoDTO, s2: ConvencaoDTO) {
    if(s1 != null && s1 != null) {
      return s1.estado.sqEstado == s2.estado.sqEstado;
    }
    return false;
  }

}
