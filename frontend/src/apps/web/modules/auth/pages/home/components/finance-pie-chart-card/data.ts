import { useIntl } from "react-intl";

export const usePieChartData = () => {
	const intl = useIntl();
	return [
		{
			name: intl.formatMessage({ id: "dashboard.pie-chart.status.available" }),
			value: 400
		},
		{
			name: intl.formatMessage({ id: "dashboard.pie-chart.status.reserved" }),
			value: 200
		},
		{
			name: intl.formatMessage({ id: "dashboard.pie-chart.status.rented" }),
			value: 600
		},
		{
			name: intl.formatMessage({
				id: "dashboard.pie-chart.status.maintenance"
			}),
			value: 150
		},
		{
			name: intl.formatMessage({ id: "dashboard.pie-chart.status.vacant" }),
			value: 250
		}
	];
};

export const PIE_CHART_COLORS = [
	"#C2EEDE",
	"#9CC5B6",
	"#7C9D91",
	"#5D776E",
	"#40534C"
];
