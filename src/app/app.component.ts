import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import the PokemonService to make it available to the entire application
import { PokemonService } from './services/pokemon.service';
// import the HttpClientModule module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';

// components
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

  // Inject the PokemonService into the providers array to make it available to the entire application
  providers: [PokemonService],
})
export class AppComponent {
  constructor(private router: Router) {}

  setDarkMode() {
    document.body.classList.toggle('darkMode');
  }
}
