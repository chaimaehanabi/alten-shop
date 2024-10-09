import { Component, OnInit, inject } from '@angular/core';
import { CartService } from 'app/products/data-access/cart.service';
import { Product } from 'app/products/data-access/product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    standalone: true,
})
export class CartComponent implements OnInit {
    private readonly cartService = inject(CartService);

    public cartItems: Product[] = [];

    ngOnInit() {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
        });
    }

    removeFromCart(productId: number) {
        this.cartService.removeFromCart(productId);
    }

    updateQuantity(product: Product, quantity: number) {
        if (quantity < 1) {
            this.removeFromCart(product.id);
        } else {
            const cartItem = this.cartItems.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        }
    }
}
