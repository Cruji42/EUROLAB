import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AdminTeamService, TeamMemberAdmin } from '../services/admin-team.service';
import { TeamDeleteModalComponent } from './team-delete-modal.component';
import { resolveAssetUrl } from '../../core/utils/asset-url';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  members: TeamMemberAdmin[] = [];
  filtered: TeamMemberAdmin[] = [];
  loading = true;
  searchTerm = '';
  private translate = inject(TranslateService);

  constructor(
    private teamService: AdminTeamService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.teamService.getAllMembers().subscribe({
      next: (data) => { this.members = data; this.filtered = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = term
      ? this.members.filter(m =>
          m.name.toLowerCase().includes(term) ||
          (m.translations.es.role ?? '').toLowerCase().includes(term))
      : this.members;
  }

  openDeleteModal(member: TeamMemberAdmin): void {
    const ref = this.modalService.open(TeamDeleteModalComponent);
    ref.componentInstance.member = member;
    ref.result.then(
      (result) => { if (result === 'deleted') this.load(); },
      () => {}
    );
  }

  getStatusClass(member: TeamMemberAdmin): string {
    return member.is_active ? 'bg-success' : 'bg-secondary';
  }

  getStatusText(member: TeamMemberAdmin): string {
    return this.translate.instant(member.is_active ? 'admin.team.list.active' : 'admin.team.list.inactive');
  }

  role(member: TeamMemberAdmin): string {
    return member.translations.es.role || member.translations.en.role || '';
  }

  photo(member: TeamMemberAdmin): string {
    return resolveAssetUrl(member.image_url) || 'assets/img/team/no-profile.png';
  }
}
