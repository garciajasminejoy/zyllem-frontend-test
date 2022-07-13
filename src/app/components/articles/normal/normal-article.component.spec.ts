import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalArticleComponent } from './normal-article.component';

describe('NormalArticleComponent', () => {
  let component: NormalArticleComponent;
  let fixture: ComponentFixture<NormalArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
