import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorialesPage } from './editoriales.page';

describe('EditorialesPage', () => {
  let component: EditorialesPage;
  let fixture: ComponentFixture<EditorialesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditorialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
