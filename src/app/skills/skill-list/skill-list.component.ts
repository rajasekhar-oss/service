import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SkillListingCardComponent } from '../skill-listing-card/skill-listing-card.component';
import { ActivatedRoute } from '@angular/router';

type Skill = {
  id: number;
  title: string;
  description: string;
  type: 'do' | 'teach';
  imageUrl: string;
  category: string;
  price: number;
  rating?: number;
  location?: string;
};

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, SkillListingCardComponent],
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent {
  allSkills: Skill[] = [];
  skills: Skill[] = [];
  categories: string[] = [];
  search = '';
  filter = 'all';
  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.http.get<Skill[]>('http://localhost:3000/skills').subscribe(data => {
      this.allSkills = data;
      this.skills = data;
      this.categories = [...new Set(data.map(d => d.category))];
      this.loading = false;

      this.route.queryParams.subscribe(params => {
        if (params['type']) {
          this.filterType(params['type']);
        }
      });
    });
  }

  filterCategory(event: Event) {
    // Safely extract the value from the <select> element
    const value = (event.target as HTMLSelectElement).value;
    this.filter = value;
    this.applyFilters();
  }

  filterType(type: 'do'|'teach') {
    this.skills = this.allSkills.filter(s => s.type === type && (this.filter === 'all' || s.category === this.filter));
  }

  applyFilters() {
    let filt = this.allSkills;
    if (this.filter !== 'all') filt = filt.filter(s => s.category === this.filter);
    if (this.search.trim()) filt = filt.filter(s => s.title.toLowerCase().includes(this.search.trim().toLowerCase()));
    this.skills = filt;
  }
}
