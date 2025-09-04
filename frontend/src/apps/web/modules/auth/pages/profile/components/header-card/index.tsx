import { UserOutlined } from "@ant-design/icons";
import { Account } from "@core/domain/models/account";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { Avatar, Card, Flex, Typography } from "antd";

const { Title, Text } = Typography;

interface Props {
	account: Account;
}

const styles = {
	headerCard: css`
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		background: linear-gradient(
			135deg,
			${THEME_COLORS.PRIMARY_COLOR} 0%,
			${THEME_COLORS.SECONDARY_COLOR} 100%
		);
		color: white;
		overflow: hidden;
		position: relative;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
			pointer-events: none;
		}
	`,
	avatar: css`
		width: 120px;
		height: 120px;
		font-size: 48px;
		background: rgba(255, 255, 255, 0.2);
		border: 4px solid rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	`,
	userName: css`
		color: white !important;
		font-size: 24px;
		font-weight: 700;
		margin-bottom: 0.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	`,
	userEmail: css`
		color: #cfcfcfff;
		font-size: 18px;
		margin-bottom: 1rem;
	`
};

const HeaderCard = ({ account }: Props) => {
	return (
		<Card css={styles.headerCard}>
			<Flex align="center" justify="flex-start" gap={20}>
				<Avatar css={styles.avatar} icon={<UserOutlined />} size={120} />
				<Flex vertical gap={0.5}>
					<Title level={4} css={styles.userName}>
						{account.username}
					</Title>
					<Text css={styles.userEmail}>{account.email}</Text>
				</Flex>
			</Flex>
		</Card>
	);
};

export default HeaderCard;
