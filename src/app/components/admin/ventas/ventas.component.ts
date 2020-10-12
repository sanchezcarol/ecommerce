import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas:any
  user:[]
  producto:[]
 
  constructor(public admin: AdminService, public product: ProductService) { 
    this.obtenerVentas()
  }


  ngOnInit(): void {
  
  }


  obtenerVentas(){

    this.admin.ventas().subscribe(resp =>{
      this.ventas = resp
      console.log(resp);
    });

 
    // this.obtenerProducto()
   
  }

  obtenerProducto(){
    
    
    console.log(this.ventas);
    // this.product.obtenerProducto(this.ventas.idProduct).subscribe(resp=> {
    //   this.producto = resp 
    //   console.log(this.producto);
      
    // })

    // this.admin.obtenerusuario(this.ventas.idUserrAccount).subscribe(resp=> {
    //   this.user = resp
    //   console.log(this.user); 
    // })
  }

}
