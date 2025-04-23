import { useEffect, useState } from "react";
import { Breadcrumb, Flex, Spin, Typography } from "antd";
import { css } from "@emotion/react";
import { useParams, useSearchParams } from "react-router-dom";

import { THEME_COLORS } from "@web/config/theme";
import {
	useListPropertyExpenses,
	useListPropertyByID
} from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import ExpenseListRow from "./components/expense-list-row";
import { Expense } from "@core/domain/models/expense";
import ChartListRow from "./components/chart-list-row";
import DetailsRow from "./components/details-row";
import {
	ExpenseFilters,
	ExpenseFiltersOrderBy
} from "@core/domain/types/filters/expense-filters";
import { FormattedMessage } from "react-intl";
import ContractListRow from "./components/contract-list-row";
import { Pagination } from "@core/domain/models/pagination";

const { Text } = Typography;

const styles = {
	page: css`
		padding: 1rem 2rem 2rem 2rem;
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
		gap: 10px;
	`,
	breadcrumb: css`
		margin-block: 0 1rem;
		padding: 0;
		margin: 0 0 5px 0;
	`,
	content: css`
		background-color: ${THEME_COLORS.WHITE_COLOR};
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	`
};

const PropertyPage = () => {
	const { id } = useParams<{ id: string }>();

	const [property, setProperty] = useState<Property | null>(null);
	const [expensePagination, setExpensePagination] = useState<
		Pagination<Expense>
	>(new Pagination<Expense>(1, 10, 0, 0, []));
	const [loading, setLoading] = useState(true);
	const [loadingExpenses, setLoadingExpenses] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	const listByID = useListPropertyByID();
	const listPropertyExpenses = useListPropertyExpenses();

	const handleListExpenses = async (page?: number) => {
		if (!id) return;

		const q = searchParams.get("q") ?? "";
		const order_by = searchParams.get("order_by") ?? "newest";
		const payedParam = searchParams.get("payed");
		const payed =
			payedParam === "true" ? true : payedParam === "false" ? false : undefined;

		const filters: ExpenseFilters = {
			dateBy: "month",
			orderBy: order_by as ExpenseFiltersOrderBy,
			payed
		};

		if (q !== "") {
			filters.q = q;
		}
		const pageParam = page || 1;
		try {
			const result = await listPropertyExpenses(id, pageParam, filters);
			setLoadingExpenses(false);
			if (!result) return;
			setExpensePagination(result);
		} catch (error) {
			console.error("Erro ao buscar despesas do imóvel:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleExpensesSearchChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("q", value);
		} else {
			newParams.delete("q");
		}
		setSearchParams(newParams);
	};

	const handleExpensesPayedSelectChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("payed", value);
		} else {
			newParams.delete("payed");
		}
		setSearchParams(newParams);
	};

	const handleExpensesOrderByChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("order_by", value);
		} else {
			newParams.delete("order_by");
		}
		setSearchParams(newParams);
	};

	useEffect(() => {
		if (!id) return;

		const fetchPropertyData = async () => {
			try {
				setLoading(true);
				const result = await listByID(id);
				setProperty(result);
			} catch (error) {
				console.error("Erro ao buscar imóvel:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPropertyData();
	}, [id, listByID]);

	useEffect(() => {
		handleListExpenses();
	}, [searchParams]);

	useEffect(() => {
		const newParams = new URLSearchParams(searchParams);
		let updated = false;

		if (!searchParams.has("order_by")) {
			newParams.set("order_by", "newest");
			updated = true;
		}
		if (!searchParams.has("payed")) {
			newParams.set("payed", "false");
			updated = true;
		}

		if (updated) {
			// Atualiza apenas se necessário
			setSearchParams(newParams, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return (
			<Flex css={styles.page} justify="center" align="center">
				<Spin size="large" />
			</Flex>
		);
	}

	if (!property) {
		return null;
	}

	return (
		<Flex css={styles.page} vertical flex={1}>
			<Breadcrumb
				css={styles.breadcrumb}
				items={[
					{
						title: (
							<Text>
								<FormattedMessage id="page.property.breadcrumb.title.first" />
							</Text>
						),
						href: "/properties"
					},
					{
						title: (
							<Text strong>
								<FormattedMessage id="page.property.breadcrumb.title.second" />
							</Text>
						)
					}
				]}
			/>
			<DetailsRow property={property} />
			<ContractListRow />
			<ExpenseListRow
				pagination={expensePagination}
				loading={loadingExpenses}
				onReload={handleListExpenses}
				onSearchChange={handleExpensesSearchChange}
				onSelectChange={handleExpensesPayedSelectChange}
				onOrderByChange={handleExpensesOrderByChange}
				searchValue={searchParams.get("q") ?? ""}
				selectValue={searchParams.get("payed") ?? ""}
				hideActions={false}
				title="Expenses"
			/>

			<ChartListRow expenses={expensePagination?.items} />
		</Flex>
	);
};

PropertyPage.route = "/properties/:id?";

export default PropertyPage;
