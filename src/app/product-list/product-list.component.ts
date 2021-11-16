import { Component, OnInit } from '@angular/core';
import {ProductService} from "../_services/product.service";
import {first} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.products = products)
  }
}
