import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

type Skill = {
  id: number;
  title: string;
  category: string;
  type: 'do' | 'teach';
  imageUrl: string;
  price: number;
};

type Booking = {
  id: number;
  skillId: number;
  seekerId: number;
  date: string;
  status: string;
};

type User = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule],
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent {
  currentUser: any = null;
  mySkills: Skill[] = [];
  myBookings: Booking[] = [];
  seekers: { [key: number]: User } = {};
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('user');
    if (!stored) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(stored);
    this.fetchSkills();
    this.fetchMyBookings();
  }

  fetchSkills() {
    this.http.get<Skill[]>(`http://localhost:3000/skills?providerId=${this.currentUser.id}`)
      .subscribe(skills => { this.mySkills = skills; });
  }

  fetchMyBookings() {
    this.http.get<Booking[]>(`http://localhost:3000/bookings?providerId=${this.currentUser.id}&_sort=date&_order=desc`)
      .subscribe(bookings => {
        this.myBookings = bookings;
        const seekerIds = Array.from(new Set(bookings.map(b => b.seekerId)));
        if (seekerIds.length) {
          this.http.get<User[]>(`http://localhost:3000/users?id=${seekerIds.join(',')}`)
            .subscribe(users => {
              this.seekers = {};
              users.forEach(u => this.seekers[u.id] = u);
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
  }

  addSkill() {
    this.router.navigate(['/skills'], { queryParams: { add: true } });
  }

  editSkill(id: number) {
    this.router.navigate(['/skills', id], { queryParams: { edit: true } });
  }

  goToBooking(id: number) {
    this.router.navigate(['/bookings', id]);
  }
}
