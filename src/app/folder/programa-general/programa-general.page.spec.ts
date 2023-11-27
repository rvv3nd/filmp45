import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramaGeneralPage } from './programa-general.page';

describe('ProgramaGeneralPage', () => {
  let component: ProgramaGeneralPage;
  let fixture: ComponentFixture<ProgramaGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgramaGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
