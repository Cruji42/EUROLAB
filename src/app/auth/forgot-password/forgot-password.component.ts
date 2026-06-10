import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    this.authService.requestPasswordReset(this.f['email'].value).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'No se pudo enviar el correo. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }
}
