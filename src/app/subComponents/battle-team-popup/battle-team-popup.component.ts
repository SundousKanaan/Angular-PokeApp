import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../types';
import { BattleDataService } from '../../services/battleDataService';

@Component({
  selector: 'battleTeamPopup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-team-popup.component.html',
  styleUrl: './battle-team-popup.component.css',
})
export class BattleTeamPopupComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private battleDataService: BattleDataService
  ) {}
  battleTeam: Pokemon[] = [];
  showTeam: boolean = false;

  ngOnInit(): void {
    this.getBattleTeam();

    this.battleDataService.currentIsBattleListOpen.subscribe((data) => {
      this.showTeam = data;
    });
  }

  getBattleTeam() {
    this.battleDataService.currentBattleTeam.subscribe((data) => {
      this.battleTeam = [];
      if (!data || data.length === 0) {
        return;
      }

      data.forEach((pokemonName: string) => {
        this.pokemonService
          .getPokemonDetails(pokemonName)
          .subscribe((pokemonData) => {
            this.battleTeam = [...this.battleTeam, pokemonData];
          });
      });
    });
  }

  removePokemonFromBattleTeam(name: string) {
    this.battleDataService.removePokemonFromBattleTeam(name);
  }
}
