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
    'castelField.jpg',
    'tundraField.png',
    'routeField.jpg',
    'forestDarkField.jpg',
    'caveFiled.jpg',
  ];

  isWinnerKnown: boolean = false;
  isPlayerWinner: boolean = false;
  winnerTeam: any;
  isIntroover: boolean = false;

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

  npcAttackTimerId: any;
  npcAttackIntervalId: any;

  ngOnInit(): void {
    this.resetHp();

    this.selectField();
    this.getNpcTeam();
    this.selectPlayerPokemon();
    this.selectedNpcPokemon = this.npcTeam[0];

    setTimeout(() => {
      this.isIntroover = true;
    }, 5000);

    this.npcAttackTimerId = setTimeout(() => {
      this.npcAttackIntervalId = setInterval(() => {
        this.npcAttack();
      }, 500);
    }, 6500);
  }

  selectField() {
    this.selectedField =
      this.battleFields[Math.floor(Math.random() * this.battleFields.length)];
  }

  selectPlayerPokemon() {
    for (let i = 0; i < this.playerTeam.length; i++) {
      const playerTeam = this.playerTeam[i];
      if (playerTeam.maxHp > 0) {
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

  resetHp() {
    for (let i = 0; i < this.playerTeam.length; i++) {
      this.playerTeam[i].maxHp = 100;
    }

    for (let i = 0; i < this.npcTeam.length; i++) {
      this.npcTeam[i].maxHp = 100;
    }
    this.selectedPlayerPokemon.maxHp = 100;
  }

  surrendering() {
    this.resetHp();
    this.battleState.emit('surrender');
  }

  attack() {
    if (!this.selectedNpcPokemon || !this.selectedPlayerPokemon) {
      return;
    }

    const npcType = this.selectedNpcPokemon.mainType;

    const double_damage_to =
      this.selectedPlayerPokemon.damageRelations.double_damage_to;

    const half_damage_to =
      this.selectedPlayerPokemon.damageRelations.half_damage_to;

    const no_damage_to =
      this.selectedPlayerPokemon.damageRelations.no_damage_to;

    if (double_damage_to.includes(npcType)) {
      this.selectedNpcPokemon.maxHp -= 20;
      this.checkIfNpcPokemonIsDead(this.selectedNpcPokemon.name);
    } else if (half_damage_to.includes(npcType)) {
      this.selectedNpcPokemon.maxHp -= 10;
      this.checkIfNpcPokemonIsDead(this.selectedNpcPokemon.name);
    } else if (no_damage_to.includes(npcType)) {
      this.selectedNpcPokemon.maxHp -= 2.5;
      this.checkIfNpcPokemonIsDead(this.selectedNpcPokemon.name);
    } else {
      this.selectedNpcPokemon.maxHp -= 5;
      this.checkIfNpcPokemonIsDead(this.selectedNpcPokemon.name);
    }

    this.checkWinner();
  }

  npcAttack() {
    if (!this.selectedNpcPokemon || !this.selectedPlayerPokemon) {
      return;
    }

    const playerType = this.selectedPlayerPokemon.mainType;

    const double_damage_to =
      this.selectedNpcPokemon.damageRelations.double_damage_to;

    const half_damage_to =
      this.selectedNpcPokemon.damageRelations.half_damage_to;

    const no_damage_to = this.selectedNpcPokemon.damageRelations.no_damage_to;

    if (double_damage_to.includes(playerType)) {
      this.selectedPlayerPokemon.maxHp -= 20;
      this.checkIfPlayerPokemonIsDead(this.selectedPlayerPokemon.name);
    } else if (half_damage_to.includes(playerType)) {
      this.selectedPlayerPokemon.maxHp -= 10;
      this.checkIfPlayerPokemonIsDead(this.selectedPlayerPokemon.name);
    } else if (no_damage_to.includes(playerType)) {
      this.selectedPlayerPokemon.maxHp -= 2.5;
      this.checkIfPlayerPokemonIsDead(this.selectedPlayerPokemon.name);
    } else {
      this.selectedPlayerPokemon.maxHp -= 5;
      this.checkIfPlayerPokemonIsDead(this.selectedPlayerPokemon.name);
    }

    this.checkWinner();
  }

  checkIfNpcPokemonIsDead(name: string) {
    this.npcTeam.filter((poke) => {
      if (poke.name === name) {
        if (poke.maxHp <= 0) {
          this.selectNpcPokemon();
        }
      }
    });
  }

  checkIfPlayerPokemonIsDead(name: string) {
    this.playerTeam.filter((poke) => {
      if (poke.name === name) {
        if (poke.maxHp <= 0) {
          this.selectPlayerPokemon();
        }
      }
    });
  }

  checkWinner() {
    if (this.playerTeam.every((pokemon) => pokemon.maxHp <= 0)) {
      this.isWinnerKnown = true;
      this.isPlayerWinner = false;
      this.winnerTeam = this.npcTeam;

      clearTimeout(this.npcAttackTimerId);
      clearInterval(this.npcAttackIntervalId);

      // na 1s emit 'ended'
      setTimeout(() => {
        this.battleState.emit('ended');
      }, 7000);
    } else if (this.npcTeam.every((pokemon) => pokemon.maxHp <= 0)) {
      this.isWinnerKnown = true;
      this.isPlayerWinner = true;
      this.winnerTeam = this.playerTeam;

      clearTimeout(this.npcAttackTimerId);
      clearInterval(this.npcAttackIntervalId);

      // na 1s emit 'ended'
      setTimeout(() => {
        this.battleState.emit('ended');
      }, 7000);
    }
  }
}
