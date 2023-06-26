import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductI } from 'src/app/interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private id!:number;
  private product!:ProductI;
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }

  getProductsById(id:number){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  postProduct(product:ProductI){
    return this.http.post(`http://localhost:3000/products`, product);
  }

  putProduct(product:ProductI, id:number){
    return this.http.put(`http://localhost:3000/products/${id}`, product);
  }

  setProduct(product:ProductI, id:number){
    this.product = product;
    this.id = id;
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getMyProduct(){
    return this.product;
  }

  getMyId(){
    return this.id;
  }
}
