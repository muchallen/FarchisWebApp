import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowingComponent } from './towing.component';

describe('TowingComponent', () => {
  let component: TowingComponent;
  let fixture: ComponentFixture<TowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
