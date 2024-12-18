import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { statesComponent } from '../../subComponents/states/states.component';
import { PokemonService } from '../../services/pokemon.service';
import { FormatDataService } from '../../services/formatData.service';
import { Pokemon } from '../../types';
import { BattleDataService } from '../../services/battleDataService';

@Component({
  selector: 'app-battle-page',
  standalone: true,
  imports: [CommonModule, statesComponent],
  templateUrl: './battle-page.component.html',
  styleUrl: './battle-page.component.css',
})
export class BattlePageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService,
    private battleDataService: BattleDataService
  ) {}
  teamState: string = 'empty';
  battleFields: string[] = [
    'desertField.png',
    'forestAutumnField.png',
    'forestField.jpg',
    'forestSandField.png',
    'grassField.png',
    'tundraField.png',
  ];
  selectedField: string = 'grassField';
  npcTeam: Pokemon[] = [];
  playerTeam: Pokemon[] = [];
  battleState: string = 'empty';
  battleStates: string[] = [
    'started',
    'playerTurn',
    'npcTurn',
    'end',
    'result',
    'draw',
    'error',
    'empty',
  ];

  ngOnInit(): void {
    this.getStoragedBattleTeam();

    console.log(this.teamState);

    // this.selectField();
  }
  getStoragedBattleTeam() {
    this.battleDataService.currentBattleTeam.subscribe((team) => {
      this.playerTeam = [];

      if (team.length < 3 && team.length > 0) {
        this.teamState = 'incomplete';
        this.getPokemonData(team);
      } else if (team.length === 3) {
        this.teamState = 'complete';
        this.getPokemonData(team);
        this.battleDataService.setNpcTeam();
        this.getNpcTeam();
      } else {
        this.teamState = 'empty';
        this.playerTeam = [];
      }
    });
  }

  getPokemonData(pokemons: string[]) {
    pokemons.forEach((pokemonName) => {
      this.pokemonService.getPokemonDetails(pokemonName).subscribe((data) => {
        const pokemon = this.formatDataService.formatPokemonData(data);
        this.playerTeam.push(pokemon);
        console.log(pokemon);
      });
    });
  }

  // get 3 random pokemons from the list
  getNpcTeam() {
    this.battleDataService.currentNpcTeam.subscribe((team) => {
      this.npcTeam = team;
    });
  }

  removePokemon(name: string) {
    console.log(name);
    this.battleDataService.removePokemonFromBattleTeam(name);
  }

  selectField() {
    // select random field from battleFields
    this.selectedField =
      this.battleFields[Math.floor(Math.random() * this.battleFields.length)];
  }

  startBattle() {
    this.battleState = 'started';
  }

  surrender() {
    this.battleState = 'empty';
  }
}
