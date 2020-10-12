import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  order_number
  order
  constructor() { }

  ngOnInit(): void {

    this.order = JSON.parse(localStorage.getItem("order"))
    this.order_number = this.order.length
    console.log(this.order_number);
    

  }

  Logout(){
    localStorage.clear()
    location.reload()
  }

}
