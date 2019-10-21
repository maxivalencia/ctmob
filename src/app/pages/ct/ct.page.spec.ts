import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtPage } from './ct.page';

describe('CtPage', () => {
  let component: CtPage;
  let fixture: ComponentFixture<CtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
