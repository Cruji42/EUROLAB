import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  success = false;
  error = '';
  token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    if (!this.token) {
      this.error = 'Token de recuperación no válido o expirado.';
    }

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid || !this.token) return;

    this.loading = true;
    this.error = '';

    this.authService.resetPassword(this.token, this.f['password'].value).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: err => {
        this.error = err.message || 'No se pudo restablecer la contraseña. El enlace puede haber expirado.';
        this.loading = false;
      }
    });
  }
}
