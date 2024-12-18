import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
import { Pokemon } from '../../types';
import { PokemonService } from '../../services/pokemon.service';
import { FormatDataService } from '../../services/formatData.service';

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
    private formatDataService: FormatDataService,
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
                const formattedPokemonEvolution =
                  this.formatDataService.formatPokemonData(data);

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
