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
    if (this.isLocalStorageAvailable()) {
      const storedMode = localStorage.getItem('darkMode');
      if (storedMode) {
        this.darkMode = JSON.parse(storedMode);
        if (this.darkMode) {
          document.body.classList.add('darkMode');
        } else {
          document.body.classList.remove('darkMode');
        }
      }
    }
  }

  handleMode(): void {
    if (this.isLocalStorageAvailable()) {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('darkMode');
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    }
  }

  private isLocalStorageAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }
}
