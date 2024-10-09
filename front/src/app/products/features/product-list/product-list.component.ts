import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { CartService } from "app/products/data-access/cart.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [CommonModule, DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, BadgeModule, PaginatorModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  public readonly cartService = inject(CartService);

  public readonly products = this.productsService.products;

  public paginatedProducts: Product[] = [];
  public rows: number = 5;
  public currentPage: number = 0;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  public cartVisible = false;

  ngOnInit() {
    this.productsService.get().subscribe(() => {
      this.paginate({ first: 0, rows: this.rows });
    });
  }

  public removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  public getCartQuantity() {
    return this.cartService.getCartQuantity();
  }

  public paginate(event: { first?: number; rows?: number }) {
    const first = event.first || 0;
    const rows = event.rows || this.rows;
    this.currentPage = Math.floor(first / rows);
    this.rows = rows;

    const start = this.currentPage * this.rows;
    const end = start + this.rows;

    if (this.products && this.products().length > 0) {
      this.paginatedProducts = this.products().slice(start, end);
    } else {
      this.paginatedProducts = [];
    }
  }


  public onPageChange(event: { first?: number; rows?: number }) {
    this.paginate(event);
  }

  public toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.productsService.get().subscribe(() => {
        this.paginate({ first: 0, rows: this.rows });
      });
    });
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe(() => {
        this.productsService.get().subscribe(() => {
          this.paginate({ first: 0, rows: this.rows });
        });
      });
    } else {
      this.productsService.update(product).subscribe(() => {
        this.productsService.get().subscribe(() => {
          this.paginate({ first: 0, rows: this.rows });
        });
      });
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  updateQuantity(product: any, newQuantity: number) {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    product.quantity = newQuantity;
  }

  addToCart(product: any) {
    const quantityToAdd = product.quantity || 1;
    this.cartService.addToCart({ ...product, quantity: quantityToAdd });
  }
}
