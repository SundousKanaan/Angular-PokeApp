import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PokemonsPageComponent } from './components/pokemons-page/pokemons-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { BattlePageComponent } from './components/battle-page/battle-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
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
    component: PokemonsPageComponent,
  },
];
