import { css } from "@emotion/react";
import { Button, DatePicker, DatePickerProps, Flex, Spin } from "antd";

import FinanceCard, { FinanceCardProps } from "./components/finance-card";
import BoardPageHeader from "./components/finance-bar-panel";

import arrowDownIcon from "@web/assets/icons/fi-rs-chat-arrow-down.svg";
import arrowUpIcon from "@web/assets/icons/fi-rs-chat-arrow-grow.svg";
import moneyIcon from "@web/assets/icons/fi-rs-money.svg";
import shareIcon from "@web/assets/icons/fi-rs-share.svg";
import downloadIcon from "@web/assets/icons/fi-rs-download.svg";

import { THEME_COLORS } from "@web/config/theme";
import { useIntl } from "react-intl";
import { useListDashboardReturnSummary } from "@web/lib/contexts/dashboard/hooks";
import { useEffect, useState, useCallback } from "react";
import { ReturnsSummary } from "@core/domain/models/returns-summary";
import ExpenseListRow from "../property/components/expense-list-row";
import { Expense } from "@core/domain/models/expense";
import { ExpenseFilters } from "@core/domain/types/filters/expense-filters";
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
	const [expensePagination, setExpensePagination] = useState<
		Pagination<Expense>
	>(Pagination.empty<Expense>());
	const [loadingPage, setLoadingPage] = useState<boolean>(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const listReturnSummary = useListDashboardReturnSummary();
	const listExpenses = useListExpenses();

	const financeCardItems: FinanceCardProps[] = [
		{
			title: intl.formatMessage({ id: "dashboard.card.gross-return" }),
			extraColor: "green",
			extraValue: 0,
			value: returnSummary?.gross || 0,
			icon: <img src={moneyIcon} css={styles.cardIcon} />
		},
		{
			title: intl.formatMessage({ id: "dashboard.card.expenses" }),
			extraColor: "red",
			extraValue: 0,
			value: returnSummary?.expenses || 0,
			icon: <img src={arrowDownIcon} css={styles.cardIcon} />
		},
		{
			title: intl.formatMessage({ id: "dashboard.card.liquid-return" }),
			extraColor: "green",
			extraValue: 0,
			value: returnSummary?.liquid || 0,
			icon: <img src={arrowUpIcon} css={styles.cardIcon} />
		}
	];

	const handleDateChange: DatePickerProps["onChange"] = (date) => {
		if (!date) return;
		const newParams = new URLSearchParams(searchParams);
		newParams.set("month", date.format("YYYY-MM"));
		setSearchParams(newParams);
	};

	const fetchAllData = useCallback(async () => {
		if (returnSummary && expensePagination) {
			return;
		}
		setLoadingPage(true);
		try {
			const [summary, expenses] = await Promise.all([
				listReturnSummary(),
				listExpenses({
					payed: false,
					dateBy: searchParams.get("month") ?? undefined
				} as ExpenseFilters)
			]);
			setReturnSummary(summary);
			setExpensePagination(expenses);
		} catch (error) {
		} finally {
			setLoadingPage(false);
		}
	}, [searchParams]);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	useEffect(() => {
		const orderByParam = searchParams.get("order_by");
		if (!orderByParam) {
			const newParams = new URLSearchParams(searchParams);
			newParams.set("order_by", "newest");
			setSearchParams(newParams);
		}
	}, []);

	if (loadingPage) {
		return (
			<Flex
				css={styles.container}
				justify="center"
				align="center"
				style={{ minHeight: 400 }}
			>
				<Spin size="large" />
			</Flex>
		);
	}

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
						loading={loadingPage}
					/>
				))}
			</Flex>
			<ExpenseListRow
				pagination={expensePagination}
				loading={loadingPage}
				hideActions={true}
				title={intl.formatMessage({ id: "dashboard.pending-expenses" })}
				onReload={fetchAllData}
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
