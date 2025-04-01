import { Table as AntdTable, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";

import { getDefaultTableLocale } from "@web/lib/utils/table";

type Props<T = AnyObject> = TableProps & {
	onClickRow?(_: React.MouseEvent, __: T): void;
};

const Table = <T extends AnyObject = AnyObject>({
	locale,
	onClickRow,
	onRow,
	...rest
}: Props<T>) => (
	<AntdTable<T>
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...rest}
		locale={{
			...getDefaultTableLocale(),
			...locale
		}}
		onRow={(rowItem) => ({
			onClick: (event) => onClickRow?.(event, rowItem),
			...onRow
		})}
	/>
);

export type { Props as TableProps };

export default Table;
