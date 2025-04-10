import { useEffect, useState } from "react";
import { Table } from "antd";

import BoardLayout from "@web/components/board-layout";
import BoardPageHeader from "../home/components/finance-bar-panel";
import { useListProperties } from "@web/lib/contexts/property/hooks";
import { Property } from "@core/domain/models/property";
import { tableFields } from "./data";
import PageHeaderFilters from "./components/page-header-filters";
import PageHeaderActions from "./components/page-header-actions";

const PAGE_SIZE = 8;

const PropertiesPage = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);

	const listProperties = useListProperties();

	useEffect(() => {
		const fetchProperties = async () => {
			const response = await listProperties();
			if (response) {
				setProperties(response);
			}
		};

		fetchProperties();
	}, [listProperties]);

	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		}
	};

	return (
		<BoardLayout>
			<BoardPageHeader
				title="Properties"
				prefix={<PageHeaderFilters />}
				extra={<PageHeaderActions />}
			/>
			<Table
				columns={tableFields}
				dataSource={properties}
				rowKey="id"
				pagination={{ pageSize: PAGE_SIZE }}
				rowSelection={rowSelection}
			/>
		</BoardLayout>
	);
};

PropertiesPage.route = "/properties";

export default PropertiesPage;
