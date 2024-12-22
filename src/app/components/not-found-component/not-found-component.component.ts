import { Component } from '@angular/core';
import { StatesComponent } from '../../subComponents/states/states.component';

@Component({
  selector: 'not-found-component',
  standalone: true,
  imports: [StatesComponent],
  templateUrl: './not-found-component.component.html',
  styleUrl: './not-found-component.component.css',
})
export class NotFoundComponentComponent {}
