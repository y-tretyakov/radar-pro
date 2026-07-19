export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface RepositorySearchOptions extends PaginationOptions {
  query?: string;
  language?: string;
  minStars?: number;
  sort?: 'stars' | 'updated' | 'name';
  order?: 'asc' | 'desc';
}

export interface StoreResult<T> {
  rows: T[];
  total?: number;
}
