import { css } from "@emotion/react";
import { Button, DatePicker, DatePickerProps, Flex } from "antd";

import shareIcon from "@web/assets/icons/fi-rs-share.svg";
import downloadIcon from "@web/assets/icons/fi-rs-download.svg";

const styles = {
	filterPanel: css`
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
	`
};

interface Props {
	title: string;
}

const FinanceBarPanel = ({ title }: Props) => {
	const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<Flex css={styles.filterPanel} justify="space-between">
			<Flex gap={15}>
				<h2 css={styles.filterText}>{title}</h2>
				<DatePicker
					css={styles.filterInput}
					onChange={onDateChange}
					picker="month"
				/>
			</Flex>
			<Flex gap={10}>
				<Button
					css={styles.filterInput}
					icon={<img css={styles.fitlerIcon} src={downloadIcon} />}
				/>
				<Button
					css={styles.filterInput}
					icon={<img css={styles.fitlerIcon} src={shareIcon} />}
				/>
			</Flex>
		</Flex>
	);
};

export default FinanceBarPanel;
