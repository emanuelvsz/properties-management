import { Flex, Typography } from "antd";
import { PropsWithChildren, ReactNode } from "react";
import { useIntl } from "react-intl";

interface Props {
	className?: string;
	label?: string;
	valueIsFacultative?: boolean;
}

const Text = ({
	children,
	className,
	label,
	valueIsFacultative = false
}: PropsWithChildren<Props>) => {
	const intl = useIntl();
	let content: ReactNode = children;
	if (
		!children ||
		(typeof children === "string" &&
			children.length === 0 &&
			valueIsFacultative)
	) {
		content = intl.formatMessage({ id: "component.text.empty" });
	}

	return (
		<Flex className={className} vertical>
			{label && <Typography.Text>{label}</Typography.Text>}
			<Typography.Paragraph>{content}</Typography.Paragraph>
		</Flex>
	);
};

export default Text;
