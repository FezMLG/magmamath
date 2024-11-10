
export type PaginateRequest = {
  perPage: number;
  page: number;
};

export type PaginateResponse<T> = {
  pageInfo: {
    total: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    perPage: number;
  };
  data: T[];
}
