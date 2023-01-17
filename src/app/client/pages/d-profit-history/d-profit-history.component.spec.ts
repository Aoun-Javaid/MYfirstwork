import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DProfitHistoryComponent } from './d-profit-history.component';

describe('DProfitHistoryComponent', () => {
  let component: DProfitHistoryComponent;
  let fixture: ComponentFixture<DProfitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DProfitHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DProfitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
