import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio',pathMatch:'full'} ,
  {path:'inicio',component:UsuarioComponent},
  {path:'mensaje/:id',component:MensajeComponent},
  {path:'**',redirectTo:'/inicio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
