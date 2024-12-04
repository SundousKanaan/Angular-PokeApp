import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

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
    FormsModule,
    MatDialogModule,
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
export class AppComponent {}
