import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from './../../shared/services/services.service';
import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/interfaces/model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  id!: number;
  product!: ProductI;
  
  constructor(private productApi: ServicesService, private activatedRoute:ActivatedRoute, private router: Router){}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get("id"));
    })

    this.productApi.getProductsById(this.id).subscribe((data:any) => {
      this.product = data;
    })
  }

  editProduct(){
    this.productApi.setProduct(this.product, this.id);
    this.router.navigate(["edit"]);
  }

  deleteProduct(){
    this.productApi.deleteProduct(this.id).subscribe((data) => {
      this.router.navigate(["/products"])
    })
  }
}
