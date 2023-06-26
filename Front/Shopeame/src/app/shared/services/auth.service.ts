import { UserI } from './../../interfaces/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user:UserI){
    return this.http.post("http://localhost:3000/register", user)
  }

  login(user:UserI){
    return this.http.post("http://localhost:3000/login", user)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRole(){
    let user = JSON.parse(String(localStorage.getItem('user')));

    return user?.role;
  }
}
