import { Property } from "@core/domain/models/property";
import { css } from "@emotion/react";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import { AiOutlinePercentage } from "react-icons/ai";
import {
	RiMoneyDollarCircleLine,
	RiPieChart2Line,
	RiTimeLine
} from "react-icons/ri";
import { useIntl } from "react-intl";

const { Title, Text } = Typography;

const styles = {
	clearWhitespaces: css`
		margin: 0 !important;
		padding: 0 !important;
		line-height: 1 !important;
	`,
	card: css`
		display: flex;
		justify-content: left;
		align-items: center;
		height: fit-content;
		border-radius: 6px;
		gap: 5px;
		box-shadow: none !important;
		padding: 0 !important;
	`,
	title: css`
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	`
};

interface Props {
	property: Property;
}

const PropertyMetrics = ({ property }: Props) => {
	const intl = useIntl();
	const yearlyGains = property.rent * 12;
	const totalGains = 82000;
	const occupancyRate = 95;
	const paybackPeriod = (200000 / yearlyGains).toFixed(1);
	const monthlyROI = ((property.rent / 200000) * 100).toFixed(2);

	return (
		<Col flex="40%">
			<Row>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip
							title={intl.formatMessage({
								id: "page.property.metrics.yearly-gains.tooltip"
							})}
						>
							<Text css={styles.title}>
								<RiMoneyDollarCircleLine />{" "}
								{intl.formatMessage({
									id: "page.property.metrics.yearly-gains.title"
								})}
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							${yearlyGains.toLocaleString()}
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip
							title={intl.formatMessage({
								id: "page.property.metrics.total-gains.tooltip"
							})}
						>
							<Text css={styles.title}>
								<RiMoneyDollarCircleLine />{" "}
								{intl.formatMessage({
									id: "page.property.metrics.total-gains.title"
								})}
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							${totalGains.toLocaleString()}
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip
							title={intl.formatMessage({
								id: "page.property.metrics.monthly-roi.tooltip"
							})}
						>
							<Text css={styles.title}>
								<AiOutlinePercentage />{" "}
								{intl.formatMessage({
									id: "page.property.metrics.monthly-roi.title"
								})}
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{monthlyROI}%
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip
							title={intl.formatMessage({
								id: "page.property.metrics.occupancy-rate.tooltip"
							})}
						>
							<Text css={styles.title}>
								<RiPieChart2Line />{" "}
								{intl.formatMessage({
									id: "page.property.metrics.occupancy-rate.title"
								})}
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{occupancyRate}%
						</Title>
					</Card>
				</Col>
				<Col span={24}>
					<Card bordered={false} css={styles.card}>
						<Tooltip
							title={intl.formatMessage({
								id: "page.property.metrics.payback-period.tooltip"
							})}
						>
							<Text css={styles.title}>
								<RiTimeLine />{" "}
								{intl.formatMessage({
									id: "page.property.metrics.payback-period.title"
								})}
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{paybackPeriod}{" "}
							{intl.formatMessage({
								id: "page.property.metrics.payback-period.unit"
							})}
						</Title>
					</Card>
				</Col>
			</Row>
		</Col>
	);
};

export default PropertyMetrics;
