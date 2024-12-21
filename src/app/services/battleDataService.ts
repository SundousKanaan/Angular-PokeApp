import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { FormatDataService } from './formatData.service';
import { Pokemon } from '../types';

@Injectable({
  providedIn: 'root',
})
export class BattleDataService {
  constructor(
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService
  ) {}

  private battleTeam = new BehaviorSubject<string[]>(
    this.getStoragedBattleTeam()
  );
  currentBattleTeam = this.battleTeam.asObservable();

  private isBattleListOpen = new BehaviorSubject<boolean>(false);
  currentIsBattleListOpen = this.isBattleListOpen.asObservable();

  private npcTeam = new BehaviorSubject<Pokemon[]>([]);
  currentNpcTeam = this.npcTeam.asObservable();

  getStoragedBattleTeam() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const storageBattleTeamList = JSON.parse(
        localStorage.getItem('battlePokemons') || '[]'
      );
      return storageBattleTeamList;
    }
  }

  setBattleTeam(pokemonsName: string) {
    this.battleTeam.next([]);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      let storageBattleTeamList = JSON.parse(
        localStorage.getItem('battlePokemons') || '[]'
      );
      const index = storageBattleTeamList.indexOf(pokemonsName);
      if (index > -1) {
        // If the name is in the list, remove it
        storageBattleTeamList.splice(index, 1);
      } else {
        // If the name is not in the list, add it
        if (storageBattleTeamList.length < 3) {
          storageBattleTeamList.push(pokemonsName);
        } else {
          alert('You can only have a maximum of 3 battle Pokemons.');
        }
      }
      // Save the updated list to local storage
      localStorage.setItem(
        'battlePokemons',
        JSON.stringify(storageBattleTeamList)
      );

      this.battleTeam.next(storageBattleTeamList);
    }
  }

  removePokemonFromBattleTeam(name: string) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedBattleTeam = JSON.parse(
        localStorage.getItem('battlePokemons') || '[]'
      );
      const newBattleTeam = savedBattleTeam.filter(
        (pokemon: string) => pokemon !== name
      );
      localStorage.setItem('battlePokemons', JSON.stringify(newBattleTeam));
      this.battleTeam.next(newBattleTeam);
    }
  }

  handleOpenBattleList(state?: boolean) {
    if (state === undefined) {
      console.log('the state is undefined');
    } else if (state !== undefined) {
      this.isBattleListOpen.next(state);
    } else {
      if (this.isBattleListOpen.value === true) {
        this.isBattleListOpen.next(false);
      } else {
        this.isBattleListOpen.next(true);
      }
    }
  }

  setNpcTeam() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('npcPokemons', '[]');
    }

    let pokemonData: any = {};

    this.pokemonService.getPokemonList().subscribe((data: any) => {
      const pokemons = data.results;

      for (let i = 0; i < 3; i++) {
        const randomPokemon = pokemons[
          Math.floor(Math.random() * pokemons.length)
        ] as { name: string; url: string };

        this.pokemonService
          .getPokemonDetails(randomPokemon.name)
          .subscribe((data: any) => {
            this.pokemonService
              .getPokemonDamageRelations(data.types[0].type.url)
              .subscribe((res) => {
                const damageRelations = res.damage_relations;

                pokemonData = {
                  ...data,
                  damageRelations,
                };

                const pokemon =
                  this.formatDataService.formatPokemonData(pokemonData);

                if (
                  typeof window !== 'undefined' &&
                  typeof localStorage !== 'undefined'
                ) {
                  let storageNpcTeam: Pokemon[] = JSON.parse(
                    localStorage.getItem('npcPokemons') || '[]'
                  );
                  if (storageNpcTeam.length < 3) {
                    storageNpcTeam.push(pokemon);
                    localStorage.setItem(
                      'npcPokemons',
                      JSON.stringify(storageNpcTeam)
                    );
                  }
                  this.npcTeam.next(storageNpcTeam);
                }
              });
          });
      }
    });
  }
}
