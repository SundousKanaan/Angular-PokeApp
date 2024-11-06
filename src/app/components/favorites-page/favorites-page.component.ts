import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  constructor() {}

  pokemonsNamesList: string[] = [];

  ngOnInit(): void {
    // git the favorites list from the local storage
    const favoritesList = localStorage.getItem('favorites');
    if (favoritesList) {
      this.pokemonsNamesList = JSON.parse(favoritesList);
      console.log(this.pokemonsNamesList);
    } else {
      this.pokemonsNamesList = [];
      console.log(this.pokemonsNamesList);
    }
  }
}
