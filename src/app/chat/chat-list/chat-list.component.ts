import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

type Chat = {
  id: number;
  participants: number[];
  lastMessage: string;
  lastTimestamp: string;
};

type ChatWithOther = Chat & { otherId: number | null };

type User = {
  id: number;
  name: string;
  photoUrl?: string;
};

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {
  currentUser: any = null;
  myChats: ChatWithOther[] = [];
  users: { [id: number]: User } = {};
  loading = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(userRaw);

    this.http.get<Chat[]>('http://localhost:3000/chats?participants_like=' + this.currentUser.id).subscribe(chats => {
      this.myChats = chats
        .sort((a, b) => new Date(b.lastTimestamp).getTime() - new Date(a.lastTimestamp).getTime())
        .map(chat => ({
          ...chat,
          otherId: chat.participants.find((id: number) => id !== this.currentUser.id) ?? null
        }));

      const allOtherIds = Array.from(new Set(this.myChats.map(c => c.otherId).filter(id => id != null)));
      if (allOtherIds.length) {
        this.http.get<User[]>('http://localhost:3000/users?id=' + allOtherIds.join(',')).subscribe(users => {
          users.forEach(u => this.users[u.id] = u);
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }

  openChat(id: number) {
    this.router.navigate(['/chat', id]);
  }
}
