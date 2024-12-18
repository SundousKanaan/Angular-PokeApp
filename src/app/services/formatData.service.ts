// this service is used to format the pokemon id to a 3 digit number

import { Injectable } from '@angular/core';
import { Pokemon } from '../types';
@Injectable({
  providedIn: 'root',
})
export class FormatDataService {
  formatPokemonId(id: number): string {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return `${id}`;
    }
  }

  formatPokemonData(data: any) {
    const formattedPokemon: Pokemon = {
      name: data.name,
      id: data.id,
      formattedPokemonId: this.formatPokemonId(data.id),
      abilities: data.abilities,
      types: data.types.map((type: any) => type.type.name),
      mainType: data.types[0].type.name,
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
        official_artwork: data.sprites.other['official-artwork'].front_default,
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
    return formattedPokemon;
  }
}
