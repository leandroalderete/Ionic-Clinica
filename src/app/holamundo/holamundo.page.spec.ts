import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolamundoPage } from './holamundo.page';

describe('HolamundoPage', () => {
  let component: HolamundoPage;
  let fixture: ComponentFixture<HolamundoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HolamundoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
