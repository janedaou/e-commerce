import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    const closeBtn = document.getElementById('close-btn');
    const headerTop = document.getElementById('header-top');

    if (closeBtn && headerTop) {
      closeBtn.addEventListener('click', () => {
        headerTop.classList.add('hidden');
      });
    }
  }
}
