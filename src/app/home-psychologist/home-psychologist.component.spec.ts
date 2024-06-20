import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePsychologistComponent } from './home-psychologist.component';

describe('HomePsychologistComponent', () => {
  let component: HomePsychologistComponent;
  let fixture: ComponentFixture<HomePsychologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePsychologistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
