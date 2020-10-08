import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UpdateComponent } from './modal/update/update.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  lentes = []
  @ViewChild(UpdateComponent,{static:true}) modal:UpdateComponent

  constructor(private productService:ProductService ) { }

  ngOnInit(): void {

    this.obtenerLentes()

  }

  obtenerLentes(){
    this.productService.obtener().subscribe(resp=>{
      console.log(resp);
      this.lentes = resp
      // console.log(this.lentes[0]);
      
    } )
  }


  rellenarModal(producto){
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    this.modal.viewModal(producto)
  }

  eliminar(id){
    this.productService.eliminarProducto(id).subscribe(resp =>{
      console.log('producto eliminado ', resp);
      
    })
  }

}
