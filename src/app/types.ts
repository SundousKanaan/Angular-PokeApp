// Define the properties types and what should be returned

// <img [src]="pokemon.sprites?.front_default" alt="pokemon" />
// <img [src]="pokemon.sprites?.back_default" alt="pokemon" />
// <img [src]="pokemon.sprites?.front_shiny" alt="pokemon" />
// <img [src]="pokemon.sprites?.back_shiny" alt="pokemon" />
// <img [src]="pokemon.sprites?.front_f" alt="pokemon" />
// <img [src]="pokemon.sprites?.back_f" alt="pokemon" />
// <img [src]="pokemon.sprites?.front_shiny_f" alt="pokemon" />
// <img [src]="pokemon.sprites?.back_shiny_f" alt="pokemon" />
// <img [src]="pokemon.sprites?.dream_world" alt="pokemon" />
// <img [src]="pokemon.sprites?.showdown?.front_default" alt="pokemon" />
// <img [src]="pokemon.sprites?.showdown?.back_default" alt="pokemon" />

export interface Pokemon {
  name: string;
  id: number;
  formattedPokemonId: string;
  types: string[];
  mainType: string;
  sprites: PokemonSprites;
  species_Url: string;
  abilities: PokemonAbility[];
  weight: number;
  height: number;
  base: number;
  stats: PokemonState[];
  evolutions?: PokemonEvolution[];
}

export type PokemonSprites = {
  front_default: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
  front_f?: string;
  back_f?: string;
  front_shiny_f?: string;
  back_shiny_f?: string;
  dream_world?: string;
  official_artwork?: string;
  showdown?: {
    front_default?: string;
    back_default?: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
  slot: number;
  isHidden: boolean;
};

export type PokemonState = {
  baseStat: number;
  statName: string;
};

export type PokemonEvolution = [
  {
    name: string;
    url: string;
  },
  {
    name: string;
    url: string;
  },
  {
    name: string;
    url: string;
  }
];
