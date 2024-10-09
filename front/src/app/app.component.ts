import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { CartService } from './products/data-access/cart.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    BadgeModule,
    DialogModule,
    CardModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartVisible: boolean = false;

  constructor(public cartService: CartService) { }

  getCartQuantity(): number {
    return this.cartService.getCartItems().length;
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }
}
