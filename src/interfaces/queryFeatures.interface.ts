export interface IQueryFeatures {
  page: number;
  limit: number;
  skip: number;
  populate: string;
  fields: { [key: string]: number };
  filters: object;
  sort: { [key: string]: -1 | 1 };
  searchKey: string;
}

export interface IQueryResult<T> {
  data: Partial<T>[];
  total: number;
}
