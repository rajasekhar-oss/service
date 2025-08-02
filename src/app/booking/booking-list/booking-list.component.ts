import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

type Booking = {
  id: number;
  skillId: number;
  providerId: number;
  seekerId: number;
  date: string;
  status: string;
};

type Skill = {
  id: number;
  title: string;
  type: 'do' | 'teach';
  imageUrl: string;
};

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent {
  bookings: Booking[] = [];
  skills: { [id: number]: Skill } = {};
  currentUser: any = null;
  loading = true;
  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(userRaw);

    let bookingsUrl = '';
    if (this.currentUser.role === 'provider') {
      bookingsUrl = `http://localhost:3000/bookings?providerId=${this.currentUser.id}&_sort=date&_order=desc`;
    } else {
      bookingsUrl = `http://localhost:3000/bookings?seekerId=${this.currentUser.id}&_sort=date&_order=desc`;
    }

    this.http.get<Booking[]>(bookingsUrl).subscribe(bookings => {
      this.bookings = bookings;
      const ids = Array.from(new Set(bookings.map(b => b.skillId)));
      if (ids.length) {
        this.http.get<Skill[]>(`http://localhost:3000/skills?id=${ids.join(',')}`)
          .subscribe(skills => {
            this.skills = {};
            skills.forEach(s => this.skills[s.id] = s);
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }

  goToBooking(id: number) {
    this.router.navigate(['/bookings', id]);
  }
}
