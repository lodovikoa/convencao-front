import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvencaodetailComponent } from './convencaodetail.component';

describe('ConvencaodetailComponent', () => {
  let component: ConvencaodetailComponent;
  let fixture: ComponentFixture<ConvencaodetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvencaodetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvencaodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
