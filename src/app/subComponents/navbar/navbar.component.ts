import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  darkMode = false;

  ngOnInit(): void {
    const mode = localStorage.getItem('darkMode');

    if (mode) {
      this.darkMode = JSON.parse(mode);

      if (mode === 'true') {
        document.body.classList.add('darkMode');
      } else {
        document.body.classList.remove('darkMode');
      }
    }
  }

  handleMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('darkMode');
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}
