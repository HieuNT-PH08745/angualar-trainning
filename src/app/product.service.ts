import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './Product';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption} from './request-util';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api = 'http://localhost:8080/api/product';
  products: Product[] = [];
  product: Product;

  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + '/all');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  addProduct(product) {
    return this.http.post<Product>(`${this.api}`, product);
  }

  removeProduct(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateProduct(product) {
    return this.http.put<Product>(`${this.api}/${product.id}`, product);
  }

  searchProduct(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<Product[]>(this.api + '/all', {params: options});
  }
}
