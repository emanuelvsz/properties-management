import { useEffect, useState } from "react";
import { Breadcrumb, Flex, Spin, Typography } from "antd";
import { css } from "@emotion/react";
import { useParams, useSearchParams } from "react-router-dom";

import { THEME_COLORS } from "@web/config/theme";
import { useListPropertyByID } from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import ExpenseListRow from "./components/expense-list-row";
import { Expense } from "@core/domain/models/expense";
import { useListExpenses } from "@web/lib/contexts/expense/hooks";
import ChartListRow from "./components/chart-list-row";
import DetailsRow from "./components/details-row";
import { ExpenseFiltersOrderBy } from "@core/domain/types/filters/expense-filters";
import { FormattedMessage } from "react-intl";

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
	const listByID = useListPropertyByID();
	const listPropertyExpenses = useListExpenses();
	const [property, setProperty] = useState<Property | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingExpenses, setLoadingExpenses] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleListExpenses = async () => {
		if (!id) return;
		const q = searchParams.get("q") ?? "";
		const order_by = searchParams.get("order_by") ?? "newest";
		const payedParam = searchParams.get("payed");
		const payed =
			payedParam === "true" ? true : payedParam === "false" ? false : undefined;
		try {
			const result = await listPropertyExpenses(id, {
				dateBy: "month",
				q: q,
				orderBy: order_by as ExpenseFiltersOrderBy,
				payed: payed
			});
			setLoadingExpenses(false);
			if (!result) {
				return;
			}
			setExpenses(result);
		} catch (error) {
			console.error("Erro ao buscar despesas do imóvel:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearchChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("q", value);
		} else {
			newParams.delete("q");
		}
		setSearchParams(newParams);
	};

	const handlePayedSelectChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);
		if (value) {
			newParams.set("payed", value);
		} else {
			newParams.delete("payed");
		}
		setSearchParams(newParams);
	};

	// const handleOrderChange = (value: string) => {
	// 	const newParams = new URLSearchParams(searchParams);
	// 	if (value) {
	// 		newParams.set("order_by", value);
	// 	} else {
	// 		newParams.delete("order_by");
	// 	}
	// 	setSearchParams(newParams);
	// };

	useEffect(() => {
		const orderByParam = searchParams.get("order_by");
		if (!orderByParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("order_by", "newest");
			setSearchParams(newParams);
		}
	}, []);

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
			<ExpenseListRow
				expenses={expenses}
				loadingExpenses={loadingExpenses}
				onReloadExpenses={handleListExpenses}
				onSearchChange={handleSearchChange}
				onSelectChange={handlePayedSelectChange}
				searchValue={searchParams.get("q") ?? ""}
				selectValue={searchParams.get("payed") ?? ""}
			/>
			<ChartListRow expenses={expenses} />
		</Flex>
	);
};

PropertyPage.route = "/properties/:id?";

export default PropertyPage;
