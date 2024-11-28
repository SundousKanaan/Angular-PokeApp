import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { Pokemon } from '../../types';
import { PokemonService } from '../../services/pokemon.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

@Component({
  selector: 'pokemonCard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemonCard.component.html',
  styleUrl: './pokemonCard.component.css',
})
export class pokemonCardComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private formatPokemonIdService: FormatPokemonIdService,
    @Inject(MAT_DIALOG_DATA) public data: Pokemon,
    private dialogRef: MatDialogRef<pokemonCardComponent>
  ) {}

  pokemonData: Pokemon | null = null;
  openTabName: string = 'aboutTab';
  pokemonEvolutions: Pokemon[] = [];

  isDialogOpen = false;

  ngOnInit() {
    if (this.data) {
      this.pokemonData = this.data;
    }
  }

  handleOpenTab(tab: string) {
    this.openTabName = tab;

    if (tab === 'evolutionTab') {
      if (this.pokemonData?.species_Url) {
        this.getPokemonEvolutions(this.pokemonData.species_Url);
      }
    }
  }

  getPokemonEvolutions(url: string) {
    this.pokemonEvolutions = [];
    this.pokemonService.getPokemonSpecies(url).subscribe((data: any) => {
      const evolutionChainUrl = data.evolution_chain.url;

      // Fetch the evolution chain
      this.pokemonService
        .getPokemonEvolution(evolutionChainUrl)
        .subscribe((chain: any) => {
          const processedEvolutionChain = (chain: any) => {
            if (!chain) return;

            const evolutionChain = {
              name: chain.species.name,
              url: chain.species.url,
            };

            this.pokemonService
              .getPokemonDetails(evolutionChain.name)
              .subscribe((data: any) => {
                const formattedPokemonEvolution: Pokemon = {
                  name: data.name,
                  id: data.id,
                  formattedPokemonId:
                    this.formatPokemonIdService.formatPokemonId(data.id),
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

                this.pokemonEvolutions.push(formattedPokemonEvolution);
              });

            if (chain.evolves_to && chain.evolves_to.length > 0) {
              chain.evolves_to.forEach((evolution: any) => {
                processedEvolutionChain(evolution);
              });
            } else if (this.pokemonEvolutions.length === 0) {
              console.log('No further evolutions found for this Pokémon.');
            }
          };

          processedEvolutionChain(chain.chain);
        });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
