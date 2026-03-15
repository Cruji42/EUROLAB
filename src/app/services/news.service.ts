import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NewsCategory, NewsPostCard, NewsPostDetail, NewsTag } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly apiUrl = `${environment.apiUrl}/noticias`;

  constructor(private http: HttpClient) {}

  getNews(params?: {
    skip?: number;
    limit?: number;
    categoria?: string;
    tag?: string;
    destacadas?: boolean;
  }): Observable<NewsPostCard[]> {
    let httpParams = new HttpParams();

    if (params?.skip !== undefined) {
      httpParams = httpParams.set('skip', params.skip);
    }
    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit);
    }
    if (params?.categoria) {
      httpParams = httpParams.set('categoria', params.categoria);
    }
    if (params?.tag) {
      httpParams = httpParams.set('tag', params.tag);
    }
    if (params?.destacadas !== undefined) {
      httpParams = httpParams.set('destacadas', params.destacadas);
    }

    return this.http.get<NewsPostCard[]>(this.apiUrl, { params: httpParams });
  }

  getNewsBySlug(slug: string): Observable<NewsPostDetail> {
    return this.http.get<NewsPostDetail>(`${this.apiUrl}/${slug}`);
  }

  getCategories(): Observable<NewsCategory[]> {
    return this.http.get<NewsCategory[]>(`${this.apiUrl}/categorias`);
  }

  getTags(): Observable<NewsTag[]> {
    return this.http.get<NewsTag[]>(`${this.apiUrl}/tags`);
  }
}
