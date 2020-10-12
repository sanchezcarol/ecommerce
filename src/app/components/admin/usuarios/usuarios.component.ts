import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios

  constructor(private admin:AdminService) { }

  ngOnInit(): void {

    this.admin.usuarios().subscribe( resp =>{
      this.usuarios = resp
      console.log(resp);
      
    })

  }


  eliminar(id){

    Swal.fire({
      title: 'Eliminar usuario',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.admin.eliminar_usuario(id).subscribe(
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
