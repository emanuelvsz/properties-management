import { ColumnsType } from "antd/es/table";

export const tableFields: ColumnsType = [
	{
		title: "Title",
		dataIndex: "title",
		key: "title"
	},
	{
		title: "Bedrooms",
		dataIndex: "bedrooms",
		key: "bedrooms"
	},
	{
		title: "Bathrooms",
		dataIndex: "bathrooms",
		key: "bathrooms"
	},
	{
		title: "Surface (m²)",
		dataIndex: "surface",
		key: "surface"
	},
	{
		title: "Rent Price",
		dataIndex: "rent",
		key: "rent",
		render: (value: number) =>
			new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD"
			}).format(value)
	},
	{
		title: "Furnished",
		dataIndex: "furnished",
		key: "furnished",
		render: (value: boolean) => (value ? "Yes" : "No")
	}
];
