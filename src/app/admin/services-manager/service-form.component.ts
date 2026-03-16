import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServicesService, ServiceCreate, ServiceUpdate } from '../services/admin-services.service';
import { ServiceDetail } from '../../models/service.model';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  serviceForm!: FormGroup;
  serviceId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: AdminServicesService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.serviceId = +idParam;
      this.isEditMode = true;
      this.loadService(this.serviceId);
    }
  }
  
  private initForm(): void {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      slug: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-z0-9-]+$/)]],
      breadcrumb: [''],
      hero_image_url: [''],
      body_p1: ['', Validators.required],
      body_p2: ['', Validators.required],
      sub_title: [''],
      sub_paragraph: [''],
      info_title: [''],
      info_paragraph: [''],
      desc_title: [''],
      desc_paragraph: [''],
      detail_title: [''],
      detail_paragraph: [''],
      card_hover_text: [''],
      card_icon_url: [''],
      meta_title: ['', Validators.maxLength(160)],
      meta_description: ['', Validators.maxLength(320)],
      is_active: [true],
      sort_order: [0],
      checks: this.fb.array([]),
      faqs: this.fb.array([])
    });
  }
  
  private loadService(id: number): void {
    this.loading = true;
    
    this.servicesService.getServiceById(id).subscribe({
      next: (service) => {
        this.patchFormValues(service);
        this.loading = false;
      },
      error: (error) => {
        this.error = `Error al cargar el servicio: ${error.message}`;
        this.loading = false;
        console.error('Error loading service', error);
      }
    });
  }
  
  private patchFormValues(service: ServiceDetail): void {
    this.serviceForm.patchValue({
      name: service.name,
      slug: service.slug,
      breadcrumb: service.breadcrumb,
      hero_image_url: service.hero_image_url,
      body_p1: service.body_p1,
      body_p2: service.body_p2,
      sub_title: service.sub_title,
      sub_paragraph: service.sub_paragraph,
      info_title: service.info_title,
      info_paragraph: service.info_paragraph,
      desc_title: service.desc_title,
      desc_paragraph: service.desc_paragraph,
      detail_title: service.detail_title,
      detail_paragraph: service.detail_paragraph,
      card_hover_text: service.card_hover_text,
      card_icon_url: service.card_icon_url,
      meta_title: service.meta_title,
      meta_description: service.meta_description,
      is_active: service.is_active,
      sort_order: service.sort_order
    });
    
    // Clear and rebuild form arrays
    this.checks.clear();
    service.checks.forEach(check => {
      this.addCheck(check.label, check.sort_order);
    });
    
    this.faqs.clear();
    service.faqs.forEach(faq => {
      this.addFaq(faq.question, faq.answer, faq.sort_order);
    });
  }
  
  get checks(): FormArray {
    return this.serviceForm.get('checks') as FormArray;
  }
  
  get faqs(): FormArray {
    return this.serviceForm.get('faqs') as FormArray;
  }
  
  addCheck(label: string = '', sortOrder: number = 0): void {
    this.checks.push(
      this.fb.group({
        label: [label, Validators.required],
        sort_order: [sortOrder]
      })
    );
  }
  
  removeCheck(index: number): void {
    this.checks.removeAt(index);
  }
  
  addFaq(question: string = '', answer: string = '', sortOrder: number = 0): void {
    this.faqs.push(
      this.fb.group({
        question: [question, Validators.required],
        answer: [answer, Validators.required],
        sort_order: [sortOrder]
      })
    );
  }
  
  removeFaq(index: number): void {
    this.faqs.removeAt(index);
  }
  
  onSubmit(): void {
    if (this.serviceForm.invalid) {
      this.markFormGroupTouched(this.serviceForm);
      return;
    }
    
    this.submitting = true;
    this.error = '';
    
    const formData = this.serviceForm.value;
    
    if (this.isEditMode && this.serviceId) {
      // Update existing service
      this.servicesService.updateService(this.serviceId, formData as ServiceUpdate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/servicios']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al actualizar el servicio: ${error.message}`;
          console.error('Error updating service', error);
        }
      });
    } else {
      // Create new service
      this.servicesService.createService(formData as ServiceCreate).subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/admin/servicios']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = `Error al crear el servicio: ${error.message}`;
          console.error('Error creating service', error);
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
    return this.serviceForm.get(name);
  }
  
  // Generate slug from name
  generateSlug(): void {
    const nameControl = this.serviceForm.get('name');
    const slugControl = this.serviceForm.get('slug');
    
    if (nameControl && slugControl && nameControl.value && !slugControl.value) {
      const slug = nameControl.value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      slugControl.setValue(slug);
    }
  }
}
