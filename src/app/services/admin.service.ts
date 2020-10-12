import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  _URL_ = environment.apiUrl

  constructor(public http:HttpClient ) { }

  ventas(){

    let url = `${this._URL_}/API/ventas/`
    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log('resp ', resp);

        return resp
      })
    )
  }

  ventas_user(id){

    let url = `${this._URL_}/API/ventas/by_user/${id}`
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp
      })
    )

  }

  usuarios(){
    
    let url = `${this._URL_}/API/users/`
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }

  obtenerusuario(id){

    let url = `${this._URL_}/API/users/${id}`
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp
      })
    )

  }

  cambiar(passwordOld,passwordNew,id){
    let url = `${this._URL_}/API/users/password/${id}/`
    return this.http.put(url,{passwordOld,passwordNew}).pipe(
      map((resp: any) => {
        Swal.fire('Contraseña modificada', 'success')
        return resp
      }),
      catchError(err => {
        Swal.fire( 'Error', err.error.detail, 'error' );
        return throwError(err)
      })
    )
  }

  eliminar_usuario(id){
    let url = `${this._URL_}/API/users/${id}/`
    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp
      })
    )
  }

}
