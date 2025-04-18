import { Card, Col, Flex, Image, Row, Typography } from "antd";
import { css } from "@emotion/react";
import { Property } from "@core/domain/models/property";

import { FormattedMessage } from "react-intl";
import PropertyCharacteristics from "./components/property-characteristics";
import PropertyMetrics from "./components/property-metrics";
import PropertyImages from "./components/property-images";

const { Text } = Typography;

const styles = {
	container: css`
		padding: 0 !important;
	`,
	title: css`
		font-size: 18px;
		font-weight: 600;
		color: #00000073;
	`
};

interface Props {
	property: Property;
}

const DetailsRow = ({ property }: Props) => {
	return (
		<Card css={styles.container}>
			<Col span={24}>
				<Flex vertical gap={30}>
					<PropertyCharacteristics property={property} />
					<Row gutter={16}>
						<PropertyImages property={property} />
						<PropertyMetrics property={property} />
					</Row>
					<Flex vertical gap={16}>
						<Text css={styles.title}>
							<FormattedMessage id="page.property.component.details-row.description.title" />
						</Text>
						<Text>{property.description}</Text>
					</Flex>
				</Flex>
			</Col>
		</Card>
	);
};

export default DetailsRow;
