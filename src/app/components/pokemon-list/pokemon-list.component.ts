import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// CommonModule is used to import common directives such as ngIf and ngFor
import { CommonModule } from '@angular/common';
// Import the Pokemon services
import { PokemonService } from '../../services/pokemon.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
// Import the Pokemon type from types.ts
import { Pokemon, PokemonEvolution } from '../../types';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  // Import the PokemonBlockComponent and CommonModule
  imports: [CommonModule, PokemonBlockComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  // Inject the Pokémon service
  constructor(
    private pokemonService: PokemonService,
    private formatPokemonIdService: FormatPokemonIdService
  ) {}

  // Use the @ViewChild() decorator to get a reference to the dialog element
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  pokemonList: Pokemon[] = [];
  pokemonData: Pokemon | null = null; // the data comes from the pokemon block
  formattedPokemonId: string = '';
  pokemonEvolutions: PokemonEvolution | null = null;
  PokemonMainType: string = '';
  openTabName: string = 'aboutTab';

  // * pokemon list functions
  // Call the createPokemonList method when the component is initialized
  ngOnInit(): void {
    this.createPokemonList();
    // this.dialogRef.nativeElement.showModal();
  }

  // Create a method to fetch the Pokémons from the API endpoint
  createPokemonList() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      // Get the names of the Pokémons
      const pokemonNames = data.results.map((pokemon: any) => pokemon.name);

      // Fetch details for each Pokémon
      if (pokemonNames.length > 0) {
        pokemonNames.forEach((pokemon) => {
          this.pokemonService.getPokemonDetails(pokemon).subscribe((data) => {
            // Format the Pokémon data according to the Pokemon type from types.ts

            const formattedPokemon: Pokemon = {
              name: data.name,
              id: data.id,
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

            this.pokemonList.push(formattedPokemon);
          });
        });
      }
    });
  }

  // * dialog functions
  openDialog(pokemonData: Pokemon) {
    if (this.dialogRef) {
      // Gebruik nativeElement om de methode aan te roepen
      this.dialogRef.nativeElement.showModal();
      this.dialogRef.nativeElement.classList.remove('close');
      this.pokemonData = pokemonData;
      if (this.pokemonData) {
        this.formattedPokemonId = this.formatPokemonIdService.formatPokemonId(
          this.pokemonData.id
        );
        this.PokemonMainType = pokemonData.types[0];
        // this.bringPokemonEvolution(this.pokemonData.species_Url);
      }
    }
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.nativeElement.close();
      this.dialogRef.nativeElement.classList.add('close');
      document.body.style.overflow = '';
      this.openTabName = 'aboutTab';
    }
  }

  handleOpenTab(tab: string) {
    this.openTabName = tab;
  }

  // bringPokemonEvolution(url: string): void {
  //   if (url) {
  //     console.log('URL:', url);
  //     this.pokemonEvolutions = null;

  //     this.pokemonService.getPokemonSpecies(url).subscribe((res) => {
  //       this.pokemonService
  //         .getPokemonEvolution(res.evolution_chain.url)
  //         .subscribe((data) => {
  //           this.pokemonEvolutions = {
  //             id: data.id,
  //             evolutionLevelOne: {
  //               name: data.chain.species.name,
  //               url: data.chain.species.url,
  //             },
  //             evolutionLevelTwo: {
  //               name: data.chain.evolves_to[0]?.species.name || '',
  //               url: data.chain.evolves_to[0]?.species.url || '',
  //             },
  //             evolutionLevelThree: {
  //               name:
  //                 data.chain.evolves_to[0]?.evolves_to[0]?.species.name || '',
  //               url: data.chain.evolves_to[0]?.evolves_to[0]?.species.url || '',
  //             },
  //           };
  //         });
  //     });
  //   }
  // }
}
