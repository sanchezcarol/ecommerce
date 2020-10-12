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
  cover: File;
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

  onImageChanged(event: any) {
    this.cover = event.target.files[0];
  }

  actualizar(f){

    const uploadData = new FormData();
    if(this.cover) uploadData.append('cover', this.cover, this.cover.name);
    console.log(f.value);
    
    uploadData.append('nombre', f.value.nombre );
    uploadData.append('modelo', f.value.modelo );
    uploadData.append('precio', f.value.precio );
    uploadData.append('marca', f.value.marca );
    uploadData.append('descripcion', f.value.descripcion );
    uploadData.append('stock', f.value.stock);

    this.productService.actualizarProducto(uploadData,f.value.id).subscribe(resp=>{
      console.log('resp ',resp);
      
    })

  }
}
