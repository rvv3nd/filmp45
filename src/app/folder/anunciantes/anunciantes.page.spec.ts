import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnunciantesPage } from './anunciantes.page';

describe('AnunciantesPage', () => {
  let component: AnunciantesPage;
  let fixture: ComponentFixture<AnunciantesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnunciantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
