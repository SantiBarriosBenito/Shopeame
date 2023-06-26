import { ServicesService } from 'src/app/shared/services/services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductI } from 'src/app/interfaces/model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  implements OnInit{

  productForm! : FormGroup;
  product!: ProductI;
  submitted:boolean = false;


  constructor(private form: FormBuilder, private productApi: ServicesService, private router: Router){}
  ngOnInit(): void {
    this.productForm = this.form.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      image: ["", [Validators.required]]
    })
    this.productForm.valueChanges.subscribe((data) => {
      this.product = data;
    })
  }

  addProduct(){
    this.submitted= true;
    if(this.productForm.valid){
      this.productApi.postProduct(this.product).subscribe((data) => {
        this.productForm.reset();
        this.submitted = false;
        this.router.navigate(["/products"])
        
        
      })
    };
    
  }
}
