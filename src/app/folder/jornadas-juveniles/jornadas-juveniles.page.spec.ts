import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JornadasJuvenilesPage } from './jornadas-juveniles.page';

describe('JornadasJuvenilesPage', () => {
  let component: JornadasJuvenilesPage;
  let fixture: ComponentFixture<JornadasJuvenilesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JornadasJuvenilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
