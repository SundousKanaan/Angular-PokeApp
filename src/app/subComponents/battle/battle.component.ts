import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../types';
import { BattleDataService } from '../../services/battleDataService';

@Component({
  selector: 'battle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.css',
})
export class BattleComponent implements OnInit {
  constructor(private battleDataService: BattleDataService) {}
  @Output() battleState = new EventEmitter<string>();
  @Input() playerTeam: Pokemon[] = [];

  npcTeam: Pokemon[] = [];
  deadPokemons: string[] = [];

  battleFields: string[] = [
    'desertField.jpg',
    'forestAutumnField.png',
    'forestField.jpg',
    'forestSandField.png',
    'grassField.png',
    'tundraField.png',
  ];

  selectedField: string = 'grassField';

  selectedPlayerPokemon: Pokemon = {
    name: '',
    id: 0,
    formattedPokemonId: '',
    types: [],
    mainType: '',
    sprites: {
      front_default: '',
      back_default: '',
    },
    species_Url: '',
    abilities: [],
    weight: 0,
    height: 0,
    base: 0,
    stats: [],
    damageRelations: {
      double_damage_from: [],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    },
    maxHp: 0,
  };

  selectedNpcPokemon: Pokemon = {
    name: '',
    id: 0,
    formattedPokemonId: '',
    types: [],
    mainType: '',
    sprites: {
      front_default: '',
      back_default: '',
    },
    species_Url: '',
    abilities: [],
    weight: 0,
    height: 0,
    base: 0,
    stats: [],
    damageRelations: {
      double_damage_from: [],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    },
    maxHp: 100,
  };

  ngOnInit(): void {
    this.selectField();
    this.getNpcTeam();
    this.selectPlayerPokemon();
    this.selectedNpcPokemon = this.npcTeam[0];

    setTimeout(() => {
      setInterval(() => {
        this.npcAttack();
      }, 1000);
    }, 1000);
  }

  selectField() {
    // select random field from battleFields
    this.selectedField =
      this.battleFields[Math.floor(Math.random() * this.battleFields.length)];
  }

  selectPlayerPokemon() {
    for (let i = 0; i < this.playerTeam.length; i++) {
      const playerTeam = this.playerTeam[i];
      console.log('Checking NPC:', playerTeam);
      if (playerTeam.maxHp > 0) {
        console.log('NPC selected:', playerTeam);
        this.selectedPlayerPokemon = playerTeam;
        break;
      }
    }
  }

  handleSelectedPokemon(name: string) {
    this.playerTeam.filter((poke) => {
      if (poke.name === name) {
        if (poke.maxHp > 0) {
          this.selectedPlayerPokemon = poke;
        }
      }
    });
  }

  // get 3 random pokemons from the list
  getNpcTeam() {
    this.battleDataService.currentNpcTeam.subscribe((team) => {
      this.npcTeam = team;
      if (this.npcTeam.length === 3) {
        this.selectNpcPokemon();
      }
    });
  }

  selectNpcPokemon(): void {
    for (let i = 0; i < this.npcTeam.length; i++) {
      const npc = this.npcTeam[i];
      if (npc.maxHp === 100) {
        this.selectedNpcPokemon = npc;
        break;
      }
    }
  }

  surrendering() {
    this.battleState.emit('');
  }

  attack() {
    console.log('attack', this.selectedNpcPokemon.maxHp);

    this.selectedNpcPokemon.maxHp -= 10;
    this.checkIfNpcPokemonIsDead(this.selectedNpcPokemon.name);
  }

  npcAttack() {
    this.selectedPlayerPokemon.maxHp -= 10;
    this.checkIfPlayerPokemonIsDead(this.selectedPlayerPokemon.name);
  }

  checkIfNpcPokemonIsDead(name: string) {
    this.npcTeam.filter((poke) => {
      if (poke.name === name) {
        if (poke.maxHp <= 0) {
          console.log('4 Pokemon is dead:', poke.maxHp);
          this.selectNpcPokemon();
          // this.battleDataService battle state to 'ended' in the battleService
        }
      }
    });
  }

  checkIfPlayerPokemonIsDead(name: string) {
    this.playerTeam.filter((poke) => {
      if (poke.name === name) {
        if (poke.maxHp <= 0) {
          console.log('Player Pokemon is dead:', poke.maxHp);
          this.selectPlayerPokemon();
        }
      }
    });
  }
}
