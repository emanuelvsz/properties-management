import { css } from "@emotion/react";
import { Button, Card, DatePicker, DatePickerProps, Flex } from "antd";

import FinanceCard, { FinanceCardProps } from "./components/finance-card";
import FinanceBarChartCard from "./components/finance-bar-chart-card";
import FinancePieChartCard from "./components/finance-pie-chart-card";
import BoardPageHeader from "./components/finance-bar-panel";

import arrowDownIcon from "@web/assets/icons/fi-rs-chat-arrow-down.svg";
import arrowUpIcon from "@web/assets/icons/fi-rs-chat-arrow-grow.svg";
import moneyIcon from "@web/assets/icons/fi-rs-money.svg";
import shareIcon from "@web/assets/icons/fi-rs-share.svg";
import downloadIcon from "@web/assets/icons/fi-rs-download.svg";

import { THEME_COLORS } from "@web/config/theme";
import { useIntl } from "react-intl";
import { useListDashboardReturnSummary } from "@web/lib/contexts/dashboard/hooks";
import { useEffect, useState } from "react";
import { ReturnsSummary } from "@core/domain/models/returns-summary";
import ExpenseListRow from "../property/components/expense-list-row";
import { Expense } from "@core/domain/models/expense";
import {
	ExpenseFilters,
	ExpenseFiltersOrderBy
} from "@core/domain/types/filters/expense-filters";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@core/domain/models/pagination";
import { useListExpenses } from "@web/lib/contexts/expense/hooks";

const styles = {
	container: css`
		padding-inline: 2rem;
		padding-block: 1rem;
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
	`,
	cardList: css`
		width: 100%;
	`,
	filterContainer: css`
		padding: 0 !important;
		margin: 0 !important;
		width: 100%;
		display: flex;
		align-items: center;
	`,
	filterText: css`
		margin: 0 !important;
		padding: 0 !important;
	`,
	filterInput: css`
		height: 35px;
	`,
	fitlerIcon: css`
		height: 17px;
	`,
	chartCard: css`
		width: 100%;
	`,
	cardIcon: css`
		height: 30px;
		color: ${THEME_COLORS.PRIMARY_COLOR} !important;
	`
};

const HomePage = () => {
	const intl = useIntl();
	const [returnSummary, setReturnSummary] = useState<ReturnsSummary | null>(
		null
	);
	const [loadingReturnSummary, setLoadingReturnSummary] =
		useState<boolean>(false);
	const [loadingExpenses, setLoadingExpenses] = useState<boolean>(false);
	const [expensePagination, setExpensePagination] = useState<
		Pagination<Expense>
	>(Pagination.empty<Expense>());
	const [searchParams, setSearchParams] = useSearchParams();
	const listReturnSummary = useListDashboardReturnSummary();
	const listExpenses = useListExpenses();

	const financeCardItems: FinanceCardProps[] = [
		{
			title: "Gross Return",
			extraColor: "green",
			extraValue: 0,
			value: returnSummary?.gross || 0,
			icon: <img src={moneyIcon} css={styles.cardIcon} />
		},
		{
			title: "Expenses",
			extraColor: "red",
			extraValue: 0,
			value: returnSummary?.expenses || 0,
			icon: <img src={arrowDownIcon} css={styles.cardIcon} />
		},
		{
			title: "Liquid Return",
			extraColor: "green",
			extraValue: 0,
			value: returnSummary?.liquid || 0,
			icon: <img src={arrowUpIcon} css={styles.cardIcon} />
		}
	];

	const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
		if (!date) return;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("month", date.format("YYYY-MM"));
		setSearchParams(newParams);
	};

	const handleFetchReturnSummary = async () => {
		setLoadingReturnSummary(true);
		const data = await listReturnSummary();
		setLoadingReturnSummary(false);
		setReturnSummary(data);
	};

	const handleFetchExpenses = async () => {
		const dateBy = searchParams.get("month") ?? undefined;
		const filters: ExpenseFilters = {
			payed: false,
			dateBy: dateBy
		} as ExpenseFilters;
		try {
			const response = await listExpenses(filters);
			handleFetchReturnSummary();
			setLoadingExpenses(false);
			if (!response) return;
			setExpensePagination(response);
		} catch (error) {
			console.error("Erro ao buscar despesas do imóvel:", error);
		} finally {
			setLoadingExpenses(false);
		}
	};

	useEffect(() => {
		handleFetchReturnSummary();
		handleFetchExpenses();
	}, [listReturnSummary, listExpenses]);

	useEffect(() => {
		const orderByParam = searchParams.get("order_by");
		if (!orderByParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("order_by", "newest");
			setSearchParams(newParams);
		}
	}, []);

	useEffect(() => {
		handleFetchExpenses();
	}, [searchParams]);

	return (
		<Flex css={styles.container} vertical gap={10} flex={1}>
			<BoardPageHeader
				title={intl.formatMessage({ id: "page.home.title" })}
				prefix={
					<DatePicker
						css={styles.filterInput}
						onChange={handleDateChange}
						picker="month"
					/>
				}
				extra={
					<Flex gap={10} justify="space-between">
						<Button
							css={styles.filterInput}
							icon={<img css={styles.fitlerIcon} src={downloadIcon} />}
						/>
						<Button
							css={styles.filterInput}
							icon={<img css={styles.fitlerIcon} src={shareIcon} />}
						/>
					</Flex>
				}
			/>
			<Flex gap={10} css={styles.cardList}>
				{financeCardItems.map((item, index) => (
					<FinanceCard
						key={index}
						title={item.title}
						extraColor={item.extraColor}
						extraValue={item.extraValue}
						value={item.value}
						icon={item.icon}
						loading={loadingReturnSummary}
					/>
				))}
			</Flex>
			<ExpenseListRow
				pagination={expensePagination}
				loading={loadingExpenses}
				hideActions={true}
				title="Pending Expenses"
				onReload={handleFetchExpenses}
			/>
			{/* <Flex gap={10} css={styles.cardList}>
				<FinanceBarChartCard />
				<FinancePieChartCard />
			</Flex> */}
		</Flex>
	);
};

HomePage.route = "/";

export default HomePage;
