import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharePokemonDataService {
  private pokemonData = new BehaviorSubject<Pokemon | null>(null);
  currentPokemonData = this.pokemonData.asObservable();

  setPokemonData(pokemon: Pokemon) {
    this.pokemonData.next(pokemon);
  }

  constructor() {}
}
