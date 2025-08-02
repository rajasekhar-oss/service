import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Booking = {
  id: number;
  skillId: number;
  seekerId: number;
  providerId: number;
  date: string;
  status: string;
};

type Skill = {
  id: number;
  title: string;
  type: 'do' | 'teach';
  imageUrl: string;
  price: number;
};

type User = {
  id: number;
  name: string;
  photoUrl?: string;
  role: string;
  phone?: string;
};

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent {
  booking: Booking | null = null;
  skill: Skill | null = null;
  seeker: User | null = null;
  provider: User | null = null;
  loading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Booking>(`http://localhost:3000/bookings/${id}`).subscribe(bk => {
      this.booking = bk;
      this.http.get<Skill>(`http://localhost:3000/skills/${bk.skillId}`).subscribe(sk => {
        this.skill = sk;
      });
      this.http.get<User>(`http://localhost:3000/users/${bk.seekerId}`).subscribe(seeker => {
        this.seeker = seeker;
      });
      this.http.get<User>(`http://localhost:3000/users/${bk.providerId}`).subscribe(provider => {
        this.provider = provider;
        this.loading = false;
      });
    });
  }
}
