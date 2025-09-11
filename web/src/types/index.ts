export interface ShortUrl {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
  shortUrl: string;
}

export interface CreateShortUrlData {
  shortCode: string;
  originalUrl: string;
}

export interface ShortUrlFormData {
  originalUrl: string;
  shortCode: string;
}
