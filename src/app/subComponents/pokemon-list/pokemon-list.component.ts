import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the services
import { ShareDataService } from '../../services/shareData.service';
import { FormatDataService } from '../../services/formatData.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
import { LoadingPokemonBlockComponent } from '../loading-pokemon-block-Component/loading-pokemon-block.component';

// Import the Pokemon type from types.ts
import { Pokemon } from '../../types';
import { pokemonCardComponent } from '../pokemonCard/pokemonCard.component';
import { PokemonService } from '../../services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { StatesComponent } from '../states/states.component';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    PokemonBlockComponent,
    LoadingPokemonBlockComponent,
    StatesComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @Input() pageTitle: string = '';

  pokemonList: (Pokemon | null)[] = [];
  loading: boolean = true;

  // Inject services
  constructor(
    private pokemonCard: MatDialog,
    private shareDataService: ShareDataService,
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService
  ) {}

  ngOnInit() {
    if (this.pageTitle === 'All Pokémons') {
      this.crreateAllPokemonList();
    } else if (this.pageTitle === 'Favorites') {
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
              const formattedPokemon =
                this.formatDataService.formatPokemonData(data);

              this.pokemonList[index] = formattedPokemon;
            },
          });
        });
        this.loading = false;
      },
      error: (error) => {
        console.log('There was an error!', error);
      },
    });
  }

  createFavoritePokemonList() {
    this.loading = true;
    this.shareDataService.currentFavoritePokemonNames.subscribe({
      next: (response) => {
        // set temporary null values for each pokemon like a placeholder
        this.pokemonList = response.map(() => null);

        // get the pokemon details for each pokemon and change the null value to the pokemon data
        response.forEach((pokemon: any, index: number) => {
          this.pokemonService.getPokemonDetails(pokemon).subscribe({
            // next used to handle the data
            next: (data) => {
              const formattedPokemon =
                this.formatDataService.formatPokemonData(data);

              this.pokemonList[index] = formattedPokemon;
            },
          });
        });
        this.loading = false;
      },
      error: (error) => {
        console.log('There was an error!', error);
      },
    });
  }

  reCheckList() {
    if (this.pageTitle === 'Favorites') {
      this.shareDataService.currentFavoritePokemonsData.subscribe((data) => {
        console.log('Favorites', data);
      });
    }
  }

  // * dialog functions
  openDialog(selectedPokemon: Pokemon) {
    this.pokemonCard.open(pokemonCardComponent, {
      data: selectedPokemon,
    });
  }
}
