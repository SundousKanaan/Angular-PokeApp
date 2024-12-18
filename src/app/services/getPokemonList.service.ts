import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { PokemonService } from './pokemon.service';
import { FormatDataService } from './formatData.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonListService {
  //  the servic should use the pokemonService to fetch the first 10 Pokémon from the API endpoint. then format the data according to the Pokemon type from types.ts

  constructor(
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService
  ) {}

  getPokemonListService(pokemonNames: string[]): Observable<Pokemon[]> {
    return new Observable((observer) => {
      const pokemonList: Pokemon[] = [];

      if (pokemonNames.length > 0) {
        pokemonNames.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon).subscribe((data) => {
            const formattedPokemon =
              this.formatDataService.formatPokemonData(data);
            pokemonList.push(formattedPokemon);

            if (pokemonList.length === pokemonNames.length) {
              observer.next(pokemonList);
              observer.complete();
            }
          });
        });
      }
    });
  }
}
