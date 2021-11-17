import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../_models/product";

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  create(product: Product){
    return this.http.post(`${environment.apiUrl}/product`, product);
  }

  getAll() {
    return this.http.get<Product>(`${environment.apiUrl}/product`);
  }

  update(product: Product){
    return this.http.put(`${environment.apiUrl}/product`, product);
  }

  delete(id: number){
    return this.http.delete(`${environment.apiUrl}/product/${id}`);
  }


  getById(id: number) {
    return this.http.get<Product>(`${environment.apiUrl}/product/${id}`);
  }
}
