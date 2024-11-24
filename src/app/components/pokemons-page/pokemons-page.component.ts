import { Component, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../subComponents/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
})
export class PokemonsPageComponent {}
