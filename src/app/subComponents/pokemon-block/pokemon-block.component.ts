import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../types';
import { ShareDataService } from '../../services/shareData.service';
import { BattleDataService } from '../../services/battleDataService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokemonBlock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-block.component.html',
  styleUrl: './pokemon-block.component.css',
})
export class PokemonBlockComponent implements OnInit {
  constructor(
    private shareDataService: ShareDataService,
    private battleDataService: BattleDataService
  ) {}

  // Create an EventEmitter to notify the parent component
  @Output() openDialogEvent = new EventEmitter<Pokemon>();
  @Output() reCheckListEvent = new EventEmitter();
  @Input()
  pokemonData!: Pokemon;
  favoritedPokemon: boolean = false;

  openDialog() {
    this.openDialogEvent.emit(this.pokemonData);
  }

  reCheckList() {
    this.reCheckListEvent.emit();
  }

  battlePokemon: boolean = false;

  ngOnInit() {
    this.checkFavoritePokemon();
    this.checkBattlePokemon();
  }

  handleAddToFavorite() {
    this.shareDataService.setFavoritePokemon(this.pokemonData.name);
    this.checkFavoritePokemon();
  }

  checkFavoritePokemon() {
    this.shareDataService.currentFavoritePokemonNames.subscribe((data) => {
      this.favoritedPokemon =
        Array.isArray(data) && data.includes(this.pokemonData.name);
    });
  }

  // ToDo: fix deze functions
  handleBattlePokemon() {
    this.battleDataService.setBattleTeam(this.pokemonData.name);
    this.checkBattlePokemon();
  }

  checkBattlePokemon() {
    this.battleDataService.currentBattleTeam.subscribe((data) => {
      this.battlePokemon =
        Array.isArray(data) && data.includes(this.pokemonData.name);
    });
  }
}
