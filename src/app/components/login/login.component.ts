import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;
  cover: File;
  imagen
  constructor(private http: HttpClient) {}

  onTitleChanged(event: any) {
    this.title = event.target.value;
  }

  onImageChanged(event: any) {
    this.cover = event.target.files[0];
  }

  newBook() {
    const uploadData = new FormData();
    uploadData.append('title', this.title);
    uploadData.append('cover', this.cover, this.cover.name);
    this.http.post('http://127.0.0.1:8000/API/books/', uploadData).subscribe(
      (data:any) => {console.log(data), this.imagen = data.cover },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
  }

}
