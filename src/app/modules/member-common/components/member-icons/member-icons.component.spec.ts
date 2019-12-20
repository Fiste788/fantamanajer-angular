import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberIconsComponent } from './member-icons.component';

describe('MemberOptionComponent', () => {
  let component: MemberIconsComponent;
  let fixture: ComponentFixture<MemberIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberIconsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});