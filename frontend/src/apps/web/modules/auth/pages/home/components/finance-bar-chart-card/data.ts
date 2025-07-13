import { useIntl } from "react-intl";

export const useBarChartData = () => {
	const intl = useIntl();
	return [
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.jan" }),
			expense: 4000,
			return: 2400,
			amt: 2400
		},
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.feb" }),
			expense: 3000,
			return: 1398,
			amt: 2210
		},
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.mar" }),
			expense: 2000,
			return: 9800,
			amt: 2290
		},
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.apr" }),
			expense: 2780,
			return: 3908,
			amt: 2000
		},
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.aug" }),
			expense: 1890,
			return: 4800,
			amt: 2181
		},
		{
			name: intl.formatMessage({ id: "dashboard.bar-chart.month.jun" }),
			expense: 2390,
			return: 3800,
			amt: 2500
		}
	];
};
