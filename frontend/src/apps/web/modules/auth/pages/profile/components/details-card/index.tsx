import { Account } from "@core/domain/models/account";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { Card, Form, message, Typography } from "antd";
import { useState } from "react";
import { useIntl } from "react-intl";
import PreviewContainer from "../preview-container";
import EditContainer from "../edit-container";

const { Title } = Typography;

interface Props {
	account: Account;
}

const styles = {
	detailsCard: css`
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		border: none;
		overflow: hidden;
	`,
	cardHeader: css`
		padding: 1.5rem 2rem;
	`,
	cardTitle: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-size: 18px;
		font-weight: 600;
		margin: 0;
	`,
	cardBody: css`
		padding: 0 2rem 2rem 2rem;
	`
};

const DetailsCard = ({ account }: Props) => {
	const intl = useIntl();
	const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
	const [form] = Form.useForm();
	const [loadingProfile, setLoadingProfile] = useState(false);

	const handleEdit = () => {
		setIsEditingProfile(true);
		form.setFieldsValue({
			name: account?.username,
			email: account?.email
		});
	};

	const handleCancelChanges = () => {
		setIsEditingProfile(false);
		form.resetFields();
	};

	const handleSaveChanges = async (values: any) => {
		setLoadingProfile(true);
		try {
			// TODO: update profile
			console.log("Updating profile:", values);
			message.success(
				intl.formatMessage({ id: "page.profile.update.success" })
			);
			setIsEditingProfile(false);
		} catch (error) {
			message.error(intl.formatMessage({ id: "page.profile.update.error" }));
		} finally {
			setLoadingProfile(false);
		}
	};

	return (
		<Card css={styles.detailsCard}>
			<div css={styles.cardHeader}>
				<Title level={4} css={styles.cardTitle}>
					{intl.formatMessage({ id: "page.profile.section.personal" })}
				</Title>
			</div>

			<div css={styles.cardBody}>
				{isEditingProfile ? (
					<EditContainer
						account={account}
						form={form}
						loading={loadingProfile}
						onSave={handleSaveChanges}
						onCancel={handleCancelChanges}
					/>
				) : (
					<PreviewContainer account={account} onEdit={handleEdit} />
				)}
			</div>
		</Card>
	);
};

export default DetailsCard;
