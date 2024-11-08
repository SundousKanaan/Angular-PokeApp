import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the services
import { PopupService } from '../../services/popup.service';
import { ShareDataService } from '../../services/shareData.service';

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
  @Input() pokemonsNamesList: string[] = [];
  pokemonList: Pokemon[] | null = [];
  pokemonData: Pokemon | null = null;

  // Inject services
  constructor(
    private popupService: PopupService,
    private shareDataService: ShareDataService
  ) {}

  ngOnInit() {
    this.createPokemonList();
  }

  createPokemonList() {
    this.shareDataService.setPokemonList(this.pokemonsNamesList);
    this.shareDataService.currentPokemonDataList.subscribe((data) => {
      this.pokemonList = data;
    });
  }

  // * dialog functions
  openDialog() {
    this.popupService.openDialog();
  }
}
