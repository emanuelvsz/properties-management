import { Col, Divider, Flex, Image, Row, Space, Tag, Typography } from "antd";
import { css } from "@emotion/react";

import { Property } from "@core/domain/models/property";
import { THEME_COLORS } from "@web/config/theme";
import bedIcon from "@web/assets/icons/fi-rs-bed.svg";
import raindropsIcon from "@web/assets/icons/fi-rs-raindrops.svg";
import { BiArea } from "react-icons/bi";
import { FormattedMessage } from "react-intl";

interface Props {
	property: Property;
}

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
	`
};

const DetailsRow = ({ property }: Props) => {
	return (
		<Row gutter={32}>
			<Col>
				<Flex vertical gap={30}>
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
					<Image
						css={styles.image}
						height={350}
						width={450}
						src="https://images.ctfassets.net/n2ifzifcqscw/3QRMlAcJFrYAEAbhziixZW/d4b9aa50215c5ea7a161b8a6b59f1974/hero-real-estate-facts-trends.jpeg"
					/>
				</Flex>
				<Flex vertical>
					<Text css={styles.sectionTitle}>
						<FormattedMessage id="page.property.component.details-row.description.title" />
					</Text>
					<Text>{property.description}</Text>
				</Flex>
			</Col>
		</Row>
	);
};

export default DetailsRow;
