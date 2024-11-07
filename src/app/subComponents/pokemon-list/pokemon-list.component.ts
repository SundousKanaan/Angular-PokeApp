import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
// CommonModule is used to import common directives such as ngIf and ngFor
import { CommonModule } from '@angular/common';
// Import the Pokemon services
import { GetPokemonListService } from '../../services/getPokemonList.service';

// Import the PokemonBlockComponent (child component)
import { PokemonBlockComponent } from '../../subComponents/pokemon-block/pokemon-block.component';
// Import the Pokemon type from types.ts
import { Pokemon } from '../../types';
import { PopupComponent } from '../../subComponents/popup/popup.component';
import { PopupService } from '../../services/popup.service';

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
  pokemonList: Pokemon[] = [];
  pokemonData: Pokemon | null = null;

  // Inject services
  constructor(
    private getPokemonListService: GetPokemonListService,
    private popupService: PopupService
  ) {}

  ngOnInit() {
    // this.createPokemonList();
    // if (this.pokemonsNamesList && this.pokemonsNamesList.length !== 0) {
    this.createPokemonList();
    // }
  }

  createPokemonList() {
    if (this.pokemonsNamesList.length > 0) {
      this.getPokemonListService
        .getPokemonListService(this.pokemonsNamesList)
        .subscribe((data: any) => {
          this.pokemonList = data;
        });
    }
  }

  // * dialog functions
  openDialog() {
    this.popupService.openDialog();
  }
}
