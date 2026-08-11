import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminUsersService, AdminUser } from '../services/admin-users.service';

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent {
  @Input() user!: AdminUser;
  deleting = false;
  error = '';
  private translate = inject(TranslateService);

  constructor(
    public activeModal: NgbActiveModal,
    private usersService: AdminUsersService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';

    this.usersService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.deleting = false;
        this.activeModal.close('deleted');
      },
      error: (error) => {
        this.deleting = false;
        this.error = this.translate.instant('admin.users.errors.deleteFailed', { message: error.message });
        console.error('Error deleting user', error);
      }
    });
  }
  
  dismiss(): void {
    this.activeModal.dismiss();
  }
}
