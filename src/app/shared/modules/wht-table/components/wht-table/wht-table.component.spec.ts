import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhtTableComponent } from './wht-table.component';

describe('WhtTableComponent', () => {
  let component: WhtTableComponent;
  let fixture: ComponentFixture<WhtTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhtTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhtTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
