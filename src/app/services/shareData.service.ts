import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private favoritePokemonNames = new BehaviorSubject<string[]>(
    this.setFavoritePokemonNames()
  );
  currentFavoritePokemonNames = this.favoritePokemonNames.asObservable();

  private favoritePokemonsData = new BehaviorSubject<Pokemon[]>(
    this.getFavoritePokemons()
  );
  currentFavoritePokemonsData = this.favoritePokemonsData.asObservable();

  setPokemonData(pokemon: Pokemon) {
    this.pokemonData.next(pokemon);
  }

  getPokemonData() {
    return this.currentPokemonData;
  }

  setPokemonDataList(pokemonsNamesList: string[]) {
    this.getPokemonListService
      .getPokemonListService(pokemonsNamesList)
      .subscribe((data: any) => {
        this.pokemonDataList.next(data);
      });
  }

  setFavoritePokemon(name: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      let storageFavoritePokemonList = JSON.parse(
        localStorage.getItem('favoritePokemonList') || '[]'
      );

      if (storageFavoritePokemonList.includes(name)) {
        // Remove Pokémon from the list if already favorited
        storageFavoritePokemonList = storageFavoritePokemonList.filter(
          (pokemon: string) => pokemon !== name
        );
      } else {
        storageFavoritePokemonList.push(name);
      }

      // Update localStorage
      localStorage.setItem(
        'favoritePokemonList',
        JSON.stringify(storageFavoritePokemonList)
      );

      // Update BehaviorSubject to notify observers of changes
      this.favoritePokemonNames.next(storageFavoritePokemonList);
    } else {
      console.error('[setFavoritePokemon] localStorage is not available 1');
    }
  }

  setFavoritePokemonNames() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storageFavoritePokemonList = JSON.parse(
        localStorage.getItem('favoritePokemonList') || '[]'
      );

      return storageFavoritePokemonList;
    } else {
      console.error('localStorage is not available');
      return [];
    }
  }

  getFavoritePokemons(): Pokemon[] {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storageFavoritePokemonList = JSON.parse(
        localStorage.getItem('favoritePokemonList') || '[]'
      );

      let favoritePokemonsData: Pokemon[] = [];
      this.getPokemonListService
        .getPokemonListService(storageFavoritePokemonList)
        .subscribe((data: Pokemon[]) => {
          favoritePokemonsData = data;
        });

      return favoritePokemonsData;
    } else {
      console.error('[getFavoritePokemons] localStorage is not available');
      return [];
    }
  }
}
