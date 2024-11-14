import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumANomComponent } from './num-a-nom.component';

describe('NumANomComponent', () => {
  let component: NumANomComponent;
  let fixture: ComponentFixture<NumANomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumANomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumANomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
