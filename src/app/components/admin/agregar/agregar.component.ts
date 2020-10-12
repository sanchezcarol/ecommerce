import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  producto:Producto = new Producto();
  _URL_ = environment.apiUrl

  constructor(private productService:ProductService, private http: HttpClient) { }

  title: string;
  cover: File;
  imagen

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.cover = event.target.files[0];
  }

  newBook() {
    const uploadData = new FormData();
    uploadData.append('cover', this.cover, this.cover.name);
    this.http.post(`${this._URL_}/API/products/`, uploadData).subscribe(
      (data:any) => {console.log(data), this.imagen = data.cover },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
  }

  create(f : NgForm){
    
    this.producto.stock = 0
    const uploadData = new FormData();
    uploadData.append('cover', this.cover, this.cover.name);
    uploadData.append('nombre', f.value.inputNombre );
    uploadData.append('modelo', f.value.inputModelo );
    uploadData.append('precio', f.value.inputPrecio );
    uploadData.append('marca', f.value.inputMarca );
    uploadData.append('descripcion', f.value.inputDescripcion );
    uploadData.append('stock', '0' );



    this.http.post(`${this._URL_}/API/products/`, uploadData).subscribe(
      (data:any) => {
        Swal.fire('Producto añadido', 'success'),
        this.imagen = data.cover,
        setTimeout('location.reload()',1000)
      },
      error => console.log(error)
    );

  }

}
