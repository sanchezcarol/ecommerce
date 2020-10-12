import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component'
import { AdminComponent } from './components/admin/admin.component'
import { AgregarComponent } from './components/admin/agregar/agregar.component'
import { VentasComponent } from './components/admin/ventas/ventas.component'
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component'

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/add-product', component: AgregarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShoppingCartComponent },
  { path: 'admin/ventas', component: VentasComponent },
  { path: 'admin/usuarios', component: UsuariosComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
