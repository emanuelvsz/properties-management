import {
	Card,
	Col,
	Flex,
	Image,
	Row,
	Space,
	Tag,
	Tooltip,
	Typography
} from "antd";
import { css } from "@emotion/react";
import { Property } from "@core/domain/models/property";
import bedIcon from "@web/assets/icons/fi-rs-bed.svg";
import raindropsIcon from "@web/assets/icons/fi-rs-raindrops.svg";
import { BiArea } from "react-icons/bi";
import {
	RiMoneyDollarCircleLine,
	RiPieChart2Line,
	RiTimeLine
} from "react-icons/ri";
import { AiOutlinePercentage } from "react-icons/ai";
import { FormattedMessage } from "react-intl";

const { Title, Text } = Typography;

const ICONS_SIZE = 18;

const styles = {
	iconInfo: css`
		align-items: center;
		gap: 8px;
		font-weight: 500;
		color: #00000073;
		font-size: 15px;
	`,
	sectionTitle: css`
		font-size: 18px;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #00000073;
	`,
	icon: css`
		font-size: ${ICONS_SIZE}px;
	`,
	tag: css`
		width: fit-content;
	`,
	image: css`
		border-radius: 6px;
		border: none;
		object-fit: cover;
	`,
	row: css`
		padding-inline: 1.5rem;
		display: flex;
		gap: 20px;
	`,
	clearWhitesapces: css`
		margin: 0 !important;
		padding: 0 !important;
		line-height: 1 !important;
	`,
	metricCard: css`
		display: flex;
		justify-content: left;
		align-items: center;
		height: fit-content;
		border-radius: 6px;
		gap: 5px;
		box-shadow: none !important;
		padding: 0 !important;
	`,
	metricTitle: css`
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	`
};

interface Props {
	property: Property;
}

const DetailsRow = ({ property }: Props) => {
	const yearlyGains = property.rent * 12;
	const totalGains = 82000; // mock
	const occupancyRate = 95;
	const paybackPeriod = (200000 / yearlyGains).toFixed(1);
	const monthlyROI = ((property.rent / 200000) * 100).toFixed(2);

	return (
		<Card>
			<Row gutter={32} css={styles.row}>
				<Col span={24}>
					<Flex vertical gap={30}>
						{/* Title and tags */}
						<Flex vertical gap={8}>
							<Title level={5} style={{ margin: 0 }}>
								{property.title}{" "}
								<Text type="secondary">{property.formattedCode}</Text>
							</Title>
							<Tag color="blue" css={styles.tag}>
								{property.location}
							</Tag>
							<Space size="large">
								<Flex css={styles.iconInfo}>
									<BiArea css={styles.icon} color="#00000073" />
									{property.surface} m²
								</Flex>
								<Flex css={styles.iconInfo}>
									<img src={bedIcon} alt="Bedrooms" width={ICONS_SIZE} />
									{property.bedrooms}{" "}
									<FormattedMessage id="page.property.component.details-row.bedrooms.title" />
								</Flex>
								<Flex css={styles.iconInfo}>
									<img src={raindropsIcon} alt="Bathrooms" width={ICONS_SIZE} />
									{property.bathrooms}{" "}
									<FormattedMessage id="page.property.component.details-row.bathrooms.title" />
								</Flex>
							</Space>
						</Flex>
						<Row gutter={16}>
							<Col flex="40%">
								<Image
									css={styles.image}
									height={350}
									width="100%"
									src="https://images.ctfassets.net/n2ifzifcqscw/3QRMlAcJFrYAEAbhziixZW/d4b9aa50215c5ea7a161b8a6b59f1974/hero-real-estate-facts-trends.jpeg"
								/>
							</Col>
							<Col flex="60%">
								<Row>
									<Col span={12}>
										<Card bordered={false} css={styles.metricCard}>
											<Tooltip title="Valor estimado de lucro anual com o aluguel.">
												<Text css={styles.metricTitle}>
													<RiMoneyDollarCircleLine /> Yearly Gains
												</Text>
											</Tooltip>
											<Title level={5} css={styles.clearWhitesapces}>
												${yearlyGains.toLocaleString()}
											</Title>
										</Card>
									</Col>
									<Col span={12}>
										<Card bordered={false} css={styles.metricCard}>
											<Tooltip title="Ganho total estimado ao longo do tempo.">
												<Text css={styles.metricTitle}>
													<RiMoneyDollarCircleLine /> Total Gains
												</Text>
											</Tooltip>
											<Title level={5} css={styles.clearWhitesapces}>
												${totalGains.toLocaleString()}
											</Title>
										</Card>
									</Col>
									<Col span={12}>
										<Card bordered={false} css={styles.metricCard}>
											<Tooltip title="Retorno sobre investimento mensal.">
												<Text css={styles.metricTitle}>
													<AiOutlinePercentage /> Monthly ROI
												</Text>
											</Tooltip>
											<Title level={5} css={styles.clearWhitesapces}>
												{monthlyROI}%
											</Title>
										</Card>
									</Col>
									<Col span={12}>
										<Card bordered={false} css={styles.metricCard}>
											<Tooltip title="Taxa de ocupação média estimada.">
												<Text css={styles.metricTitle}>
													<RiPieChart2Line /> Occupancy Rate
												</Text>
											</Tooltip>
											<Title level={5} css={styles.clearWhitesapces}>
												{occupancyRate}%
											</Title>
										</Card>
									</Col>
									<Col span={24}>
										<Card bordered={false} css={styles.metricCard}>
											<Tooltip title="Tempo estimado para recuperar o valor investido.">
												<Text css={styles.metricTitle}>
													<RiTimeLine /> Payback Period
												</Text>
											</Tooltip>
											<Title level={5} css={styles.clearWhitesapces}>
												{paybackPeriod} years
											</Title>
										</Card>
									</Col>
								</Row>
							</Col>
						</Row>

						<Flex vertical gap={16}>
							<Text css={styles.sectionTitle}>
								<FormattedMessage id="page.property.component.details-row.description.title" />
							</Text>
							<Text>{property.description}</Text>
						</Flex>
					</Flex>
				</Col>
			</Row>
		</Card>
	);
};

export default DetailsRow;
