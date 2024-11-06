import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import the PokemonService to make it available to the entire application
import { PokemonService } from './services/pokemon.service';
import { PopupService } from './services/popup.service';
import { GetPokemonListService } from './services/getPokemonList.service';
import { SharePokemonDataService } from './services/sharePokemonData.service';

// import the HttpClientModule module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';

// components
import { NavbarComponent } from './subComponents/navbar/navbar.component';
import { PokemonListComponent } from './subComponents/pokemon-list/pokemon-list.component';
import { PokemonsPageComponent } from './components/pokemons-page/pokemons-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { BattlePageComponent } from './components/battle-page/battle-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

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
    PokemonListComponent,
    PokemonsPageComponent,
    FavoritesPageComponent,
    BattlePageComponent,
    SearchPageComponent,
  ],
  // Inject the PokemonService into the providers array to make it available to the entire application
  providers: [
    PokemonService,
    PopupService,
    GetPokemonListService,
    SharePokemonDataService,
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
