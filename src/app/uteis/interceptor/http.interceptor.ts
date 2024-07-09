import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  let router = inject(Router);

  // Inclui o token do localstorage em cada requisição http (header)
  let token = localStorage.getItem('tokenApiConvencao');
  if(token && !router.url.includes('/login')) {
    req = req.clone({
      setHeaders: { Authorization: 'Bearer ' + token }
    });
  }

  // Tratamento dos responses... podemos tratar os erros genericamente aqui
  return next(req).pipe(
    catchError((err: any) => {
      if(err instanceof HttpErrorResponse) {
        if(err.status === 401) {
          console.log('Erro 401-Unauthorized - Não autorizado para o recurso solicitado.');
          router.navigate(['convencao']);
        } else if(err.status === 403) {
          console.log('Erro 403-Forbidden - Permissão não liberada para o recurso solicitado.');
          router.navigate(['convencao']);
        } else {
          console.error('HTTP error: ', err);
        }
      } else {
        console.error('Um erro ocorreu:', err);
      }

      return throwError(() => err);
    })
  );
};

