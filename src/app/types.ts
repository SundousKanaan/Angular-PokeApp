// Define the properties types and what should be returned

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
  damageRelations: DamageRelations;
  maxHp: number;
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

export type DamageRelations = {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
};
