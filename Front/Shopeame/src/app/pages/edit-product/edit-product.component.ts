import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/interfaces/model';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  id!:number;
  product!:ProductI;
  submitted: boolean = false;
  productForm!: FormGroup;

  constructor(private productApi:ServicesService, private form:FormBuilder, private router:Router){
    this.product = this.productApi.getMyProduct();
    this.id = this.productApi.getMyId();
  }

  ngOnInit(): void {
    this.productForm = this.form.group({
      name: [this.product.name, [Validators.required]],
      price: [this.product.price, [Validators.required]],
      description: [this.product.description, [Validators.required]],
      image: [this.product.image, [Validators.required]]
    })
    this.productForm.valueChanges.subscribe((data) => {
      this.product = data;
    })
  }

  editProduct(){
    this.submitted= true;
    if(this.productForm.valid){
      this.productApi.putProduct(this.product, this.id).subscribe((data) => {
        this.productForm.reset();
        this.submitted = false;
        this.router.navigate(["/products"]);
      })
    };
  }
}
