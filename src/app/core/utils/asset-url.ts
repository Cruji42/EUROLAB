import { environment } from '../../../environments/environment';

export function resolveAssetUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${environment.assetsBaseUrl}/${path.replace(/^\/+/, '')}`;
}
