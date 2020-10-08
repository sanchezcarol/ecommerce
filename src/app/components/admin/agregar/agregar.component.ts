import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  producto:Producto = new Producto();
  

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  create(f : NgForm){

    this.producto.descripcion = f.value.inputDescripcion,
    this.producto.marca = f.value.inputMarca,
    this.producto.modelo = f.value.inputModelo,
    this.producto.nombre= f.value.inputNombre,
    this.producto.precio= f.value.inputPrecio
    this.producto.stock = 0;

    this.productService.crear(this.producto).subscribe(
      
      resp => {console.log(resp); },
      err => {console.log('el error', err);
      }
      
      
      
      )
    

  }

}
