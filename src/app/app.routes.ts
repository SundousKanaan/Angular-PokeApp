import { Routes } from '@angular/router';
import { PokemonsPageComponent } from './components/pokemons-page/pokemons-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { BattlePageComponent } from './components/battle-page/battle-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'All-Pokémons',
    pathMatch: 'full',
  },
  {
    path: 'All-Pokémons',
    component: PokemonsPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
  {
    path: 'battle',
    component: BattlePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: '**',
    component: NotFoundComponentComponent,
  },
];
