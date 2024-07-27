import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentolistComponent } from './departamentolist.component';

describe('DepartamentolistComponent', () => {
  let component: DepartamentolistComponent;
  let fixture: ComponentFixture<DepartamentolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartamentolistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
