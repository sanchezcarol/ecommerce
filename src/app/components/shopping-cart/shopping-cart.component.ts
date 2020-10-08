import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/product/factura.model';
import { Order } from 'src/app/models/product/order.model';
import { User } from 'src/app/models/product/user.model';
import { ProductService } from 'src/app/services/product.service';

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
  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    var user = JSON.parse(localStorage.getItem("login"))
    if (user) {

      if (!user.is_staff) {

        document.getElementById("menu_account_login").innerHTML = user.username;
        document.getElementById("menu_account_login").style.display = 'block';
        document.getElementById("menu_login_button").style.display = 'none';
        document.getElementById("menu_stock_button").style.display = 'none';
        document.getElementById("hello_user").innerHTML = "Hola " + user.nombre + " !";
        document.getElementById("menu_logout").style.display = 'block';
        document.getElementById("quanlydon").style.display = 'none';

      }

      if (user.is_staff) {
        document.getElementById("menu_account_login").innerHTML = user.username;
        document.getElementById("menu_account_login").style.display = 'block';
        document.getElementById("menu_login_button").style.display = 'none';
        document.getElementById("menu_stock_button").style.display = 'block';
        document.getElementById("hello_user").innerHTML = "Hola " + user.nombre + " !";
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

    // localStorage.setItem("carrito", JSON.stringify(orderFood));
    this.checkordervalue = 0

    if (this.order.length > 0) {
      for (let i = 0; i < this.order.length; i++) {

        if (product.id == this.order[i].idproducto) {
          this.checkordervalue = 1;
          this.order[i].quantity++;

          this.order[i].quantity;
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
    var paymentFood = JSON.parse(localStorage.getItem('paymentFood'));

    var id = this.id_order_food;
    var nombre = product.nombre;
    var precio = product.precio;
    var modelo = product.modelo;
    var marca = product.marca;
    // var image_order = product.image;
    var quantity = 1;
    // var user_id_order = checkLogin; //user id del usuario
    var idproducto = product.id;
    var food_order = { id, nombre, modelo, marca, idproducto, precio, quantity };

    this.order.push(food_order);

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

  delete_order(id_order) {
    console.log('delete', id_order);

    // for (var i = 0; i < orderFood.length; i++) {
    //   if (id_order == orderFood[i].id_order && checkLogin == orderFood[i].user_id_order) {
    //     orderFood.splice(i, 1);
    //     localStorage.setItem("orderFood", JSON.stringify(orderFood));
    //     orderprinf();
    //     demOrder();
    //     break;
    //   }
    // }
  }


  orderprinf() {

    document.getElementById("prinf_order_cart").innerHTML = '';

    this.orden_ = JSON.parse(localStorage.getItem('order'));
    this.totalMoney();

    for (let i = 0; i < this.orden_.length; i++) {

      var prinf_order_cart = `<tr>  
      <td><div>
        <div class="cart_img_box float-left">
            
        </div>
        <div class="cart_info_box float-left pl-3">
            <p class="mb-1 font-weight-bold" style="font-size: 115%;">`+ this.orden_[i].nombre + `</p>
        </div>
      </div> </td>
      <td class="text-center"><input id="quality_input_change`+ i + `" onChange ="upQuality(` + this.orden_[i].id + `)" class="cart_input_quanlity mt-2" type="number" value="` + this.orden_[i].quantity + `" name="" min="1" max="20" style=""> </td>
      <td class="text-center"><p class="mt-2" style="padding:5px;">`+ this.orden_[i].precio * this.orden_[i].quantity + `$</p></td>
      <td class="text-center"><div class="cart_button_delete" id="delete"><i class="fa fa-trash" aria-hidden="true" style="color: #fb9200;font-size: 180%"></i></div> </td>
    </tr>`
      document.getElementById("prinf_order_cart").innerHTML += prinf_order_cart;
      // document.getElementById ("delete").addEventListener ("click", function(){this.delete_order((<HTMLInputElement>this.orden_[i].id)}, false )
      // click="delete_order(`+ this.orden_[i].id + `)"

    }

  }


  totalMoney() {
    var total_order = 0;
    for (let i = 0; i < this.order.length; i++) {

      total_order += this.order[i].precio * this.order[i].quantity;

    }
    document.getElementById("total_money").innerHTML = total_order + "$";

  }

  payment(){
    
    var user = JSON.parse(localStorage.getItem("login"))
    this.factura.idUserrAccount = user.id
    console.log(user.id);
    
    var order = JSON.parse(localStorage.getItem("order"))

    if (order.length > 0) {
      for (let i = 0; i < order.length; i++) {

        this.factura.CantidadDeUnidades = order[i].quantity
        this.factura.idProduct = order[i].idproducto
        
        this.productService.realizar_compra(this.factura).subscribe(
          resp => {
            console.log(resp);
            
          }
        )

      }
    }
  }
}




