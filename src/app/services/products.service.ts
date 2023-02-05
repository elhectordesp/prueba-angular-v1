import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  public getProducts() {
    // Si fuera una llamada real a API recibiriamos el nº página, nº de elementos por pagina y otras variables o filtros
    return this.httpClient.get('../assets/products.json');
  }
}
