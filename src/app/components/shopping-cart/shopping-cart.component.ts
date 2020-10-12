import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/product/factura.model';
import { Order } from 'src/app/models/product/order.model';
import { User } from 'src/app/models/product/user.model';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  lentes = []
  order: Order[] = []
  user: User = new User()
  factura:Factura = new Factura()
  orden_
  id_order_food = JSON.parse(localStorage.getItem('id_order_food'));
  checkordervalue = 0;
  quantity
  ventas

  constructor(private productService: ProductService, private admin:AdminService) { }

  ngOnInit(): void {
    
    var user = JSON.parse(localStorage.getItem("login"))
    this.orden_ = JSON.parse(localStorage.getItem('order'));
    
    if( this.orden_) this.order = this.orden_
    
    if(this.orden_){
      this.quantity = this.order.length
      document.getElementById("order_number").innerHTML = this.quantity +'';
      
    }

    if (user) {

      if (!user.is_staff) {
        
        document.getElementById("menu_account_login").innerHTML = user.username;
        document.getElementById("menu_account_login").style.display = 'block';
        document.getElementById("menu_login_button").style.display = 'none';
        document.getElementById("menu_stock_button").style.display = 'none';
        document.getElementById("hello_user").innerHTML = "Hola " + user.username + " !";
        document.getElementById("menu_logout").style.display = 'block';
        document.getElementById("quanlydon").style.display = 'none';

      }

      if (user.is_staff) {
        document.getElementById("menu_account_login").innerHTML = user.username;
        document.getElementById("menu_account_login").style.display = 'block';
        document.getElementById("menu_login_button").style.display = 'none';
        document.getElementById("menu_stock_button").style.display = 'block';
        document.getElementById("hello_user").innerHTML = "Hola " + user.username + " !";
        document.getElementById("menu_logout").style.display = 'block';
        document.getElementById("quanlydon").style.display = 'none';
      }


    }


    if (this.id_order_food === null) {
      this.id_order_food = [];
      var id_order_food = 0;
      localStorage.setItem("id_order_food", JSON.stringify(id_order_food));
    }

    this.obtenerLentes()
  }

  obtenerLentes() {
    
    this.productService.obtener().subscribe(resp => {
      console.log(resp);
      this.lentes = resp
      // console.log(this.lentes[0]);

    })
    var user = JSON.parse(localStorage.getItem("login"))
    
    if(user){ 
      this.admin.ventas_user(user.id).subscribe(resp =>{
        this.ventas = resp
      })
    }
    
  }

  SignUp(f) {
    this.user.first_name = f.value.nombre;
    this.user.last_name = f.value.apellido
    this.user.password = f.value.password
    this.user.is_staff = false;
    this.user.username = f.value.usuario
    this.user.email = f.value.email
    this.productService.register(this.user).subscribe(resp => {
      console.log('resp ', resp);

    })
  }

  SignIn(f) {
    this.user.username = f.value.usuario;
    this.user.password = f.value.password

    this.productService.login(this.user).subscribe(resp => {
      console.log('resp ', resp);
      localStorage.setItem("login", JSON.stringify(resp));


      // document.getElementById("statusLogin").innerHTML = "Đăng nhập thành công";
      location.reload();
    })

  }


  Login() {


    var username = (<HTMLInputElement>document.getElementById('username')).value
    var password = (<HTMLInputElement>document.getElementById('password')).value

    this.user.username = username;
    this.user.password = password

    // this.productService.login(this.user).subscribe(resp =>{
    //   console.log(resp);

    // })


  }

  checkorder(product) {

    // localStorage.setItem("order", JSON.stringify(product));
    this.checkordervalue = 0

    if (this.order) {
      for (let i = 0; i < this.order.length; i++) {

        if (product.id == this.order[i].idproducto) {
          this.checkordervalue = 1;
          this.order[i].quantity++;
          if(this.order[i].quantity > product.stock) { 
            this.order[i].quantity--;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La cantidad seleccionada no debe exceder el stock del producto!',
            })
            break
          }
          localStorage.setItem("order", JSON.stringify(this.order));
          this.orderprinf();

        }

      }
    }

    if (this.checkordervalue == 0) {

      this.orderpush(product);
      this.orderprinf();

    }


  }

  orderpush(product) {

    var id = this.id_order_food;
    var nombre = product.nombre;
    var precio = product.precio;
    var modelo = product.modelo;
    var marca = product.marca;
    var cover = product.cover;
    var quantity = 1;
    var idproducto = product.id;
    var food_order = { id, nombre, modelo, marca, idproducto, precio, quantity, cover };

    this.order.push(food_order);

    this.quantity = this.order.length

    document.getElementById("order_number").innerHTML = this.quantity +'';

    localStorage.setItem("order", JSON.stringify(this.order));

    this.id_order_food++;

    localStorage.setItem("id_order_food", JSON.stringify(this.id_order_food));
    // demOrder();


    this.orderprinf();

  }

  upQuality(id_order) {
    var ok = 0;
    for (let i = 0; i < this.order.length; i++) {
      if (id_order == this.order[i].id) {
       

        var quality_input_change = (<HTMLInputElement>document.getElementById('quality_input_change' + i)).value;
        // this.order[i].quantity = quality_input_change;
        ok += this.order[i].precio * this.order[i].quantity;
        localStorage.setItem("order", JSON.stringify(this.order));
        this.orderprinf();
      }
    }
  }

  delete_order(id_order, value) {
    console.log('delete', id_order, value);
    this.order.splice(value,1);
    localStorage.setItem("order", JSON.stringify(this.order))
    document.getElementById("order_number").innerHTML = this.order.length +'';
    this.orderprinf()
  }

  orderprinf() {

    this.order = JSON.parse(localStorage.getItem('order'));
    this.totalMoney();


  }


  totalMoney() {
   var total_order = 0

    for (let i = 0; i < this.order.length; i++) {
      total_order += this.order[i].precio * this.order[i].quantity;
    }

    document.getElementById("total_money").innerHTML = total_order + "$";

  }

  payment(){
    
    var user = JSON.parse(localStorage.getItem("login"))
    this.factura.idUserrAccount = user.id
    
    var order = JSON.parse(localStorage.getItem("order"))

    if (order.length > 0) {
      for (let i = 0; i < order.length; i++) {

        this.factura.CantidadDeUnidades = order[i].quantity
        this.factura.idProduct = order[i].idproducto
        this.factura.precioTotal = order[i].precio * order[i].quantity
        this.productService.realizar_compra(this.factura).subscribe(
          resp => {
            
          }
        )
      }
    }

    Swal.fire({
      icon: 'success',
      title: 'Compra realizada !!',
      showConfirmButton: false,
      timer: 1500
    })

    
    localStorage.removeItem("order")
    location.reload()
    setTimeout('location.reload()',1000) 
  }

  cambiar(){

    var passnew = (<HTMLInputElement>document.getElementById("passnew")).value
    var passold = (<HTMLInputElement>document.getElementById("passold")).value
    var user = JSON.parse(localStorage.getItem("login"))
    console.log(user);
    
    console.log('passol' , passold, passnew);
    this.admin.cambiar(passold,passnew,user.id).subscribe(resp=>{
      console.log(resp);
      
    })


  }

  
  
}




