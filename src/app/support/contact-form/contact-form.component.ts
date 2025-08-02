import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  form: FormGroup;
  submitted = false;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : {};
    this.form = this.fb.group({
      name: [userObj?.name || '', [Validators.required, Validators.maxLength(32)]],
      email: [userObj?.email || '', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      message: ['', [Validators.required, Validators.maxLength(600)]]
    });
  }

  send() {
    this.error = '';
    if (this.form.invalid) return;
    this.loading = true;
    const msgObj = { ...this.form.value, date: new Date().toISOString() };
    // Simulate API call to backend/messages or support endpoint
    this.http.post('http://localhost:3000/supportMessages', msgObj).subscribe(() => {
      this.submitted = true;
      this.loading = false;
      this.form.reset();
    }, () => {
      this.error = 'Message failed to send. Try again later!';
      this.loading = false;
    });
  }
}
