import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperStatusComponent } from './shopper-status.component';

describe('ShopperStatusComponent', () => {
  let component: ShopperStatusComponent;
  let fixture: ComponentFixture<ShopperStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopperStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
