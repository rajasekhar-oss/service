import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkillListingCardComponent } from './skills/skill-listing-card/skill-listing-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type FeaturedListing = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: 'do' | 'teach';
};

type Testimonial = {
  quote: string;
  name: string;
};

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, SkillListingCardComponent, HttpClientModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  featuredListings: FeaturedListing[] = [];
  testimonials: Testimonial[] = [];
  loading = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<FeaturedListing[]>('http://localhost:3000/skills?_limit=4').subscribe(listings => {
      this.featuredListings = listings;
    });
    this.http.get<Testimonial[]>('http://localhost:3000/testimonials?_limit=3').subscribe(tests => {
      this.testimonials = tests;
      this.loading = false;
    });
  }

  goTo(tab: string) {
    switch(tab) {
      case 'service':
        this.router.navigate(['/skills'], { queryParams: { type: 'do' } });
        break;
      case 'learn':
        this.router.navigate(['/skills'], { queryParams: { type: 'teach' } });
        break;
      case 'provider':
        this.router.navigate(['/register'], { queryParams: { provider: true } });
        break;
    }
  }
}
