import { Empty as AntdEmpty } from "antd";

const Empty = () => (
	<AntdEmpty
		description="Nenhum dado encontrado."
		image={AntdEmpty.PRESENTED_IMAGE_SIMPLE}
	/>
);

export default Empty;
