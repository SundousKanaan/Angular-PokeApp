// this service is used to format the pokemon id to a 3 digit number

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FormatPokemonIdService {
  formatPokemonId(id: number): string {
    if (id < 10) {
      return `00${id}`;
    } else if (id < 100) {
      return `0${id}`;
    } else {
      return `${id}`;
    }
  }
}
