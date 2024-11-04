import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../types';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

@Component({
  selector: 'pokemonBlock',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-block.component.html',
  styleUrl: './pokemon-block.component.css',
})
export class PokemonBlockComponent implements OnInit {
  constructor(private formatPokemonIdService: FormatPokemonIdService) {}
  // Create an EventEmitter to notify the parent component
  @Output() openDialogEvent = new EventEmitter<Pokemon>();

  openDialog() {
    this.openDialogEvent.emit(this.pokemonData);
    console.log(this.pokemonData);

    document.body.style.overflow = 'hidden';
  }

  favoritedPokemon: boolean = false;
  battlePokemon: boolean = false;

  // The @Input() decorator is used to pass data from the parent component to the child component
  @Input() pokemonData: Pokemon = {
    name: '',
    id: 0,
    formattedPokemonId: '',
    abilities: [],
    types: [],
    sprites: {
      front_default: '',
      back_default: '',
      official_artwork: '',
      dream_world: '',
    },

    species_Url: '',

    weight: 0,
    height: 0,
    base: 0,
    stats: [
      {
        baseStat: 0,
        statName: '',
      },
    ],
  };

  ngOnInit(): void {
    this.checkFavoritePokemon();
    this.checkBattlePokemon();
  }

  handleAddToFavorite() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    // get the favorite pokemons from the local storage
    const favoritePokemonsArr: number[] = JSON.parse(
      localStorage.getItem('favoritePokemons') || '[]'
    );
    const index = favoritePokemonsArr.indexOf(this.pokemonData.id);
    if (index > -1) {
      // If the id is in the list, remove it
      favoritePokemonsArr.splice(index, 1);
      this.favoritedPokemon = false;
    } else {
      // If the id is not in the list, add it
      favoritePokemonsArr.push(this.pokemonData.id);
      this.favoritedPokemon = true;
    }
    // Save the updated list to local storage
    localStorage.setItem(
      'favoritePokemons',
      JSON.stringify(favoritePokemonsArr)
    );
  }

  checkFavoritePokemon() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    // get the favorite pokemons from the local storage
    const favoritePokemonArr = JSON.parse(
      localStorage.getItem('favoritePokemons') || '[]'
    );
    // check if the pokemon is in the
    this.favoritedPokemon = favoritePokemonArr.includes(this.pokemonData.id);
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
