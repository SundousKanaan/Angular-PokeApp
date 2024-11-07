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
  @Input() pokemonData: Pokemon = {} as Pokemon;

  openDialog() {
    this.openDialogEvent.emit(this.pokemonData);
    this.shareDataService.setPokemonData(this.pokemonData);
  }

  favoritedPokemon: boolean = false;
  battlePokemon: boolean = false;

  // The @Input() decorator is used to pass data from the parent component to the child component
  // @Input() pokemonData: Pokemon = {
  //   name: '',
  //   id: 0,
  //   formattedPokemonId: '',
  //   abilities: [],
  //   types: [],
  //   mainType: '',
  //   sprites: {
  //     front_default: '',
  //     back_default: '',
  //     official_artwork: '',
  //     dream_world: '',
  //   },

  //   species_Url: '',

  //   weight: 0,
  //   height: 0,
  //   base: 0,
  //   stats: [
  //     {
  //       baseStat: 0,
  //       statName: '',
  //     },
  //   ],
  // };

  ngOnInit() {
    this.checkFavoritePokemon();
    this.checkBattlePokemon();
  }

  handleAddToFavorite() {
    this.shareDataService.setFavoritePokemon(this.pokemonData.name);
    this.checkFavoritePokemon();
  }

  checkFavoritePokemon() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    // get the favorite pokemons from the local storage
    const favoritePokemonArr = JSON.parse(
      localStorage.getItem('favoritePokemonList') || '[]'
    );
    // check if the pokemon is in the
    this.favoritedPokemon = favoritePokemonArr.includes(this.pokemonData.name);
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
