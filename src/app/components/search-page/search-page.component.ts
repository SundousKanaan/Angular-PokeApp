import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { FormatDataService } from '../../services/formatData.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Pokemon } from '../../types';
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
import { MatDialog } from '@angular/material/dialog';
import { pokemonCardComponent } from '../../subComponents/pokemonCard/pokemonCard.component';
import { LoadingPokemonBlockComponent } from '../../subComponents/loading-pokemon-block-Component/loading-pokemon-block.component';
import { statesComponent } from '../../subComponents/states/states.component';

@Component({
  selector: 'searchPage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonBlockComponent,
    LoadingPokemonBlockComponent,
    statesComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private formatDataService: FormatDataService,
    private pokemonCard: MatDialog
  ) {}

  searchStatus: string = 'empty';

  searchResults: Pokemon[] = [];
  fullPokemonList: string[] = [];
  searchForm = new FormGroup({
    searchInput: new FormControl<string | undefined>(undefined),
  });

  errorMessage = '';
  emtptyStateMessage = 'Start searching for a pokemon';

  notAllowedKeys = [
    '\\',
    '/',
    ':',
    '*',
    '?',
    '"',
    '<',
    '>',
    '|',
    "'",
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '(',
    ')',
    '+',
    '=',
    '{',
    '}',
    '[',
    ']',
    '!',
    '`',
    '~',
    ';',
    ',',
    '.',
    ' ',
  ];

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe((data) => {
      const list = data.results.map((pokemon: any) => pokemon.name);
      this.fullPokemonList = list;
    });
  }

  // bulbasaur

  // * dialog functions
  openDialog(selectedPokemon: Pokemon) {
    this.pokemonCard.open(pokemonCardComponent, {
      data: selectedPokemon,
    });
  }

  search(): void {
    this.searchResults = [];
    const searchValue = this.searchForm.value.searchInput;
    if (!searchValue) {
      this.searchStatus = 'error';
      this.errorMessage = 'The search value is empty or invalid';

      return;
    }

    const containNotAllowedKey = this.notAllowedKeys.find((key) =>
      searchValue.includes(key)
    );

    if (containNotAllowedKey) {
      if (containNotAllowedKey === ' ') {
        this.errorMessage = 'The search value is empty or invalid';
      } else {
        this.errorMessage = `The search value can't contain special characters like: ${containNotAllowedKey}`;
      }
      console.log('not allowed', containNotAllowedKey);
      this.searchStatus = 'error';
      return;
    }

    // filter the fullPokemonList of pokemon names to find the one that matches the search value
    const filteredPokemonList = this.fullPokemonList.filter((pokemonName) =>
      pokemonName.startsWith(searchValue.toLowerCase())
    );

    if (filteredPokemonList.length === 0) {
      this.getPokemon(searchValue);
    } else {
      filteredPokemonList.forEach((pokemonName) => {
        this.getPokemon(pokemonName);
      });
    }
  }

  getPokemon(value: string) {
    this.searchStatus = 'loading';
    this.pokemonService.getPokemonDetails(value).subscribe((data) => {
      if (data.success === false) {
        this.searchStatus = 'empty';
        this.emtptyStateMessage = 'No pokemon found';
      } else {
        const formattedPokemon = this.formatDataService.formatPokemonData(data);
        console.log('formattedPokemon', formattedPokemon);

        this.searchResults.push(formattedPokemon);
        this.searchStatus = 'success';
      }
    });
  }
}
