import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvencaolistComponent } from './convencaolist.component';

describe('ConvencaolistComponent', () => {
  let component: ConvencaolistComponent;
  let fixture: ComponentFixture<ConvencaolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvencaolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvencaolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
