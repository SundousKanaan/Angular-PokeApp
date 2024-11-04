import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonEvolution } from '../../types';
import { PopupService } from '../../services/popup.service';
import { PokemonService } from '../../services/pokemon.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

@Component({
  selector: 'popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  @Input() pokemonData: Pokemon | null = null; // the data comes from the pokemon block through the parent component
  @Input() PokemonMainType: string = '';
  @Input() openTabName: string = 'evolutionTab';
  pokemonEvolutions: Pokemon[] = [];

  isDialogOpen = true; // the dialog is closed by default

  constructor(
    private popupService: PopupService,
    private pokemonService: PokemonService,
    private formatPokemonIdService: FormatPokemonIdService
  ) {}

  ngOnInit(): void {
    // Abonneer je op veranderingen in de dialogstatus
    this.popupService.currentDialogRef.subscribe((isOpen) => {
      this.isDialogOpen = isOpen;
      if (isOpen) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    });
  }

  openDialog() {
    if (this.dialogRef) {
      this.dialogRef.nativeElement.showModal();
      this.dialogRef.nativeElement.classList.remove('close');
      this.dialogRef.nativeElement.classList.add('open');
    }
  }

  closeDialog() {
    if (this.dialogRef) {
      document.body.style.overflow = '';
      this.openTabName = 'aboutTab';
      this.dialogRef.nativeElement.close();
      this.dialogRef.nativeElement.classList.add('close');
    }
  }

  handleOpenTab(tab: string) {
    this.openTabName = tab;

    if (tab === 'evolutionTab') {
      if (this.pokemonData?.species_Url) {
        this.getPokemonEvolutions(this.pokemonData.species_Url);

        console.log(this.pokemonEvolutions);
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
}
