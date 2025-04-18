import { Property } from "@core/domain/models/property";
import { css } from "@emotion/react";
import { Col, Image } from "antd";

const styles = {
	image: css`
		border-radius: 6px;
		border: none;
		object-fit: cover;
	`
};
interface Props {
	property: Property;
}

const PropertyImages = ({ property }: Props) => {
	return (
		<Col>
			<Image
				css={styles.image}
				height={400}
				width={500}
				src="https://images.ctfassets.net/n2ifzifcqscw/3QRMlAcJFrYAEAbhziixZW/d4b9aa50215c5ea7a161b8a6b59f1974/hero-real-estate-facts-trends.jpeg"
			/>
		</Col>
	);
};

export default PropertyImages;
