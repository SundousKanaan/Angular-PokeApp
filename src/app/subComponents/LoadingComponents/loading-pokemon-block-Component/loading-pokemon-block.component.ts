import { Component } from '@angular/core';
import { LoadingBarComponent } from '../loadingBar/loading-bar.Component';

@Component({
  selector: 'loadingPokemonBlock',
  standalone: true,
  imports: [LoadingBarComponent],
  templateUrl: './loading-pokemon-block.component.html',
  styleUrl: './loading-pokemon-block.component.css',
})
export class LoadingPokemonBlockComponent {}
