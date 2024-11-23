import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the services
import { PopupService } from '../../services/popup.service';
import { ShareDataService } from '../../services/shareData.service';
import { GetPokemonListService } from '../../services/getPokemonList.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
// Import the Pokemon type from types.ts
import { Pokemon } from '../../types';
import { PopupComponent } from '../../subComponents/popup/popup.component';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonBlockComponent, PopupComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @Input() pageTitle: string = '';
  pokemonList: Pokemon[] | null = [];

  // Inject services
  constructor(
    private popupService: PopupService,
    private shareDataService: ShareDataService,
    private getPokemonListService: GetPokemonListService
  ) {}

  ngOnInit() {
    if (this.pageTitle === 'All Pokémons') {
      this.crreateAllPokemonList();
    }

    if (this.pageTitle === 'Favorites') {
      this.createFavoritePokemonList();
    }
  }

  crreateAllPokemonList() {
    this.shareDataService.currentPokemonDataList.subscribe((data) => {
      this.pokemonList = data;
    });
  }

  createFavoritePokemonList() {
    this.shareDataService.currentFavoritePokemonNames.subscribe((data) => {
      this.getPokemonListService
        .getPokemonListService(data)
        .subscribe((data) => {
          this.pokemonList = data;
        });
    });
  }

  reCheckList() {
    console.log('clicked 1');

    if (this.pageTitle === 'Favorites') {
      console.log('clicked 2');
      this.shareDataService.currentFavoritePokemonsData.subscribe((data) => {
        console.log('clicked 3', data);
        // for (let i = 0; i < data.length; i++) {
        //   console.log('clicked 4', data[i]);
        // }
      });
    }
  }

  // * dialog functions
  openDialog() {
    this.popupService.openDialog();
  }
}
