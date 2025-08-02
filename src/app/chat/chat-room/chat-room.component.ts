import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

type Chat = {
  id: number;
  participants: number[];
  messages: number[];
};

type Message = {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  timestamp: string;
};

type User = {
  id: number;
  name: string;
  photoUrl?: string;
};

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  chat: Chat | null = null;
  messages: Message[] = [];
  currentUser: any = null;
  participant: User | null = null;
  chatId = '';
  sendForm: FormGroup;
  loading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.sendForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit() {
    const userRaw = localStorage.getItem('user');
    if (!userRaw) return;
    this.currentUser = JSON.parse(userRaw);
    this.chatId = this.route.snapshot.paramMap.get('id') || '';
    this.loadChat();
  }

  loadChat() {
    this.http.get<Chat>(`http://localhost:3000/chats/${this.chatId}`).subscribe(chat => {
      this.chat = chat;
      if (chat.participants.length) {
        const otherId = chat.participants.find((id) => id !== this.currentUser.id);
        this.http.get<User>(`http://localhost:3000/users/${otherId}`).subscribe(u => this.participant = u);
      }
      if (chat.messages?.length) {
        this.http.get<Message[]>(`http://localhost:3000/messages?id=${chat.messages.join(',')}&_sort=timestamp&_order=asc`)
          .subscribe(msgs => {
            this.messages = msgs;
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }

  sendMessage() {
    const content = this.sendForm.value.content?.trim();
    if (!content) return;
    const msg: Omit<Message, 'id'> = {
      chatId: parseInt(this.chatId, 10),
      senderId: this.currentUser.id,
      content,
      timestamp: new Date().toISOString()
    };
    this.http.post<Message>('http://localhost:3000/messages', msg).subscribe(sent => {
      // Update chat with new message id for demo/mock DB
      if (this.chat?.messages) {
        this.chat.messages.push(sent.id);
        this.http.patch(`http://localhost:3000/chats/${this.chatId}`, { messages: this.chat.messages }).subscribe();
      }
      this.messages.push(sent);
      this.sendForm.reset();
    });
  }
}
