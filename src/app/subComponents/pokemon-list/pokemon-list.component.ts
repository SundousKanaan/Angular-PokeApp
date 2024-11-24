import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the services
import { PopupService } from '../../services/popup.service';
import { ShareDataService } from '../../services/shareData.service';
import { GetPokemonListService } from '../../services/getPokemonList.service';
import { FormatPokemonIdService } from '../../services/formatPokemonId.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
import { LoadingPokemonBlockComponent } from '../LoadingComponents/loading-pokemon-block-Component/loading-pokemon-block.component';

// Import the Pokemon type from types.ts
import { Pokemon } from '../../types';
import { PopupComponent } from '../../subComponents/popup/popup.component';
import { PokemonService } from '../../services/pokemon.service';
import { response } from 'express';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    PokemonBlockComponent,
    LoadingPokemonBlockComponent,
    PopupComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @Input() pageTitle: string = '';
  pokemonList: (Pokemon | null)[] = [];
  loading: boolean = true;

  // Inject services
  constructor(
    private popupService: PopupService,
    private shareDataService: ShareDataService,
    private pokemonService: PokemonService,
    private formatPokemonIdService: FormatPokemonIdService
  ) {}

  ngOnInit() {
    console.log('PokemonListComponent ngOnInit', this.pokemonList);

    if (this.pageTitle === 'All Pokémons') {
      this.crreateAllPokemonList();
    }

    if (this.pageTitle === 'Favorites') {
      this.createFavoritePokemonList();
    }
  }

  crreateAllPokemonList() {
    this.loading = true;
    this.pokemonService.getPokemonList().subscribe({
      next: (response) => {
        // set temporary null values for each pokemon like a placeholder
        this.pokemonList = response.results.map(() => null);

        // get the pokemon details for each pokemon and change the null value to the pokemon data
        response.results.forEach((pokemon: any, index: number) => {
          this.pokemonService.getPokemonDetails(pokemon.name).subscribe({
            // next used to handle the data
            next: (data) => {
              const formattedPokemon: Pokemon = {
                name: data.name,
                id: data.id,
                formattedPokemonId: this.formatPokemonIdService.formatPokemonId(
                  data.id
                ),
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

              this.pokemonList[index] = formattedPokemon;
            },
          });
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  createFavoritePokemonList() {
    this.loading = true;
    this.shareDataService.currentFavoritePokemonNames.subscribe({
      next: (response) => {
        console.log('response', response);

        // set temporary null values for each pokemon like a placeholder
        this.pokemonList = response.map(() => null);

        // get the pokemon details for each pokemon and change the null value to the pokemon data
        response.forEach((pokemon: any, index: number) => {
          this.pokemonService.getPokemonDetails(pokemon).subscribe({
            // next used to handle the data
            next: (data) => {
              const formattedPokemon: Pokemon = {
                name: data.name,
                id: data.id,
                formattedPokemonId: this.formatPokemonIdService.formatPokemonId(
                  data.id
                ),
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

              this.pokemonList[index] = formattedPokemon;
            },
          });
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  reCheckList() {
    console.log('clicked 1');

    if (this.pageTitle === 'Favorites') {
      console.log('clicked 2');
      this.shareDataService.currentFavoritePokemonsData.subscribe((data) => {
        console.log('clicked 3', data);
      });
    }
  }

  // * dialog functions
  openDialog() {
    this.popupService.openDialog();
  }
}
