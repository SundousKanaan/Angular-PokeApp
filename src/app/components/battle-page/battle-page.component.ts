import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { statesComponent } from '../../subComponents/states/states.component';

@Component({
  selector: 'app-battle-page',
  standalone: true,
  imports: [CommonModule, statesComponent],
  templateUrl: './battle-page.component.html',
  styleUrl: './battle-page.component.css',
})
export class BattlePageComponent {
  constructor() {}

  selectedBattlePokemon: boolean = false;
}
