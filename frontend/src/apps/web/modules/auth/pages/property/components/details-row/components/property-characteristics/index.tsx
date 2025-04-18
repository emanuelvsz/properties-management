import { Property } from "@core/domain/models/property";
import { css } from "@emotion/react";
import { Flex, Space, Tag, Typography } from "antd";
import { BiArea } from "react-icons/bi";
import { FormattedMessage } from "react-intl";
import bedIcon from "@web/assets/icons/fi-rs-bed.svg";
import raindropsIcon from "@web/assets/icons/fi-rs-raindrops.svg";

const { Title, Text } = Typography;
const ICONS_SIZE = 18;

const styles = {
	icon: css`
		font-size: ${ICONS_SIZE}px;
	`,
	tag: css`
		width: fit-content;
	`,
	iconInfo: css`
		align-items: center;
		gap: 8px;
		font-weight: 500;
		color: #00000073;
		font-size: 15px;
	`
};

interface Props {
	property: Property;
}

const PropertyCharacteristics = ({ property }: Props) => {
	return (
		<Flex vertical gap={8}>
			<Title level={5} style={{ margin: 0 }}>
				{property.title} <Text type="secondary">{property.formattedCode}</Text>
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
	);
};

export default PropertyCharacteristics;
