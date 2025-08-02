import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillListingCardComponent } from './skill-listing-card.component';

describe('SkillListingCardComponent', () => {
  let component: SkillListingCardComponent;
  let fixture: ComponentFixture<SkillListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillListingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
