import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Corrected to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    const closeBtn = document.getElementById('close-btn');
    const headerTop = document.getElementById('header-top');

    if (closeBtn && headerTop) {
      closeBtn.addEventListener('click', () => {
        headerTop.classList.add('hidden');
      });
    }
  }

  onSearch(event: any) {
    const query = event.target.value.trim().toLowerCase();
    this.searchQuery = query;

    if (query.length > 0) {
      this.productService.searchProducts(query).subscribe((products: any[]) => {
        this.searchResults = products;
      });
    } else {
      this.searchResults = [];
    }
  }

  viewProductDetail(productId: number) {
    this.clearSearch(); // Clear the search box when a product is selected
    this.router.navigate(['/product-detail', productId]);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
  }

  // Add the logout method
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Check if the user is logged in
  }

  goToCart(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    if (this.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/account']);
    }
  }
}
