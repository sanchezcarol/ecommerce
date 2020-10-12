import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _URL_ = environment.apiUrl

  constructor(public http: HttpClient) { }

  crear(form,imagen) {

    let url = `${environment.apiUrl}/API/products/`
    return this.http.post(url, form).pipe(
      map((resp: any) => {
        Swal.fire('Producto creado exitosamente', 'success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error', 'error' );
        return throwError(err)
      })
    )

  }

  obtener() {
    console.log('quiero los productos');

    let url = `${this._URL_}/API/products/`
    return this.http.get(url).pipe(
      map((resp: any) => {

        return resp
      })
    )
  }

  register(user) {

    let url = `${this._URL_}/API/users/`
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        Swal.fire('Cuenta creada exitosamente','success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Intente nuevamente', 'Debe completar todos los campos', 'error' );
        return throwError(err)
      })
    )


  }

  actualizarProducto(producto,id) {
    let url = `${this._URL_}/API/products/${id}/`

    return this.http.put(url, producto).pipe(
      map((resp: any) => {
        
        Swal.fire('Producto actualizado exitosamente', 'success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error', 'error' );
        return throwError(err)
      })
    )
  }

  obtenerProducto(id){

    let url = `${this._URL_}/API/products/${id}/`

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp
      })
    )

  }

  eliminarProducto(id) {


    let url = `${this._URL_}/API/products/${id}/`

    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error', 'error' );
        return throwError(err)
      })
    )

  }

  login(user) {

    let url = `${this._URL_}/API/login/`
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error', err.error.detail, 'error' );
        return throwError(err)
      })
    )

  }


  realizar_compra(compra){
    let url = `${this._URL_}/API/ventas/` 

    return this.http.post(url, compra).pipe(
      map((resp: any) => {
        Swal.fire('Compra realizada', 'success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error','error' );
        console.log(err);
        return throwError(err)
      })
    )
  }



}
