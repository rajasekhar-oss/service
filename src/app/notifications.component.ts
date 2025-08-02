import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Notification = {
  id: number;
  userId: number;
  message: string;
  type: string;
  date: string;
};

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifs: Notification[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return;
    const currentUser = JSON.parse(userRaw);
    this.http.get<Notification[]>(`http://localhost:3000/notifications?userId=${currentUser.id}&_sort=date&_order=desc`)
      .subscribe(nf => {
        this.notifs = nf;
        this.loading = false;
      });
  }
}
