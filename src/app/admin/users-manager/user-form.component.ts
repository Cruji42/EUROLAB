import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsersService, AdminUser, AdminUserCreate, AdminUserUpdate } from '../services/admin-users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';
  showPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: AdminUsersService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.isEditMode = true;
      this.loadUser(this.userId);
    }
  }
  
  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: [''],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      changePassword: [false],
      is_active: [true]
    });
    
    // Listen for changePassword changes
    this.userForm.get('changePassword')?.valueChanges.subscribe(change => {
      const passwordControl = this.userForm.get('password');
      if (change) {
        passwordControl?.setValidators([Validators.required, Validators.minLength(8)]);
      } else {
        passwordControl?.clearValidators();
      }
      passwordControl?.updateValueAndValidity();
    });
  }
  
  private loadUser(id: number): void {
    this.loading = true;
    
    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this.patchFormValues(user);
        this.loading = false;
      },
      error: (error) => {
        this.error = `Error al cargar el usuario: ${error.message}`;
        this.loading = false;
        console.error('Error loading user', error);
      }
    });
  }
  
  private patchFormValues(user: AdminUser): void {
    this.userForm.patchValue({
      email: user.email,
      full_name: user.full_name,
      is_active: user.is_active
    });
  }
  
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }
    
    this.submitting = true;
    this.error = '';
    
    const formData = this.userForm.value;
    
    // Only include password if it's a new user or changePassword is checked
    if (this.isEditMode && !formData.changePassword) {
      delete formData.password;
    }
    
    // Remove the changePassword field as it's not part of the API
    delete formData.changePassword;
    
    if (this.isEditMode && this.userId) {
      // Update existing user
      this.usersService.updateUser(this.userId, formData as AdminUserUpdate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/usuarios']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al actualizar el usuario: ${error.message}`;
          console.error('Error updating user', error);
        }
      });
    } else {
      // Create new user
      this.usersService.createUser(formData as AdminUserCreate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/usuarios']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al crear el usuario: ${error.message}`;
          console.error('Error creating user', error);
        }
      });
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  // Helper for template
  getFormControl(name: string) {
    return this.userForm.get(name);
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
