import { Table as AntdTable, TableProps as AntdTableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Empty } from "antd";

import { getDefaultTableLocale } from "@web/lib/utils/table";
import { css, Global } from "@emotion/react";

type Props<T = AnyObject> = AntdTableProps<T> & {
	onClickRow?(_: React.MouseEvent, __: T): void;
	selectedRowKeys?: React.Key[];
};

const Table = <T extends AnyObject = AnyObject>({
	locale,
	onClickRow,
	onRow,
	selectedRowKeys = [],
	rowClassName,
	...rest
}: Props<T>) => (
	<>
		<Global
			styles={css`
				.ant-table-thead .ant-table-selection-column .ant-checkbox-wrapper {
					margin-left: 15px;
				}

				.ant-table-row-selected {
					background-color: rgba(
						0,
						0,
						0,
						0.03
					) !important; /* ou algo como #f5f5f5 */
				}

				.ant-table-row-selected:hover > td,
				.ant-table-row-selected > td {
					background-color: rgba(0, 0, 0, 0.03) !important;
				}
			`}
		/>
		<AntdTable<T>
			{...rest}
			locale={{
				emptyText: <Empty description="No properties found" />,
				...getDefaultTableLocale(),
				...locale
			}}
			onRow={(rowItem) => ({
				onClick: (event) => onClickRow?.(event, rowItem),
				...onRow?.(rowItem)
			})}
			rowClassName={(record, index) => {
				const defaultClass = selectedRowKeys.includes(record.id)
					? "custom-row-selected"
					: "";
				const customClass =
					typeof rowClassName === "function"
						? rowClassName(record, index, 1)
						: "";
				return [defaultClass, customClass].filter(Boolean).join(" ");
			}}
		/>
	</>
);

export type { Props as TableProps };

export default Table;
