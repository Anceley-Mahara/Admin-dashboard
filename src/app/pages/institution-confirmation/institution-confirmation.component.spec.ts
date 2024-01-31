import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionConfirmationComponent } from './institution-confirmation.component';

describe('InstitutionConfirmationComponent', () => {
  let component: InstitutionConfirmationComponent;
  let fixture: ComponentFixture<InstitutionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
