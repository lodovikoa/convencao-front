import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  let router = inject(Router);

  if((state.url == '/convencao/estados') && !(loginService.hasPermission("T_CFT_CONVENCAO_LISTAR"))) {
    alert('Sem permissão para a URL: ' + state.url);
    router.navigate(['convencao']);
    return false;
  }

  return true;
};
