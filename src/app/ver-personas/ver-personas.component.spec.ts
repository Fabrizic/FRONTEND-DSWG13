import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPersonasComponent } from './ver-personas.component';

describe('VerPersonasComponent', () => {
  let component: VerPersonasComponent;
  let fixture: ComponentFixture<VerPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPersonasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
