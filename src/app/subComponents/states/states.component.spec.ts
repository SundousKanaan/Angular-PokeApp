import { ComponentFixture, TestBed } from '@angular/core/testing';

import { statesComponent } from './states.component';

describe('EmptyStateComponent', () => {
  let component: statesComponent;
  let fixture: ComponentFixture<statesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [statesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(statesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
