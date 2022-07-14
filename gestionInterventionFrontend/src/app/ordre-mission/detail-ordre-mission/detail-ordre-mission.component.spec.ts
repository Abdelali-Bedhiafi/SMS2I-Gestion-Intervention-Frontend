import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrdreMissionComponent } from './detail-ordre-mission.component';

describe('DetailOrdreMissionComponent', () => {
  let component: DetailOrdreMissionComponent;
  let fixture: ComponentFixture<DetailOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
