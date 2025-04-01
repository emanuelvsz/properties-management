import { Row, Spin } from "antd";
import { PropsWithChildren } from "react";

interface Props {
	loading?: boolean;
}

const LoadingContent = ({ children, loading }: PropsWithChildren<Props>) => {
	if (loading) {
		return (
			<Row align="middle" justify="center">
				<Spin />
			</Row>
		);
	}
	return children as JSX.Element;
};

export default LoadingContent;
