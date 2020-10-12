import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AgregarComponent } from './components/admin/agregar/agregar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { UpdateComponent } from './components/admin/modal/update/update.component';
import { VentasComponent } from './components/admin/ventas/ventas.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AdminComponent,
    AgregarComponent,
    UpdateComponent,
    VentasComponent,
    FooterComponent,
    UsuariosComponent
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
