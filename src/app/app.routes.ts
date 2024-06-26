import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { EstadolistComponent } from './components/config/estado/estadolist/estadolist.component';
import { EstadodetailComponent } from './components/config/estado/estadodetail/estadodetail.component';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "convencao", component: PrincipalComponent,
    children: [
      { path: "estados", component: EstadolistComponent  },
      { path: "estados/new", component: EstadodetailComponent },
      { path: "estados/edit/:id", component: EstadodetailComponent}
    ]
   }
];
