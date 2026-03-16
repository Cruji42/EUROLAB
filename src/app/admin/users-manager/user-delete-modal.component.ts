import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersService, AdminUser } from '../services/admin-users.service';

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent {
  @Input() user!: AdminUser;
  deleting = false;
  error = '';
  
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
        this.error = `Error al eliminar el usuario: ${error.message}`;
        console.error('Error deleting user', error);
      }
    });
  }
  
  dismiss(): void {
    this.activeModal.dismiss();
  }
}
