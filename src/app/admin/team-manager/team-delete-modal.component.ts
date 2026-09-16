import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminTeamService, TeamMemberAdmin } from '../services/admin-team.service';

@Component({
  selector: 'app-team-delete-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './team-delete-modal.component.html'
})
export class TeamDeleteModalComponent {
  @Input() member!: TeamMemberAdmin;
  deleting = false;
  error = '';
  private translate = inject(TranslateService);

  constructor(
    public activeModal: NgbActiveModal,
    private teamService: AdminTeamService
  ) {}

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';
    this.teamService.deleteMember(this.member.id).subscribe({
      next: () => { this.deleting = false; this.activeModal.close('deleted'); },
      error: (err) => { this.deleting = false; this.error = this.translate.instant('admin.team.errors.deleteFailed', { message: err.message }); }
    });
  }

  dismiss(): void { this.activeModal.dismiss(); }
}
