import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Last5DialogComponent } from './last5-dialog.component';

describe('Last5DialogComponent', () => {
  let component: Last5DialogComponent;
  let fixture: ComponentFixture<Last5DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Last5DialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Last5DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
