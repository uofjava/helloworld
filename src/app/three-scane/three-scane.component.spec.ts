import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeScaneComponent } from './three-scane.component';

describe('ThreeScaneComponent', () => {
  let component: ThreeScaneComponent;
  let fixture: ComponentFixture<ThreeScaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeScaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeScaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
