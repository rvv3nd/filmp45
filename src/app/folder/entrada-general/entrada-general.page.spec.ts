import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntradaGeneralPage } from './entrada-general.page';

describe('EntradaGeneralPage', () => {
  let component: EntradaGeneralPage;
  let fixture: ComponentFixture<EntradaGeneralPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EntradaGeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
