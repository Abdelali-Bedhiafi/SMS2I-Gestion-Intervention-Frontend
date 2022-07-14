import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationOrdreMissionComponent } from './creation-ordre-mission.component';

describe('CreationOrdreMissionComponent', () => {
  let component: CreationOrdreMissionComponent;
  let fixture: ComponentFixture<CreationOrdreMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationOrdreMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
