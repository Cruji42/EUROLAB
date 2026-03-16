import { Component, OnInit } from '@angular/core';
import { AdminUsersService, AdminUser } from '../services/admin-users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteModalComponent } from './user-delete-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: AdminUser[] = [];
  filteredUsers: AdminUser[] = [];
  loading = true;
  searchTerm = '';
  
  constructor(
    private usersService: AdminUsersService,
    private modalService: NgbModal
  ) {}
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.loading = false;
      }
    });
  }
  
  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => 
      user.email.toLowerCase().includes(term) || 
      (user.full_name && user.full_name.toLowerCase().includes(term))
    );
  }
  
  openDeleteModal(user: AdminUser): void {
    const modalRef = this.modalService.open(UserDeleteModalComponent);
    modalRef.componentInstance.user = user;
    
    modalRef.result.then(
      (result) => {
        if (result === 'deleted') {
          this.loadUsers();
        }
      },
      () => {} // Dismissed
    );
  }
  
  toggleUserStatus(user: AdminUser): void {
    this.usersService.toggleUserStatus(user.id, !user.is_active).subscribe({
      next: () => {
        user.is_active = !user.is_active;
      },
      error: (error) => {
        console.error('Error toggling user status', error);
      }
    });
  }
}
