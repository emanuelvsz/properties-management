import { Card, Col, Flex, Typography } from "antd";
import { css } from "@emotion/react";
import { Property } from "@core/domain/models/property";

import PropertyCharacteristics from "./components/property-characteristics";

const { Text } = Typography;

const styles = {
	container: css`
		padding: 0 !important;
	`
};

interface Props {
	property: Property;
}

const DetailsRow = ({ property }: Props) => {
	return (
		<Card css={styles.container}>
			<Col span={24}>
				<Flex vertical gap={16}>
					<PropertyCharacteristics property={property} />
					{/* <Row gutter={16}>
						<PropertyImages property={property} />
						<PropertyMetrics property={property} />
					</Row> */}
					<Flex vertical gap={16}>
						<Text>{property.description}</Text>
					</Flex>
				</Flex>
			</Col>
		</Card>
	);
};

export default DetailsRow;
