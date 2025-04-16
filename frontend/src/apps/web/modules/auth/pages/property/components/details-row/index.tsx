import { Col, Divider, Flex, Image, Row, Space, Tag, Typography } from "antd";
import { css } from "@emotion/react";

import { Property } from "@core/domain/models/property";
import propertyDefaultImage from "@web/assets/images/prop.jpg";
import { THEME_COLORS } from "@web/config/theme";
import bedIcon from "@web/assets/icons/fi-rs-bed.svg";
import pencilIcon from "@web/assets/icons/fi-rs-pencil.svg";
import raindropsIcon from "@web/assets/icons/fi-rs-raindrops.svg";
import { BiArea } from "react-icons/bi";

interface Props {
	property: Property;
}

const { Title, Text } = Typography;

const styles = {
	image: css`
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 8px;
	`,
	iconInfo: css`
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 15px;
		font-weight: 500;
		color: ${THEME_COLORS.PRIMARY_COLOR};
	`,
	sectionTitle: css`
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: ${THEME_COLORS.PRIMARY_COLOR};
	`,
	propertyCode: css`
		font-size: 18px;
	`,
	icon: css`
		font-size: 18px;
	`
};

const DetailsRow = ({ property }: Props) => {
	return (
		<Row gutter={32}>
			<Col span={14}>
				<Image
					src={propertyDefaultImage}
					preview={false}
					css={styles.image}
					alt="Imagem do imóvel"
				/>
			</Col>
			<Col span={10}>
				<Flex vertical gap={8}>
					<Title level={3} style={{ margin: 0 }}>
						{property.title}{" "}
						<Text type="secondary" css={styles.propertyCode}>
							{property.formattedCode}
						</Text>
					</Title>

					<Divider />
					<Text css={styles.sectionTitle}>Location</Text>
					<Tag color="blue">{property.location}</Tag>
					<Text css={styles.sectionTitle}>Characteristics</Text>
					<Space size="large">
						<span css={styles.iconInfo}>
							<BiArea css={styles.icon} color={THEME_COLORS.PRIMARY_DARK_COLOR} />
							{property.surface} m²
						</span>
						<span css={styles.iconInfo}>
							<img src={bedIcon} alt="Bedrooms" width={18} />
							{property.bedrooms} Quartos
						</span>
						<span css={styles.iconInfo}>
							<img src={raindropsIcon} alt="Bathrooms" width={18} />
							{property.bathrooms} Banheiros
						</span>
					</Space>
					<Divider />
					<Text css={styles.sectionTitle}>Description</Text>
					<Text>{property.description}</Text>
				</Flex>
			</Col>
		</Row>
	);
};

export default DetailsRow;
