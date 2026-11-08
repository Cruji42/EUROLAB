import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminRecipientsService, ContactRecipient } from '../services/admin-recipients.service';

@Component({
  selector: 'app-recipient-delete-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './recipient-delete-modal.component.html'
})
export class RecipientDeleteModalComponent {
  @Input() recipient!: ContactRecipient;
  deleting = false;
  error = '';
  private translate = inject(TranslateService);

  constructor(
    public activeModal: NgbActiveModal,
    private recipientsService: AdminRecipientsService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';

    this.recipientsService.deleteRecipient(this.recipient.id).subscribe({
      next: () => {
        this.deleting = false;
        this.activeModal.close('deleted');
      },
      error: (error) => {
        this.deleting = false;
        this.error = this.translate.instant('admin.notifications.errors.deleteFailed', { message: error.message });
        console.error('Error deleting recipient', error);
      }
    });
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
