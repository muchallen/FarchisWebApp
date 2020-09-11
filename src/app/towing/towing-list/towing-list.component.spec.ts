import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TowingListComponent } from './towing-list.component';

describe('TowingListComponent', () => {
  let component: TowingListComponent;
  let fixture: ComponentFixture<TowingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TowingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TowingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
