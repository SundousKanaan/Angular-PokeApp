import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pokemonCardComponent } from './pokemonCard.component';

describe('PopupComponent', () => {
  let component: pokemonCardComponent;
  let fixture: ComponentFixture<pokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pokemonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(pokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
