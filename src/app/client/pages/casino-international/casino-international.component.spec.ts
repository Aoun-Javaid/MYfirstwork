import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoInternationalComponent } from './casino-international.component';

describe('CasinoInternationalComponent', () => {
  let component: CasinoInternationalComponent;
  let fixture: ComponentFixture<CasinoInternationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinoInternationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasinoInternationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
