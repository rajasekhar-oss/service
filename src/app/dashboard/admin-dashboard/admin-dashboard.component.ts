import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  userCount = 0;
  providerCount = 0;
  seekerCount = 0;
  skillCount = 0;
  bookingCount = 0;
  reviewCount = 0;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      this.userCount = users.length;
      this.providerCount = users.filter(u => u.role === 'provider').length;
      this.seekerCount = users.filter(u => u.role === 'seeker').length;
    });
    this.http.get<any[]>('http://localhost:3000/skills').subscribe(skills => {
      this.skillCount = skills.length;
    });
    this.http.get<any[]>('http://localhost:3000/bookings').subscribe(bookings => {
      this.bookingCount = bookings.length;
    });
    this.http.get<any[]>('http://localhost:3000/reviews').subscribe(reviews => {
      this.reviewCount = reviews.length;
      this.loading = false;
    });
  }
}
