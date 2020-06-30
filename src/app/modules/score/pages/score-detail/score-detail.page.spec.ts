import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDetailPage } from './score-detail.page';

describe('ScoreDetailPage', () => {
  let component: ScoreDetailPage;
  let fixture: ComponentFixture<ScoreDetailPage>;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ScoreDetailPage],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    void expect(component)
      .toBeTruthy();
  });
});
