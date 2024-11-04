import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// CommonModule is used to import common directives such as ngIf and ngFor
import { CommonModule } from '@angular/common';
// Import the Pokemon services
import { PokemonService } from '../../services/pokemon.service';
import { PopupService } from '../../services/popup.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
// Import the Pokemon type from types.ts
import { Pokemon, PokemonEvolution } from '../../types';
import { PopupComponent } from '../../subComponents/popup/popup.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonBlockComponent, PopupComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;

  pokemonList: Pokemon[] = [];
  pokemonData: Pokemon | null = null; // the data comes from the pokemon block
  PokemonMainType: string = '';
  openTabName: string = 'aboutTab';
  pokemonEvolutions: PokemonEvolution[] = [];

  // Inject services
  constructor(
    private pokemonService: PokemonService,
    private popupService: PopupService,
    private formatPokemonIdService: FormatPokemonIdService
  ) {}

  // Call the createPokemonList method when the component is initialized
  // and subscribe to changes in the dialog status
  ngOnInit(): void {
    this.createPokemonList();
    this.popupService.currentDialogRef.subscribe((isOpen) => {
      if (this.dialogRef) {
        if (isOpen) {
          this.dialogRef.nativeElement.showModal();
        } else {
          this.dialogRef.nativeElement.close();
        }
      }
    });
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
            this.pokemonList.push(formattedPokemon);
          });
        });
      }
    });
  }

  // * dialog functions

  // Open the dialog with the selected Pokémon data
  openDialog(pokemonData: Pokemon) {
    this.PokemonMainType = pokemonData.types[0];
    this.pokemonData = pokemonData;
    this.popupService.openDialog();
  }
}
