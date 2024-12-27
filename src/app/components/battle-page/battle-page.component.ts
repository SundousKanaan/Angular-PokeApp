import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatesComponent } from '../../subComponents/states/states.component';
import { PokemonService } from '../../services/pokemon.service';
import { FormatDataService } from '../../services/formatData.service';
import { Pokemon } from '../../types';
import { BattleDataService } from '../../services/battleDataService';
import { BattleComponent } from '../../subComponents/battle/battle.component';

@Component({
  selector: 'app-battle-page',
  standalone: true,
  imports: [CommonModule, StatesComponent, BattleComponent],
  templateUrl: './battle-page.component.html',
  styleUrl: './battle-page.component.css',
})
export class BattlePageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService,
    private battleDataService: BattleDataService,
    private renderer: Renderer2
  ) {}

  isAudioPlayed: boolean = true;
  teamState: string = 'empty';
  playerTeam: Pokemon[] = [];
  battleState: string = 'empty';
  battleStates: string[] = ['started', 'ended', 'empty', 'surrender'];

  ngOnInit(): void {
    this.getStoragedBattleTeam();

    console.log(this.teamState);

    if (this.battleState === 'ended') {
      this.battleState = 'empty';
      this.battleDataService.setNpcTeam();
    }
    this.playMusic(true);
  }

  playMusic(state?: boolean) {
    if (state === undefined) {
      this.isAudioPlayed = !this.isAudioPlayed;
    } else {
      this.isAudioPlayed = state;
    }
  }

  getStoragedBattleTeam() {
    this.battleDataService.currentBattleTeam.subscribe((team) => {
      this.playerTeam = [];

      if (!team) {
        this.teamState = 'empty';
        return;
      }

      if (team.length < 3 && team.length > 0) {
        this.teamState = 'incomplete';
        this.getPokemonData(team);
      } else if (team.length === 3) {
        this.teamState = 'complete';
        this.getPokemonData(team);
      } else {
        this.teamState = 'empty';
        this.playerTeam = [];
      }
    });
  }

  getPokemonData(pokemons: string[]) {
    pokemons.forEach((pokemonName) => {
      let pokemonData = {};
      this.pokemonService.getPokemonDetails(pokemonName).subscribe((data) => {
        this.pokemonService
          .getPokemonDamageRelations(data.types[0].type.url)
          .subscribe((res) => {
            const damageRelations = res.damage_relations;
            pokemonData = { ...data, damageRelations };

            const pokemon =
              this.formatDataService.formatPokemonData(pokemonData);

            this.playerTeam.push(pokemon);
          });
      });
    });
  }

  removePokemon(name: string) {
    this.battleDataService.removePokemonFromBattleTeam(name);
  }

  startBattle() {
    this.playMusic(false);

    if (this.battleState === 'surrender') {
      this.battleState = 'started';
    } else {
      this.battleDataService.setNpcTeam();
      this.battleState = 'started';
    }
  }

  surrender() {
    this.battleState = 'surrender';
  }
}
