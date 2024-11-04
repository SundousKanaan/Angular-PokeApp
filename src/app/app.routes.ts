import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { AppComponent } from './app.component';
import { PopupComponent } from './subComponents/popup/popup.component';

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
    path: 'test',
    component: PopupComponent,
  },
  {
    path: '**',
    component: AppComponent,
  },
];
