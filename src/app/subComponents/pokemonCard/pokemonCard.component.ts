import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { Pokemon } from '../../types';
import { PokemonService } from '../../services/pokemon.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';
import { ShareDataService } from '../../services/shareData.service';

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

  isDialogOpen = false; // the dialog is closed by default

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
      this.pokemonService
        .getPokemonEvolution(evolutionChainUrl)
        .subscribe((data: any) => {
          const evolutionChain: { name: string; url: string }[] = [];

          // Eerste niveau
          if (data.chain) {
            evolutionChain.push({
              name: data.chain.species.name,
              url: data.chain.species.url,
            });

            // Tweede niveau (evolves_to)
            if (data.chain.evolves_to && data.chain.evolves_to.length > 0) {
              evolutionChain.push({
                name: data.chain.evolves_to[0].species.name,
                url: data.chain.evolves_to[0].species.url,
              });

              // Derde niveau (evolves_to[0].evolves_to)
              if (
                data.chain.evolves_to[0].evolves_to &&
                data.chain.evolves_to[0].evolves_to.length > 0
              ) {
                evolutionChain.push({
                  name: data.chain.evolves_to[0].evolves_to[0].species.name,
                  url: data.chain.evolves_to[0].evolves_to[0].species.url,
                });
              }
            }
          }

          for (let i = 0; i < evolutionChain.length; i++) {
            const PokemonEvolution = evolutionChain[i];
            this.pokemonService
              .getPokemonDetails(PokemonEvolution.name)
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
          }
        });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
