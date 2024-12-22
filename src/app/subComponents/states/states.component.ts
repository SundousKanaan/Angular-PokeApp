import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'states',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './states.component.html',
  styleUrl: './states.component.css',
})
export class StatesComponent implements OnInit {
  index: any;
  constructor(private pokemonService: PokemonService) {}
  @Input() state: string = '';
  @Input() text: string = '';
  @Input() linkText: string = '';
  @Input() link: string = '';

  centerImageSrc: string = '';
  circleListSrcs: string[] = [];

  ngOnInit(): void {
    this.getAnimationImages();
  }

  getAnimationImages(): void {
    this.pokemonService.getPokemonDetails('unown').subscribe((res) => {
      // Get the circleListSrcs
      if (this.state === 'empty') {
        for (let i = 0; i < 12; i++) {
          const link = res.forms[i].url;

          this.pokemonService.getPokemonFormData(link).subscribe((data) => {
            this.circleListSrcs.push(data.sprites.front_default);
          });
        }

        // Get the "unown-question" form
        res.forms.filter((form: any) => {
          if (form.name === 'unown-question') {
            this.pokemonService
              .getPokemonFormData(form.url)
              .subscribe((data) => {
                this.centerImageSrc = data.sprites.front_default;
              });
          }
        });
      } else if (this.state === 'error') {
        for (let i = 0; i < 6; i++) {
          const link = res.forms[i].url;

          this.pokemonService.getPokemonFormData(link).subscribe((data) => {
            this.circleListSrcs.push(data.sprites.front_default);
          });
        }
      }
    });
  }
}
