export interface PaginationParams {
	page: number;
	pageSize?: number;
}

export const firstPageParams: PaginationParams = {
	page: 0,
	pageSize: 10
};
