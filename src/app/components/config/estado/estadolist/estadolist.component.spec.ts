import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadolistComponent } from './estadolist.component';

describe('EstadolistComponent', () => {
  let component: EstadolistComponent;
  let fixture: ComponentFixture<EstadolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
