import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './login';
import { RegistrarComponent } from './registrar';
import { HubComponent } from './hub';
import { CadastrarComponent } from './cadastrar/cadastrar.component';


const routes: Routes = [
  {path: 'login', component: ComponentsComponent},
  {path: 'registrar', component: RegistrarComponent},
  {path: 'hub', component: HubComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
