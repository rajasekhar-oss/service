import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['seeker', Validators.required]
    });
  }

  submit() {
    this.error = null;
    if (this.registerForm.invalid) return;
    this.loading = true;
    const { name, email, password, role } = this.registerForm.value;
    // Check for existing email
    this.http.get<any[]>(`http://localhost:3000/users?email=${email}`).subscribe(users => {
      if (users.length) {
        this.error = 'Email already registered.';
        this.loading = false;
        return;
      }
      // Demo: password saved as field for mockup only (never store plain text like this in production!)
      const newUser = { name, email, password, role };
      this.http.post('http://localhost:3000/users', newUser).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/login']);
      }, () => {
        this.error = 'Unable to register. Try later.';
        this.loading = false;
      });
    }, () => {
      this.error = 'Unable to connect to server.';
      this.loading = false;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
