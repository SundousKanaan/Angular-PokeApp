import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';
import { ShareDataService } from '../../services/shareData.service';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
})
export class PokemonsPageComponent implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private shareDataService: ShareDataService
  ) {}
  pokemonsList: string[] = [];

  ngOnInit(): void {
    if (this.pokemonsList.length === 0) {
      this.getpokemonList();
    } else {
      console.error('Pokemons list is empty');
    }
  }

  getpokemonList() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      const pokemonsNamesList = data.results.map(
        (pokemon: any) => pokemon.name
      );
      this.shareDataService.setPokemonDataList(pokemonsNamesList);
    });
  }
}
