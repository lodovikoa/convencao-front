import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadodetailComponent } from './estadodetail.component';

describe('EstadodetailComponent', () => {
  let component: EstadodetailComponent;
  let fixture: ComponentFixture<EstadodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadodetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
