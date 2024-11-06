import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
})
export class PokemonsPageComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}
  pokemonsNamesList: string[] = [];

  ngOnInit(): void {
    console.log('test');

    this.getpokemonList();
  }

  getpokemonList() {
    this.pokemonService.getPokemonList().subscribe((data) => {
      this.pokemonsNamesList = data.results.map((pokemon: any) => pokemon.name);
      console.log('PokemonsPageComponent', this.pokemonsNamesList);
    });
  }
}
