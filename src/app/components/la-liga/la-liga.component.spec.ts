import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaLigaComponent } from './la-liga.component';

describe('LaLigaComponent', () => {
  let component: LaLigaComponent;
  let fixture: ComponentFixture<LaLigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaLigaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaLigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
