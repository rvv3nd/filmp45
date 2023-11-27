import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoInvitadoPage } from './estado-invitado.page';

describe('EstadoInvitadoPage', () => {
  let component: EstadoInvitadoPage;
  let fixture: ComponentFixture<EstadoInvitadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstadoInvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
