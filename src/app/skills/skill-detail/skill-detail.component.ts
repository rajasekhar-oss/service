import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

type Skill = {
  id: number;
  title: string;
  description: string;
  type: 'do' | 'teach';
  imageUrl: string;
  category: string;
  price: number;
  providerId: number;
  rating?: number;
  location?: string;
  schedule?: string[];
  availability?: string[];
  maxAttendees?: number;
};

type User = {
  id: number;
  name: string;
  photoUrl?: string;
  bio?: string;
};

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.css']
})
export class SkillDetailComponent {
  skill: Skill | null = null;
  provider: User | null = null;
  loading = true;
  bookingSuccess = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Skill>(`http://localhost:3000/skills/${id}`).subscribe(skill => {
      this.skill = skill;
      this.loading = false;
      this.http.get<User>(`http://localhost:3000/users/${skill.providerId}`).subscribe(p => {
        this.provider = p;
      });
    });
  }

  bookOrEnroll() {
    // In a real app, bring up calendar or booking form.
    // Here, we make a simple booking for the JSON mock.
    if (!this.skill) return;
    const userRaw = localStorage.getItem('user');
    if (!userRaw) { this.router.navigate(['/login']); return; }
    const seeker = JSON.parse(userRaw);
    const booking = {
      skillId: this.skill.id,
      seekerId: seeker.id,
      providerId: this.skill.providerId,
      date: new Date().toISOString(),
      status: 'confirmed'
    };
    this.http.post('http://localhost:3000/bookings', booking).subscribe(() => {
      this.bookingSuccess = true;
      setTimeout(() => this.bookingSuccess = false, 2200);
    });
  }
}
