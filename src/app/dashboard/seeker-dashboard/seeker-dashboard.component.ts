import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Booking = {
  id: number;
  skillId: number;
  providerId: number;
  date: string;
  status: string;
};

type Skill = {
  id: number;
  title: string;
  imageUrl: string;
  type: 'do' | 'teach';
};

@Component({
  selector: 'app-seeker-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent {
  currentUser: any = null;
  myBookings: Booking[] = [];
  bookingSkills: { [key: number]: Skill } = {};
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Simulate login state from localStorage
    const stored = localStorage.getItem('user');
    if (!stored) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(stored);
    this.fetchBookings();
  }

  fetchBookings() {
    this.http.get<Booking[]>(`http://localhost:3000/bookings?seekerId=${this.currentUser.id}&_sort=date&_order=desc`)
      .subscribe(bookings => {
        this.myBookings = bookings;
        const skillIds = bookings.map(b => b.skillId).join(',');
        if (skillIds.length) {
          this.http.get<Skill[]>(`http://localhost:3000/skills?id=${skillIds}`)
            .subscribe(skills => {
              this.bookingSkills = {};
              skills.forEach(s => this.bookingSkills[s.id] = s);
              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
  }

  goToSkill(id: number) {
    this.router.navigate(['/skills', id]);
  }

  goToBooking(id: number) {
    this.router.navigate(['/bookings', id]);
  }
}
