import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminNewsService, NewsPost } from '../services/admin-news.service';

@Component({
  selector: 'app-news-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-delete-modal.component.html',
  styleUrls: ['./news-delete-modal.component.scss']
})
export class NewsDeleteModalComponent {
  @Input() post!: NewsPost;
  deleting = false;
  error = '';
  
  constructor(
    public activeModal: NgbActiveModal,
    private newsService: AdminNewsService
  ) {}
  
  confirmDelete(): void {
    this.deleting = true;
    this.error = '';
    
    this.newsService.deleteNews(this.post.id).subscribe({
      next: () => {
        this.deleting = false;
        this.activeModal.close('deleted');
      },
      error: (error) => {
        this.deleting = false;
        this.error = `Error al eliminar la noticia: ${error.message}`;
        console.error('Error deleting news post', error);
      }
    });
  }
  
  dismiss(): void {
    this.activeModal.dismiss();
  }
}
