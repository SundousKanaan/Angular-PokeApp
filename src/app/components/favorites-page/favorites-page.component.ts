import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';
import { ShareDataService } from '../../services/shareData.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [PokemonListComponent, CommonModule],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css',
})
export class FavoritesPageComponent implements OnInit {
  favoritePokemons: string[] = [];

  constructor(private shareDataService: ShareDataService) {}

  ngOnInit(): void {
    this.getpokemonList();
  }

  getpokemonList() {
    this.shareDataService.currentFavoritePokemonList.subscribe(
      (favoriteList) => {
        this.favoritePokemons = favoriteList;
      }
    );
  }
}
