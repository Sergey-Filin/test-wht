import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsListNgxsComponent } from './cats-list-ngxs.component';

describe('CatsListNgxsComponent', () => {
  let component: CatsListNgxsComponent;
  let fixture: ComponentFixture<CatsListNgxsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatsListNgxsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatsListNgxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
