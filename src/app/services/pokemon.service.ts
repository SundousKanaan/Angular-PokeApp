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
import { Observable } from 'rxjs';

// The @Injectable() decorator is used to inject a service into another service
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  // private is used to declare a private variable
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  PokemonEvolution_url: string = '';
  // Get all Pokemon from the API endpoint
  constructor(private http: HttpClient) {}
  // Fetcht de eerste 10 Pokémon
  // pokemon.service.ts
  getPokemonList(): Observable<{ results: object[] }> {
    return this.http.get<{ results: object[] }>(`${this.apiUrl}?limit=8`);
  }

  // Fetcht details for a specific Pokémon by name
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  // Fetcht the evolution chain for a specific Pokémon
  getPokemonSpecies(url: string): Observable<any> {
    // from the ling fetch get the evolution chain link and fetch his data
    return this.http.get(url);
  }

  getPokemonEvolution(url: string): Observable<any> {
    return this.http.get(url);
  }
}
