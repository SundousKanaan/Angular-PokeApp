import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBlockComponent } from './pokemon-block.component';

describe('PokemonBlockComponent', () => {
  let component: PokemonBlockComponent;
  let fixture: ComponentFixture<PokemonBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
