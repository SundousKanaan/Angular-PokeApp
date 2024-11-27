import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../types';
import { ShareDataService } from '../../services/shareData.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokemonBlock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-block.component.html',
  styleUrl: './pokemon-block.component.css',
})
export class PokemonBlockComponent implements OnInit {
  constructor(private shareDataService: ShareDataService) {}

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
      this.favoritedPokemon = data.includes(this.pokemonData.name);
    });
  }

  handleBattlePokemon() {
    // get the favorite pokemons from the local storage
    const battlePokemonsArr: number[] = JSON.parse(
      localStorage.getItem('battlePokemons') || '[]'
    );
    const index = battlePokemonsArr.indexOf(this.pokemonData.id);
    if (index > -1) {
      // If the id is in the list, remove it
      battlePokemonsArr.splice(index, 1);
      this.battlePokemon = false;
    } else {
      // If the id is not in the list, add it
      battlePokemonsArr.push(this.pokemonData.id);
      this.battlePokemon = true;
    }
    // Save the updated list to local storage
    localStorage.setItem('battlePokemons', JSON.stringify(battlePokemonsArr));
  }

  checkBattlePokemon() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    // get the battle pokemons from the local storage
    const battlePokemonsArr: number[] = JSON.parse(
      localStorage.getItem('battlePokemons') || '[]'
    );
    // check if the pokemon is in the list
    this.battlePokemon = battlePokemonsArr.includes(this.pokemonData.id);
  }
}
