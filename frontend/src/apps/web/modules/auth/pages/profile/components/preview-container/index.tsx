import {
	CalendarOutlined,
	CrownOutlined,
	EditOutlined,
	MailOutlined,
	UserOutlined
} from "@ant-design/icons";
import { Button, Flex, Tag, Typography } from "antd";
import { useIntl } from "react-intl";
import DetailsInfoItem from "../details-info-item";
import { THEME_COLORS } from "@web/config/theme";
import { css } from "@emotion/react";
import { Account } from "@core/domain/models/account";

const { Text } = Typography;

interface Props {
	account: Account;
	onEdit: () => void;
}

const styles = {
	infoGrid: css`
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
	`,
	editButton: css`
		background-color: ${THEME_COLORS.PRIMARY_COLOR};
		border: none;
		height: 35px;
		padding: 0 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		box-shadow: none;

		&:hover {
			background-color: ${THEME_COLORS.SECONDARY_COLOR};
		}
	`,
	roleTag: css`
		background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
		border: none;
		color: #8b6914;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
	`,
	userTag: css`
		background: linear-gradient(135deg, #6c757d 0%, #adb5bd 100%);
		border: none;
		color: white;
		font-weight: 600;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
	`
};

const PreviewContainer = ({ account, onEdit }: Props) => {
	const intl = useIntl();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
	};

	const getRoleDisplayName = () => {
		if (account?.isAdmin) {
			return intl.formatMessage({ id: "page.profile.role.admin" });
		}
		return intl.formatMessage({ id: "page.profile.role.user" });
	};

	const getRoleTag = () => {
		if (account?.isAdmin) {
			return (
				<Tag css={styles.roleTag} icon={<CrownOutlined />}>
					{getRoleDisplayName()}
				</Tag>
			);
		}
		return (
			<Tag css={styles.userTag} icon={<UserOutlined />}>
				{getRoleDisplayName()}
			</Tag>
		);
	};

	const infoItems = [
		{
			icon: <UserOutlined />,
			label: intl.formatMessage({ id: "page.profile.info.name" }),
			value: account.username
		},
		{
			icon: <MailOutlined />,
			label: intl.formatMessage({ id: "page.profile.info.email" }),
			value: account.email
		},
		{
			icon: <CrownOutlined />,
			label: intl.formatMessage({ id: "page.profile.info.role" }),
			value: getRoleTag()
		},
		{
			icon: <CalendarOutlined />,
			label: intl.formatMessage({ id: "page.profile.info.createdAt" }),
			value: formatDate(account.createdAt)
		}
	];

	return (
		<Flex gap={20} vertical>
			<Flex justify="space-between" align="center">
				<Text style={{ fontSize: "16px", color: "#6c757d" }}>
					{intl.formatMessage({
						id: "page.profile.info.description"
					})}
				</Text>
				<Button
					type="primary"
					icon={<EditOutlined />}
					onClick={onEdit}
					css={styles.editButton}
				>
					{intl.formatMessage({ id: "page.profile.edit" })}
				</Button>
			</Flex>

			<div css={styles.infoGrid}>
				{infoItems.map((item, index) => (
					<DetailsInfoItem
						key={index}
						icon={item.icon}
						label={item.label}
						value={item.value}
					/>
				))}
			</div>
		</Flex>
	);
};

export default PreviewContainer;
