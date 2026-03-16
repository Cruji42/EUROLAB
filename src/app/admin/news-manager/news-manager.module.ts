import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { NewsFormComponent } from './news-form.component';
import { NewsDeleteModalComponent } from './news-delete-modal.component';
import { AdminNewsService } from '../services/admin-news.service';

const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'nueva', component: NewsFormComponent },
  { path: ':id', component: NewsFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NewsListComponent,
    NewsFormComponent,
    NewsDeleteModalComponent
  ],
  providers: [
    AdminNewsService
  ]
})
export class NewsManagerModule { }
