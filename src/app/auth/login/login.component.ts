import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.error = null;
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { email, password } = this.loginForm.value;

    // Demo: Simulate login by checking a user in local JSON server
    this.http.get<any[]>(`http://localhost:3000/users?email=${email}`).subscribe(users => {
      if (users.length && password === '1234') { // Replace with real password check
        // Simulate login success: save to localStorage, redirect to dashboard based on role
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === 'provider') {
          this.router.navigate(['/dashboard/provider']);
        } else if (user.role === 'admin') {
          this.router.navigate(['/dashboard/admin']);
        } else {
          this.router.navigate(['/dashboard/seeker']);
        }
      } else {
        this.error = 'Invalid credentials';
      }
      this.loading = false;
    }, () => {
      this.error = 'Unable to connect to server.';
      this.loading = false;
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
