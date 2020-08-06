import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehichleComponent } from './vehichle.component';

describe('VehichleComponent', () => {
  let component: VehichleComponent;
  let fixture: ComponentFixture<VehichleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehichleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehichleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
