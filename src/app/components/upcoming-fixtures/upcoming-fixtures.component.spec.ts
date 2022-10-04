import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingFixturesComponent } from './upcoming-fixtures.component';

describe('UpcomingFixturesComponent', () => {
  let component: UpcomingFixturesComponent;
  let fixture: ComponentFixture<UpcomingFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingFixturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
