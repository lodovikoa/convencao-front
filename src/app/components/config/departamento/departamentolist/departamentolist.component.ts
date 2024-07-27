import { Component, inject } from '@angular/core';
import { DepartamentoService } from '../../../../services/departamento/departamento.service';
import { DepartamentoDTO } from '../../../../models/departamento/departamento-dto';
import { ErrorDTO } from '../../../../models/error/error-dto';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { LoginService } from '../../../../services/login/login.service';
import { DepartamentodetailComponent } from "../departamentodetail/departamentodetail.component";

@Component({
  selector: 'app-departamentolist',
  standalone: true,
  imports: [DepartamentodetailComponent],
  templateUrl: './departamentolist.component.html',
  styleUrl: './departamentolist.component.scss'
})
export class DepartamentolistComponent {

  loginService = inject(LoginService);

  departamentoService = inject(DepartamentoService);
  departamentos: DepartamentoDTO[] = [];
  departamentoDTOEdit = new DepartamentoDTO();
  errorDTO = new ErrorDTO;

  nomeDaModal!: string;

  constructor(){
    this.listar();
  }

  listar() {
    this.departamentoService.listar().subscribe({
      next: sucesso => {
        this.departamentos = sucesso;
      },
      error: erros => {
        this.exibirErros(erros.erro, erros.status, erros.url);
      }
    });
  }

  cadastrar() {
    this.departamentoDTOEdit = new DepartamentoDTO();
    this.nomeDaModal = 'Cadastrar';
  }

  editar(departamentoDTO: DepartamentoDTO) {
    this.departamentoDTOEdit = Object.assign({},departamentoDTO);
    this.nomeDaModal = 'Alterar';
  }

  excluir(departamenmtoExcluir: DepartamentoDTO) {
    Swal.fire({
      title: 'Confirmar excluir o departamento: ' + departamenmtoExcluir.dsReduzido + '?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não'
    }).then((result) => {
      if(result.isConfirmed) {
        this.departamentoService.excluir(departamenmtoExcluir.sqDepartamento).subscribe({
          next: mensagem => {
            Swal.fire({
              title: 'Registro excluido com sucesso.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.listar();
          },
          error: erros => {
            console.log(erros);

            this.exibirErros(erros.error, erros.status, erros.url);
          }
        });
      }
    });
  }

  fecharModal() {
    this.listar();
  }

  exibirErros(errorDTO: ErrorDTO, codErro: number, url: string) {
    Swal.fire({
      title: errorDTO != null && errorDTO.dsMensUsuario != null? errorDTO.dsMensUsuario + '<br>Código erro: ' + codErro: environment.erroNaoIdntificado + '<br>Código erro: ' + codErro + '<br>url:' + url,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

}
