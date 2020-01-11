import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperInfoComponent } from './shopper-info.component';

describe('ShopperInfoComponent', () => {
  let component: ShopperInfoComponent;
  let fixture: ComponentFixture<ShopperInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopperInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
