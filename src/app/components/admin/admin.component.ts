import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
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

    Swal.fire({
      title: 'Eliminar',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.productService.eliminarProducto(id).subscribe(
          resp=>{
            Swal.fire(
            'Usuario eliminado exitosamente!'
            )
            setTimeout('location.reload()',1000);
          }
        ) 
      }
    })
  }

}
