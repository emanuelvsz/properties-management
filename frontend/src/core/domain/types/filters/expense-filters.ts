export interface ExpenseFilters {
	dateBy: "week" | "month" | "year";
	q?: string;
	payed?: boolean;
	orderBy?: "newest" | "oldest" | "value_high" | "value_low";
}

export type ExpenseFiltersOrderBy =
	| "newest"
	| "oldest"
	| "value_high"
	| "value_low";
