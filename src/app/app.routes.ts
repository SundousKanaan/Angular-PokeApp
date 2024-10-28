import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemonlist',
    pathMatch: 'full',
  },
  {
    path: 'pokemonlist',
    component: PokemonListComponent,
  },
  {
    path: '**',
    component: AppComponent,
  },
];
