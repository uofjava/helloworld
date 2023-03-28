import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGltfComponent } from './three-gltf.component';

describe('ThreeGltfComponent', () => {
  let component: ThreeGltfComponent;
  let fixture: ComponentFixture<ThreeGltfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeGltfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeGltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
