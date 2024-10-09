import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingProductIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      currentItems[existingProductIndex].quantity += product.quantity;
    } else {
      currentItems.push({ ...product, quantity: product.quantity });
    }

    this.cartItemsSubject.next(currentItems);
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.value;
  }

  getCartQuantity(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  updateCartItemQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const productIndex = currentItems.findIndex(item => item.id === productId);

    if (productIndex > -1) {
      currentItems[productIndex].quantity = quantity;
      this.cartItemsSubject.next(currentItems);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingProductIndex = currentItems.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
      if (currentItems[existingProductIndex].quantity > 1) {
        currentItems[existingProductIndex].quantity -= 1;
      } else {
        currentItems.splice(existingProductIndex, 1);
      }
      this.cartItemsSubject.next(currentItems);
    }
  }
}
