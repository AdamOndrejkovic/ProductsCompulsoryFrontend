import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../_services/product.service";
import {first} from "rxjs";
import {Admin} from "../../_models/admin";
import {AccountService} from "../../_services/account.service";
import {style} from "@angular/animations";

@Component({templateUrl: 'list.component.html',selector:"app-list-products", styleUrls: ['list.component.css']})
export class ListComponent implements OnInit {
  products: any;
  admin: Admin | null | undefined;



  logout() {
    this.accountService.logout();
  }


  constructor(private productService: ProductService,private accountService: AccountService) {
    this.accountService.adminSubject.subscribe(x => this.admin = x)
  }

  ngOnInit() {
    this.productService.getAll()
      .pipe(first())
      .subscribe(products => this.products = products)
  }

  deleteProduct(id: number){
    const product = this.products.find((x: { id: number; }) => x.id === id);
    product.isDeleting = true;
    this.productService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.products = this.products.filter((x: { id: number; }) => x.id !== id)
      })
  }
}
