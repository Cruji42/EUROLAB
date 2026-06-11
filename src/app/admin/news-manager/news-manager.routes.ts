import { Routes } from '@angular/router';
import { NewsListComponent } from './news-list.component';
import { NewsFormComponent } from './news-form.component';
import { AdminNewsService } from '../services/admin-news.service';

export const NEWS_MANAGER_ROUTES: Routes = [
  {
    path: '',
    providers: [AdminNewsService],
    children: [
      { path: '', component: NewsListComponent },
      { path: 'nueva', component: NewsFormComponent },
      { path: ':slug', component: NewsFormComponent }
    ]
  }
];
