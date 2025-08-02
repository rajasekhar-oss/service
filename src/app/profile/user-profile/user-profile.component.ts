import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Skill = {
  id: number;
  title: string;
  type: 'do' | 'teach';
  imageUrl: string;
  price: number;
  rating?: number;
  category?: string;
};

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: any = null;
  skills: Skill[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<any>(`http://localhost:3000/users/${id}`).subscribe(user => {
      this.user = user;
      if (user.role === 'provider' && user.skillsOffered?.length) {
        this.http.get<Skill[]>(`http://localhost:3000/skills?id=${user.skillsOffered.join(',')}`)
          .subscribe(skills => {
            this.skills = skills;
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    });
  }
}
