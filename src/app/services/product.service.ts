import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _URL_ = 'http://localhost:8000'

  constructor(public http: HttpClient) { }

  crear(form) {

    // this.obtener().subscribe(resp=>{
    //   console.log('la rrsp ', resp);

    // })
    let url = `${this._URL_}/API/products/`
    // console.log(form);

    return this.http.post(url, form).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')
        console.log('resp ', resp);

        return resp
      })
    )

  }

  obtener() {
    console.log('quiero los productos');

    let url = `${this._URL_}/API/products/`
    return this.http.get(url).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')
        console.log('resp ', resp);

        return resp
      })
    )


  }

  register(user) {

    let url = `${this._URL_}/API/users/`
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')
        return resp
      })
    )


  }

  actualizarProducto(producto) {
    let url = `${this._URL_}/API/products/${producto.id}/`

    return this.http.put(url, producto).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')

        return resp
      })
    )
  }

  eliminarProducto(id) {


    let url = `${this._URL_}/API/products/${id}/`

    return this.http.delete(url).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')

        return resp
      })
    )

  }

  login(user) {

    let url = 'http://127.0.0.1:8000/API/login/'
    console.log(user);

    return this.http.post(url, user).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')

        return resp
      }),
      catchError(err => {
        // Swal.fire( 'Error Registrando Usuario', err.error.errors.message, 'error' );
        console.log(err);
        return throwError(err)
      })
    )

  }


  realizar_compra(compra){
    let url = 'http://127.0.0.1:8000/API/ventas/'

    console.log(compra);
    

    return this.http.post(url, compra).pipe(
      map((resp: any) => {
        // Swal.fire('Usuario creado exitosamente', user.email, 'success')

        return resp
      }),
      catchError(err => {
        // Swal.fire( 'Error Registrando Usuario', err.error.errors.message, 'error' );
        console.log(err);
        return throwError(err)
      })
    )
  }



}
