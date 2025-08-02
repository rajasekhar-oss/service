import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type SkillListing = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: 'do' | 'teach';
};

@Component({
  selector: 'app-skill-listing-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './skill-listing-card.component.html',
  styleUrls: ['./skill-listing-card.component.css']
})
export class SkillListingCardComponent {
  @Input() listing!: SkillListing;
}
