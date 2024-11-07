import { Component, NgModule, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import the PokemonService to make it available to the entire application
import { PokemonService } from './services/pokemon.service';
import { PopupService } from './services/popup.service';
import { GetPokemonListService } from './services/getPokemonList.service';
import { ShareDataService } from './services/shareData.service';

// import the HttpClientModule module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';

// components
import { NavbarComponent } from './subComponents/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FormsModule,
    // import the HttpClientModule module to make HTTP requests
    HttpClientModule,
    // components imports
    NavbarComponent,
  ],
  // Inject the PokemonService into the providers array to make it available to the entire application
  providers: [
    PokemonService,
    PopupService,
    GetPokemonListService,
    ShareDataService,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // constructor(private router: Router) {}
  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;

  openNavbar() {
    if (this.navbarComponent) {
      this.navbarComponent.openDialog();
    }
  }

  handleCloseNavbar() {
    if (this.navbarComponent) {
      this.navbarComponent.closeNavbar();
    }
  }

  setDarkMode() {
    document.body.classList.toggle('darkMode');
  }
}
