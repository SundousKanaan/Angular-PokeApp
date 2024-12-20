import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  RouterLinkActive,
  NavigationEnd,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BattleDataService } from '../../services/battleDataService';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private battleDataService: BattleDataService
  ) {
    this.checkBattlePage();
  }

  darkMode = false;
  isListOpen = false;
  isBattlePage = false;
  battelTeamMembers = 0;

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

    this.battleDataService.currentIsBattleListOpen.subscribe((data) => {
      this.isListOpen = data;
    });

    this.trackTeamMembers();
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

  handleOpenList(): void {
    this.battleDataService.handleOpenBattleList(!this.isListOpen);
  }

  // track the number of battle pokemons
  trackTeamMembers() {
    this.battleDataService.currentBattleTeam.subscribe((team) => {
      if (!team) {
        this.battelTeamMembers = 0;
        return;
      }
      this.battelTeamMembers = team.length;
    });
  }

  checkBattlePage() {
    // Check if the current route is the battle page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/battle') {
          this.battleDataService.handleOpenBattleList(false);
          this.isBattlePage = true;
        } else {
          this.isBattlePage = false;
        }
      }
    });
  }
}
