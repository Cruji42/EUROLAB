import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminSliderService } from '../services/admin-slider.service';
import { BannerSlide, BannerSlidePayload } from '../../models/slider.model';

@Component({
  selector: 'app-slider-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModalModule],
  templateUrl: './slider-manager.component.html',
  styleUrls: ['./slider-manager.component.scss']
})
export class SliderManagerComponent implements OnInit {
  @ViewChild('slideModal') slideModal!: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  slides: BannerSlide[] = [];
  loading = true;
  submitting = false;
  error = '';
  successMsg = '';

  slideForm!: FormGroup;
  editingSlide: BannerSlide | null = null;
  slideToDelete: BannerSlide | null = null;
  modalRef?: NgbModalRef;

  constructor(
    private sliderService: AdminSliderService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSlides();
  }

  private initForm(): void {
    this.slideForm = this.fb.group({
      sort_order:         [0, Validators.required],
      is_active:          [true],
      subtitle:           ['', Validators.required],
      title:              ['', Validators.required],
      description:        ['', Validators.required],
      image_url:          ['', Validators.required],
      btn_primary_text:   ['', Validators.required],
      btn_primary_link:   ['/service', Validators.required],
      btn_secondary_text: [''],
      btn_secondary_link: ['/contact'],
    });
  }

  loadSlides(): void {
    this.loading = true;
    this.sliderService.getAll().subscribe({
      next: (slides) => { this.slides = slides; this.loading = false; },
      error: () => { this.error = 'Error al cargar los slides.'; this.loading = false; }
    });
  }

  openCreate(): void {
    this.editingSlide = null;
    this.error = '';
    this.slideForm.reset({
      sort_order: this.slides.length + 1,
      is_active: true,
      btn_primary_link: '/service',
      btn_secondary_link: '/contact',
    });
    this.modalRef = this.modalService.open(this.slideModal, { size: 'lg', backdrop: 'static' });
  }

  openEdit(slide: BannerSlide): void {
    this.editingSlide = slide;
    this.error = '';
    this.slideForm.patchValue(slide);
    this.modalRef = this.modalService.open(this.slideModal, { size: 'lg', backdrop: 'static' });
  }

  openDelete(slide: BannerSlide): void {
    this.slideToDelete = slide;
    this.modalService.open(this.deleteModal);
  }

  saveSlide(): void {
    if (this.slideForm.invalid) {
      this.slideForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';
    const payload = this.slideForm.value as BannerSlidePayload;

    const obs = this.editingSlide
      ? this.sliderService.update(this.editingSlide.id, payload)
      : this.sliderService.create(payload);

    obs.subscribe({
      next: () => {
        this.submitting = false;
        this.modalRef?.close();
        this.showSuccess(this.editingSlide ? 'Slide actualizado.' : 'Slide creado.');
        this.loadSlides();
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error?.detail ?? 'Error al guardar el slide.';
      }
    });
  }

  confirmDelete(): void {
    if (!this.slideToDelete) return;
    this.sliderService.delete(this.slideToDelete.id).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.showSuccess('Slide eliminado.');
        this.loadSlides();
      },
      error: () => {
        this.modalService.dismissAll();
        this.error = 'Error al eliminar el slide.';
      }
    });
  }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => (this.successMsg = ''), 3000);
  }

  field(name: string) {
    return this.slideForm.get(name);
  }

  isInvalid(name: string): boolean {
    const c = this.field(name);
    return !!(c && c.invalid && c.touched);
  }
}
