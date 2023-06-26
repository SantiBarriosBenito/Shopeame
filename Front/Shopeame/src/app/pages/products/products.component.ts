import { Component } from '@angular/core';
import { ProductI } from 'src/app/interfaces/model';
import { ServicesService } from 'src/app/shared/services/services.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

productList!: ProductI[];

constructor(private productApi: ServicesService){}

ngOnInit(): void {
  this.productApi.getProducts().subscribe((data:any) => {
    this.productList = data;
  })
}



}
