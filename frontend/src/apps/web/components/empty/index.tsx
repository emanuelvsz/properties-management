import { Empty as AntdEmpty } from "antd";
import { useIntl } from "react-intl";

const Empty = () => {
	const intl = useIntl();

	return (
		<AntdEmpty
			description={intl.formatMessage({ id: "component.empty.description" })}
			image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
		/>
	);
};

export default Empty;
