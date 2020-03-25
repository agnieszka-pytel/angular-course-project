import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeReadComponent } from './to-be-read.component';

describe('ToBeReadComponent', () => {
  let component: ToBeReadComponent;
  let fixture: ComponentFixture<ToBeReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToBeReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBeReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
