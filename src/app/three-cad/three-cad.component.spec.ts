import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCadComponent } from './three-cad.component';

describe('ThreeCadComponent', () => {
  let component: ThreeCadComponent;
  let fixture: ComponentFixture<ThreeCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeCadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
