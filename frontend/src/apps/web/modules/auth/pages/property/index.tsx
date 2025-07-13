import { useEffect, useState, useRef } from "react";
import { Breadcrumb, Flex, Spin, Typography, Tabs } from "antd";
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
import { FormattedMessage, useIntl } from "react-intl";
import ContractListRow from "./components/contract-list-row";
import InventoryListRow from "./components/inventory-list-row";
import { Pagination } from "@core/domain/models/pagination";
import { InventoryItem } from "@core/domain/models/inventory/inventory-item";

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

	const intl = useIntl();
	const [property, setProperty] = useState<Property | null>(null);
	const [expensePagination, setExpensePagination] = useState<
		Pagination<Expense>
	>(new Pagination<Expense>(1, 10, 0, 0, []));
	const [inventoryPagination, setInventoryPagination] = useState<
		Pagination<InventoryItem>
	>(new Pagination<InventoryItem>(1, 10, 0, 0, []));
	const [loading, setLoading] = useState(true);
	const [loadingExpenses, setLoadingExpenses] = useState(true);
	const [loadingInventory, setLoadingInventory] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [inventorySearchParams, setInventorySearchParams] = useSearchParams();
	const didMountRef = useRef(false);

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
		} finally {
			setLoading(false);
		}
	};

	const handleListInventory = async (page?: number) => {
		if (!id) return;

		const q = inventorySearchParams.get("q") ?? "";
		const categoryId = inventorySearchParams.get("category") ?? "";
		const condition = inventorySearchParams.get("condition") ?? "";

		const pageParam = page || 1;
		try {
			setLoadingInventory(true);

			const searchParams = new URLSearchParams();
			if (categoryId) searchParams.append("category_id", categoryId);
			if (q) searchParams.append("q", q);
			if (condition) searchParams.append("condition", condition);
			if (pageParam) searchParams.append("page", pageParam.toString());

			const response = await fetch(
				`${import.meta.env.VITE_WEB_API_URL}/properties/${id}/inventory/?${searchParams.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("access_token")}`,
						"Content-Type": "application/json"
					}
				}
			);

			if (response.ok) {
				const data = await response.json();
				const pagination = new Pagination<InventoryItem>(
					data.page,
					data.page_size,
					data.count,
					data.total,
					data.data.map((item: any) => ({
						id: item.id,
						property: item.property,
						propertyTitle: item.property_title,
						propertyCode: item.property_code,
						category: {
							id: item.category.id,
							name: item.category.name,
							description: item.category.description
						},
						name: item.name,
						description: item.description,
						quantity: item.quantity,
						condition: item.condition,
						brand: item.brand,
						model: item.model,
						serialNumber: item.serial_number,
						purchaseDate: item.purchase_date,
						purchasePrice: item.purchase_price,
						notes: item.notes
					}))
				);
				setInventoryPagination(pagination);
			} else {
				console.error("Erro na API:", response.status);
			}
		} catch (error) {
			console.error("Erro ao buscar inventário do imóvel:", error);
		} finally {
			setLoadingInventory(false);
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

	const handleInventorySearchChange = (value: string) => {
		const newParams = new URLSearchParams(inventorySearchParams);
		if (value) {
			newParams.set("q", value);
		} else {
			newParams.delete("q");
		}
		setInventorySearchParams(newParams);
	};

	const handleInventoryCategoryChange = (value: string) => {
		const newParams = new URLSearchParams(inventorySearchParams);
		if (value) {
			newParams.set("category", value);
		} else {
			newParams.delete("category");
		}
		setInventorySearchParams(newParams);
	};

	const handleInventoryConditionChange = (value: string) => {
		const newParams = new URLSearchParams(inventorySearchParams);
		if (value) {
			newParams.set("condition", value);
		} else {
			newParams.delete("condition");
		}
		setInventorySearchParams(newParams);
	};

	useEffect(() => {
		if (!id) return;

		const fetchPropertyData = async () => {
			try {
				setLoading(true);
				const result = await listByID(id);
				setProperty(result);
			} catch (error) {
			} finally {
				setLoading(false);
			}
		};

		fetchPropertyData();
	}, [id, listByID]);

	useEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			handleListExpenses();
			return;
		}
		handleListExpenses();
	}, [searchParams]);

	useEffect(() => {
		if (!didMountRef.current) {
			didMountRef.current = true;
			handleListInventory();
			return;
		}
		handleListInventory();
	}, [inventorySearchParams]);

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

			<Tabs
				defaultActiveKey="contracts"
				items={[
					{
						key: "contracts",
						label: intl.formatMessage({ id: "page.property.tab.contracts" }),
						children: <ContractListRow />
					},
					{
						key: "expenses",
						label: intl.formatMessage({ id: "page.property.tab.expenses" }),
						children: (
							<>
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
									title={intl.formatMessage({
										id: "page.property.expenses.title"
									})}
								/>
								<ChartListRow expenses={expensePagination?.items} />
							</>
						)
					},
					{
						key: "inventory",
						label: intl.formatMessage({ id: "page.inventory.tab.title" }),
						children: (
							<InventoryListRow
								pagination={inventoryPagination}
								loading={loadingInventory}
								onReload={handleListInventory}
								onSearchChange={handleInventorySearchChange}
								onCategoryChange={handleInventoryCategoryChange}
								onConditionChange={handleInventoryConditionChange}
								searchValue={inventorySearchParams.get("q") ?? ""}
								categoryValue={inventorySearchParams.get("category") ?? ""}
								conditionValue={inventorySearchParams.get("condition") ?? ""}
								hideActions={false}
							/>
						)
					}
				]}
			/>
		</Flex>
	);
};

PropertyPage.route = "/properties/:id?";

export default PropertyPage;
