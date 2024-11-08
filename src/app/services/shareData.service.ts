import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { BehaviorSubject } from 'rxjs';
import { GetPokemonListService } from './getPokemonList.service';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  constructor(private getPokemonListService: GetPokemonListService) {}

  private pokemonData = new BehaviorSubject<Pokemon | null>(null);
  currentPokemonData = this.pokemonData.asObservable();
  private pokemonDataList = new BehaviorSubject<Pokemon[] | null>(null);
  currentPokemonDataList = this.pokemonDataList.asObservable();

  setPokemonData(pokemon: Pokemon) {
    this.pokemonData.next(pokemon);
  }

  getPokemonData() {
    return this.currentPokemonData;
  }

  setPokemonList(pokemonsNamesList: string[]) {
    this.getPokemonListService
      .getPokemonListService(pokemonsNamesList)
      .subscribe((data: any) => {
        this.pokemonDataList.next(data);
      });
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
}
