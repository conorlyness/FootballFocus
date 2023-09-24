import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureStatsDialogComponent } from './fixture-stats-dialog.component';

describe('FixtureStatsDialogComponent', () => {
  let component: FixtureStatsDialogComponent;
  let fixture: ComponentFixture<FixtureStatsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixtureStatsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureStatsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
