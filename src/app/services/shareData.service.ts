import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  private pokemonData = new BehaviorSubject<Pokemon | null>(null);
  currentPokemonData = this.pokemonData.asObservable();

  setPokemonData(pokemon: Pokemon) {
    this.pokemonData.next(pokemon);
  }

  getPokemonData() {
    return this.currentPokemonData;
  }

  setFavoritePokemon(name: string) {
    let favoritePokemonList = JSON.parse(
      localStorage.getItem('favoritePokemonList') || '[]'
    );

    if (favoritePokemonList.includes(name)) {
      // first get the index of the pokemon in the list
      const index = favoritePokemonList.indexOf(name);
      // remove the pokemon from the list
      favoritePokemonList.splice(index, 1);
      localStorage.setItem(
        'favoritePokemonList',
        JSON.stringify(favoritePokemonList)
      );
    } else {
      favoritePokemonList.push(name);
      // convert the array to a string
      localStorage.setItem(
        'favoritePokemonList',
        JSON.stringify(favoritePokemonList)
      );
    }
  }

  getFavoritePokemons() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('favoritePokemonList') || '[]');
    }

    return null;
  }

  constructor() {}
}
