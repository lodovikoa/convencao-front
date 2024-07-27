import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentodetailComponent } from './departamentodetail.component';

describe('DepartamentodetailComponent', () => {
  let component: DepartamentodetailComponent;
  let fixture: ComponentFixture<DepartamentodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentodetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
