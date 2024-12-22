import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

// import the PokemonService to make it available to the entire application
import { PokemonService } from './services/pokemon.service';
import { PopupService } from './services/popup.service';
import { GetPokemonListService } from './services/getPokemonList.service';
import { ShareDataService } from './services/shareData.service';
import { BattleDataService } from './services/battleDataService';

// import the HttpClientModule module to make HTTP requests
import { HttpClientModule } from '@angular/common/http';

// components
import { NavbarComponent } from './subComponents/navbar/navbar.component';
import { BattleTeamPopupComponent } from './subComponents/battle-team-popup/battle-team-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatDialogModule,
    CommonModule,
    // import the HttpClientModule module to make HTTP requests
    HttpClientModule,
    // components imports
    NavbarComponent,
    BattleTeamPopupComponent,
  ],
  // Inject the PokemonService into the providers array to make it available to the entire application
  providers: [
    PokemonService,
    PopupService,
    GetPokemonListService,
    ShareDataService,
    BattleDataService,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isBattlePage: boolean = false;

  constructor(private router: Router) {
    this.checkBattlePage();
  }

  checkBattlePage() {
    // Check if the current route is the battle page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isBattlePage = event.url === '/battle';
      }
    });
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
