// Create a service that fetches Pokémon data from the API endpoint.
// The service should have two methods: getPokemonList and getPokemonDetails.
// The getPokemonList method should fetch the first 10 Pokémon from the API endpoint.
// The getPokemonDetails method should fetch details for a specific Pokémon by name.
// The service should use the HttpClient module to make HTTP requests and the Observable module to handle asynchronous data.
// The service should be injected into the Pokémon list component.

// Injectable is used to inject a service into another service
import { Injectable } from '@angular/core';
// HttpClient is used to make HTTP requests
import { HttpClient } from '@angular/common/http';
// Observable is used to handle asynchronous data
import { catchError, Observable, of } from 'rxjs';

// The @Injectable() decorator is used to inject a service into another service
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // private is used to declare a private variable
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  // Get all Pokemon from the API endpoint
  constructor(private http: HttpClient) {}
  // Fetcht de eerste 10 Pokémon
  // pokemon.service.ts
  getPokemonList(): Observable<{ results: object[] }> {
    return this.http.get<{ results: object[] }>(`${this.apiUrl}?limit=100`);
  }

  getPokemonDetails(data: string | undefined | null): Observable<any> {
    if (!data) {
      return of({
        success: false,
        error: 'Invalid Pokémon name or ID.',
      });
    }

    return this.http.get(`${this.apiUrl}/${data}`).pipe(
      catchError((error) => {
        console.log('Error fetching Pokémon details: error', error.status);

        // Return an object with an error indicator
        return of({
          success: false,
          error: 'Unable to fetch Pokémon details.',
        });
      })
    );
  }

  // Fetcht the evolution chain for a specific Pokémon
  getPokemonSpecies(url: string): Observable<any> {
    // from the ling fetch get the evolution chain link and fetch his data
    return this.http.get(url);
  }

  getPokemonEvolution(url: string): Observable<any> {
    return this.http.get(url);
  }

  getPokemonFormData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
