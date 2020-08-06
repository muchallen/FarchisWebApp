import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehichleListComponent } from './vehichle-list.component';

describe('VehichleListComponent', () => {
  let component: VehichleListComponent;
  let fixture: ComponentFixture<VehichleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehichleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehichleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
