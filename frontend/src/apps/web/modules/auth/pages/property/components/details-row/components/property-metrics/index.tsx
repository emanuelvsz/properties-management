import { Property } from "@core/domain/models/property";
import { css } from "@emotion/react";
import { Card, Col, Row, Tooltip, Typography } from "antd";
import { AiOutlinePercentage } from "react-icons/ai";
import {
	RiMoneyDollarCircleLine,
	RiPieChart2Line,
	RiTimeLine
} from "react-icons/ri";

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
						<Tooltip title="Valor estimado de lucro anual com o aluguel.">
							<Text css={styles.title}>
								<RiMoneyDollarCircleLine /> Yearly Gains
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							${yearlyGains.toLocaleString()}
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip title="Ganho total estimado ao longo do tempo.">
							<Text css={styles.title}>
								<RiMoneyDollarCircleLine /> Total Gains
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							${totalGains.toLocaleString()}
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip title="Retorno sobre investimento mensal.">
							<Text css={styles.title}>
								<AiOutlinePercentage /> Monthly ROI
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{monthlyROI}%
						</Title>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false} css={styles.card}>
						<Tooltip title="Taxa de ocupação média estimada.">
							<Text css={styles.title}>
								<RiPieChart2Line /> Occupancy Rate
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{occupancyRate}%
						</Title>
					</Card>
				</Col>
				<Col span={24}>
					<Card bordered={false} css={styles.card}>
						<Tooltip title="Tempo estimado para recuperar o valor investido.">
							<Text css={styles.title}>
								<RiTimeLine /> Payback Period
							</Text>
						</Tooltip>
						<Title level={5} css={styles.clearWhitespaces}>
							{paybackPeriod} years
						</Title>
					</Card>
				</Col>
			</Row>
		</Col>
	);
};

export default PropertyMetrics;
