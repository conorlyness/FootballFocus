import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStatsDialogComponent } from './team-stats-dialog.component';

describe('TeamStatsDialogComponent', () => {
  let component: TeamStatsDialogComponent;
  let fixture: ComponentFixture<TeamStatsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamStatsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
