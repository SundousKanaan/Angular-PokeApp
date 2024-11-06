import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
import { PokemonService } from './pokemon.service';
import { FormatPokemonIdService } from './formatPokemonId.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonListService {
  //  the servic should use the pokemonService to fetch the first 10 Pokémon from the API endpoint. then format the data according to the Pokemon type from types.ts

  constructor(
    private pokemonService: PokemonService,
    private formatPokemonIdService: FormatPokemonIdService
  ) {}

  getPokemonListService(pokemonNames: string[]): Observable<Pokemon[]> {
    return new Observable((observer) => {
      const pokemonList: Pokemon[] = [];

      if (pokemonNames.length > 0) {
        pokemonNames.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon).subscribe((data) => {
            const formattedPokemon: Pokemon = {
              name: data.name,
              id: data.id,
              formattedPokemonId: this.formatPokemonIdService.formatPokemonId(
                data.id
              ),
              abilities: data.abilities,
              types: data.types.map((type: any) => type.type.name),
              sprites: {
                front_default: data.sprites.front_default,
                back_default: data.sprites.back_default,
                front_shiny: data.sprites.front_shiny,
                back_shiny: data.sprites.back_shiny,
                front_f: data.sprites.front_female,
                back_f: data.sprites.back_female,
                front_shiny_f: data.sprites.front_shiny_female,
                back_shiny_f: data.sprites.back_shiny_female,
                dream_world: data.sprites.other.dream_world.front_default,
                official_artwork:
                  data.sprites.other['official-artwork'].front_default,
                showdown: {
                  front_default: data.sprites.other.showdown.front_default,
                  back_default: data.sprites.other.showdown.back_default,
                },
              },
              species_Url: data.species.url,
              weight: data.weight / 100,
              height: data.height / 10,
              base: data.base_experience,
              stats: data.stats.map((stat: any) => {
                return {
                  baseStat: stat.base_stat,
                  statName: stat.stat.name,
                };
              }),
            };

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
