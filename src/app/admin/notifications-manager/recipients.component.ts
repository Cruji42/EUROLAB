import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminRecipientsService, ContactRecipient } from '../services/admin-recipients.service';
import { RecipientDeleteModalComponent } from './recipient-delete-modal.component';

@Component({
  selector: 'app-recipients',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})
export class RecipientsComponent implements OnInit {
  recipients: ContactRecipient[] = [];
  loading = true;
  saving = false;
  error = '';
  private translate = inject(TranslateService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['']
  });

  constructor(
    private recipientsService: AdminRecipientsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadRecipients();
  }

  get activeCount(): number {
    return this.recipients.filter(r => r.is_active).length;
  }

  loadRecipients(): void {
    this.loading = true;
    this.recipientsService.getRecipients().subscribe({
      next: (recipients) => {
        this.recipients = recipients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recipients', error);
        this.loading = false;
      }
    });
  }

  addRecipient(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = '';
    const { email, name } = this.form.getRawValue();

    this.recipientsService.createRecipient({ email: email.trim(), name: name.trim() || undefined }).subscribe({
      next: (recipient) => {
        this.recipients = [...this.recipients, recipient];
        this.form.reset();
        this.saving = false;
      },
      error: (error: HttpErrorResponse) => {
        this.saving = false;
        this.error = this.translate.instant(
          error.status === 409 ? 'admin.notifications.errors.duplicate' : 'admin.notifications.errors.createFailed'
        );
        console.error('Error creating recipient', error);
      }
    });
  }

  toggleStatus(recipient: ContactRecipient): void {
    this.recipientsService.updateRecipient(recipient.id, { is_active: !recipient.is_active }).subscribe({
      next: () => {
        recipient.is_active = !recipient.is_active;
      },
      error: (error) => {
        console.error('Error toggling recipient status', error);
      }
    });
  }

  openDeleteModal(recipient: ContactRecipient): void {
    const modalRef = this.modalService.open(RecipientDeleteModalComponent);
    modalRef.componentInstance.recipient = recipient;

    modalRef.result.then(
      (result) => {
        if (result === 'deleted') {
          this.loadRecipients();
        }
      },
      () => {} // Dismissed
    );
  }
}
