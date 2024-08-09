import { Component } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {

  price = 100;
  colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f', '#000'];
  sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];

  applyFilter() {
    // Logic to apply filter
  }
}
