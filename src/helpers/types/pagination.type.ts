export interface IPagination<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  data: T[];
}
