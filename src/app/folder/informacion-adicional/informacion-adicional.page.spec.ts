import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformacionAdicionalPage } from './informacion-adicional.page';

describe('InformacionAdicionalPage', () => {
  let component: InformacionAdicionalPage;
  let fixture: ComponentFixture<InformacionAdicionalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InformacionAdicionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
