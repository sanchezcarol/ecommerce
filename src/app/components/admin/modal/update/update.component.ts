import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  hidden:string = 'hidden-modal'
  producto:Producto

  constructor(private productService:ProductService ) { }

  ngOnInit(): void {
  }

  viewModal(product){
    this.producto = product
    this.hidden = ''
 
  }

  close() {
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    this.hidden = 'hidden-modal'
  }

  actualizar(f){

    this.productService.actualizarProducto(this.producto).subscribe(resp=>{
      console.log('resp ',resp);
      
    })
    
  }
}
