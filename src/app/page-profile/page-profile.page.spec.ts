import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProfilePage } from './page-profile.page';

describe('PageProfilePage', () => {
  let component: PageProfilePage;
  let fixture: ComponentFixture<PageProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
