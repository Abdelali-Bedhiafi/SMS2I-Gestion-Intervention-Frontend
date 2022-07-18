import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBonInterventionComponent } from './detail-bon-intervention.component';

describe('DetailBonInterventionComponent', () => {
  let component: DetailBonInterventionComponent;
  let fixture: ComponentFixture<DetailBonInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBonInterventionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBonInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
