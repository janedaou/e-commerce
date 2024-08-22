import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchResults: any[] = [];
  searchQuery: string = '';
  showUserDropdown: boolean = false; // Track the visibility of the user dropdown
  isHeaderTopHidden: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkHeaderTopState();

    const closeBtn = document.getElementById('close-btn');
    const headerTop = document.getElementById('header-top');

    if (closeBtn && headerTop) {
      closeBtn.addEventListener('click', () => {
        headerTop.classList.add('hidden');
        localStorage.setItem('headerTopHidden', 'true');
        this.isHeaderTopHidden = true;
      });
    }
  }

  checkHeaderTopState() {
    // Check if the user is logged in
    if (this.isLoggedIn()) {
      this.isHeaderTopHidden = true;
    } else {
      // Check local storage to see if the header top should be hidden
      const headerTopHidden = localStorage.getItem('headerTopHidden');
      this.isHeaderTopHidden = headerTopHidden === 'true';
    }
  }

  closeHeaderTop(): void {
    this.isHeaderTopHidden = true;
    localStorage.setItem('headerTopHidden', 'true');
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
    this.clearSearch();
    this.router.navigate(['/product-detail', productId]);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/account']);
    this.showUserDropdown = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  goToCart(event: Event) {
    event.preventDefault();
    if (this.isLoggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/account']);
    }
  }

  onUserIconClick() {
    if (this.isLoggedIn()) {
      this.showUserDropdown = !this.showUserDropdown; // Toggle dropdown visibility
    } else {
      this.router.navigate(['/account']);
    }
  }

  goToProfile() {
    this.showUserDropdown = false; // Close the dropdown
    this.router.navigate(['/profile']);
  }

  goToLogin() {
    this.showUserDropdown = false; // Close the dropdown
    this.router.navigate(['/account']);
  }
}
