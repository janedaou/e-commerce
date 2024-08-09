import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private router: Router) {}

  navigateTo(page: string): void {
    if (page === 'login') {
      this.router.navigate(['/login']);
    } else if (page === 'signup') {
      this.router.navigate(['/signup']);
    }
  }
}
