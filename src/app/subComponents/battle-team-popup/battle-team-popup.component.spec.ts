import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleTeamPopupComponent } from './battle-team-popup.component';

describe('BattleTeamPopupComponent', () => {
  let component: BattleTeamPopupComponent;
  let fixture: ComponentFixture<BattleTeamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleTeamPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleTeamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
