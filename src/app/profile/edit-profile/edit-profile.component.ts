import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editForm: FormGroup;
  loading = false;
  saveMsg = '';
  error = '';
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public themeService: ThemeService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      bio: ['', [Validators.maxLength(120)]],
      location: ['', [Validators.maxLength(50)]],
      photoUrl: ['']
    });
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = JSON.parse(user);
    // Pre-fill form values
    this.editForm.patchValue({
      name: this.currentUser.name,
      bio: this.currentUser.bio || '',
      location: this.currentUser.location || '',
      photoUrl: this.currentUser.photoUrl || ''
    });
  }

  save() {
    this.error = '';
    if (this.editForm.invalid) return;
    this.loading = true;

    // Update local user and db.json
    const patch = { ...this.editForm.value };
    this.http.patch(`http://localhost:3000/users/${this.currentUser.id}`, patch).subscribe(() => {
      // Update localStorage to preserve theme and login state
      Object.assign(this.currentUser, patch);
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.saveMsg = 'Profile updated!';
      this.loading = false;
      setTimeout(() => this.saveMsg = '', 2200);
    }, () => {
      this.error = 'Failed to update profile.';
      this.loading = false;
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
