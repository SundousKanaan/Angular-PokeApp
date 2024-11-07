import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';
import { ShareDataService } from '../../services/shareData.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  constructor(private shareDataService: ShareDataService) {}
  favoritePokemons: string[] = [];

  ngOnInit() {
    this.checkFavoriteList();
  }

  checkFavoriteList() {
    if (this.shareDataService.getFavoritePokemons() === null) {
      this.favoritePokemons = [];
    }
    this.favoritePokemons = this.shareDataService.getFavoritePokemons();
  }
}
