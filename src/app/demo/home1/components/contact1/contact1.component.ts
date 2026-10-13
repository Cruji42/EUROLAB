import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ContactService } from '../../../../services/contact.service';

@Component({
  selector: 'app-contact1',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact1.component.html',
  styles: ``
})
export class Contact1Component {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private translate = inject(TranslateService);

  sending = false;

  contactForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    service_interest: [''],
    message: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant('views.contact.form.invalidTitle'),
        text: this.translate.instant('views.contact.form.invalidText'),
        confirmButtonText: this.translate.instant('views.contact.form.okButton')
      });
      return;
    }

    this.sending = true;
    const value = this.contactForm.getRawValue();
    this.contactService.sendMessage({
      first_name: value.first_name!.trim(),
      last_name: value.last_name!.trim(),
      email: value.email!.trim(),
      company: value.company?.trim() || null,
      service_interest: value.service_interest?.trim() || null,
      message: value.message!.trim()
    }).subscribe({
      next: () => {
        this.sending = false;
        this.contactForm.reset();
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('views.contact.form.successTitle'),
          text: this.translate.instant('views.contact.form.successText'),
          confirmButtonText: this.translate.instant('views.contact.form.okButton')
        });
      },
      error: () => {
        this.sending = false;
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('views.contact.form.errorTitle'),
          text: this.translate.instant('views.contact.form.errorText'),
          confirmButtonText: this.translate.instant('views.contact.form.okButton')
        });
      }
    });
  }
}
