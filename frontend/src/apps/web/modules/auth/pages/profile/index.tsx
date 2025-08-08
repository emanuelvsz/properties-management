import { useState } from "react";
import { 
	Button, 
	Card, 
	Form, 
	Input, 
	Avatar, 
	Flex, 
	Typography, 
	message,
	Row,
	Col,
	Tag
} from "antd";
import { 
	UserOutlined, 
	EditOutlined, 
	SaveOutlined, 
	CloseOutlined,
	MailOutlined,
	CalendarOutlined,
	CrownOutlined,
} from "@ant-design/icons";
import { css } from "@emotion/react";
import { useIntl } from "react-intl";

import { useAccount } from "@web/lib/contexts/auth/hooks";
import { THEME_COLORS } from "@web/config/theme";

const { Title, Text } = Typography;

const styles = {
	container: css`
		background-color: ${THEME_COLORS.GRAY_COLOR};
		min-height: calc(100vh - 4rem - 36px);
	`,
	content: css`
		padding-inline: 2rem;
		padding-block: 1rem;
	`,
	headerCard: css`
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		background: linear-gradient(135deg, ${THEME_COLORS.PRIMARY_COLOR} 0%, ${THEME_COLORS.SECONDARY_COLOR} 100%);
		color: white;
		overflow: hidden;
		position: relative;
		margin-bottom: 2rem;
		
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
			pointer-events: none;
		}
	`,
	headerContent: css`
		padding: 3rem 2rem;
		text-align: center;
		position: relative;
		z-index: 1;
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
	`,
	userRole: css`
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(255, 255, 255, 0.2);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
	`,
	infoCard: css`
		border-radius: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		border: none;
		overflow: hidden;
	`,
	cardHeader: css`
		padding: 1.5rem 2rem;
		border-bottom: 1px solid #e9ecef;
	`,
	cardTitle: css`
		color: ${THEME_COLORS.PRIMARY_COLOR};
		font-size: 18px;
		font-weight: 600;
		margin: 0;
	`,
	cardBody: css`
		padding: 2rem;
	`,
	infoGrid: css`
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	`,
	infoItem: css`
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid #e9ecef;
		transition: all 0.3s ease;
		
		&:hover {
			background: white;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			transform: translateY(-2px);
		}
	`,
	infoLabel: css`
		color: #6c757d;
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 0.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	`,
	infoValue: css`
		color: #212529;
		font-size: 16px;
		font-weight: 500;
	`,
	formContainer: css`
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	`,
	formItem: css`
		margin-bottom: 1.5rem;
	`,
	buttonGroup: css`
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e9ecef;
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

const ProfilePage = () => {
	const account = useAccount();
	const intl = useIntl();
	const [isEditing, setIsEditing] = useState(false);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleEdit = () => {
		setIsEditing(true);
		form.setFieldsValue({
			name: account?.username,
			email: account?.email
		});
	};

	const handleCancel = () => {
		setIsEditing(false);
		form.resetFields();
	};

	const handleSave = async (values: any) => {
		setLoading(true);
		try {
			// TODO: update profile
			console.log("Updating profile:", values);
			message.success(intl.formatMessage({ id: "page.profile.update.success" }));
			setIsEditing(false);
		} catch (error) {
			message.error(intl.formatMessage({ id: "page.profile.update.error" }));
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
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

	if (!account) {
		return null;
	}

	return (
		<div css={styles.container}>
			<div css={styles.content}>
				<Card css={styles.headerCard}>
					<Flex align="center" justify="flex-start" gap={20}>
						<Avatar 
							css={styles.avatar} 
							icon={<UserOutlined />}
							size={120}
						/>
						<Flex vertical gap={0.5}>
							<Title level={4} css={styles.userName}>
								{account.username}
							</Title>
							<Text css={styles.userEmail}>
								{account.email}
							</Text>
						</Flex>
					</Flex>
				</Card>

				<Card css={styles.infoCard}>
					<div css={styles.cardHeader}>
						<Title level={4} css={styles.cardTitle}>
							{intl.formatMessage({ id: "page.profile.section.personal" })}
						</Title>
					</div>
					
					<div css={styles.cardBody}>
						{isEditing ? (
							<div css={styles.formContainer}>
								<Form
									form={form}
									layout="vertical"
									onFinish={handleSave}
									initialValues={{
										name: account.username,
										email: account.email
									}}
								>
									<Row gutter={24}>
										<Col span={12}>
											<Form.Item
												name="name"
												label={intl.formatMessage({ id: "page.profile.form.name" })}
												rules={[
													{
														required: true,
														message: intl.formatMessage({ id: "page.profile.form.name.required" })
													}
												]}
												css={styles.formItem}
											>
												<Input size="large" />
											</Form.Item>
										</Col>
										<Col span={12}>
											<Form.Item
												name="email"
												label={intl.formatMessage({ id: "page.profile.form.email" })}
												rules={[
													{
														required: true,
														message: intl.formatMessage({ id: "page.profile.form.email.required" })
													},
													{
														type: 'email',
														message: intl.formatMessage({ id: "page.profile.form.email.invalid" })
													}
												]}
												css={styles.formItem}
											>
												<Input size="large" />
											</Form.Item>
										</Col>
									</Row>

									<div css={styles.buttonGroup}>
										<Button 
											icon={<CloseOutlined />}
											onClick={handleCancel}
											size="large"
											style={{ height: '35px', boxShadow: 'none' }}
										>
											{intl.formatMessage({ id: "general.cancel" })}
										</Button>
										<Button 
											type="primary" 
											icon={<SaveOutlined />}
											htmlType="submit"
											loading={loading}
											size="large"
											css={styles.editButton}
										>
											{intl.formatMessage({ id: "general.save" })}
										</Button>
									</div>
								</Form>
							</div>
						) : (
							<>
								<Flex justify="space-between" align="center" style={{ marginBottom: '2rem' }}>
									<Text style={{ fontSize: '16px', color: '#6c757d' }}>
										{intl.formatMessage({ id: "page.profile.info.description" })}
									</Text>
									<Button 
										type="primary" 
										icon={<EditOutlined />}
										onClick={handleEdit}
										css={styles.editButton}
									>
										{intl.formatMessage({ id: "page.profile.edit" })}
									</Button>
								</Flex>

								<div css={styles.infoGrid}>
									<div css={styles.infoItem}>
										<div css={styles.infoLabel}>
											<UserOutlined />
											{intl.formatMessage({ id: "page.profile.info.name" })}
										</div>
										<div css={styles.infoValue}>
											{account.username}
										</div>
									</div>

									<div css={styles.infoItem}>
										<div css={styles.infoLabel}>
											<MailOutlined />
											{intl.formatMessage({ id: "page.profile.info.email" })}
										</div>
										<div css={styles.infoValue}>
											{account.email}
										</div>
									</div>

									<div css={styles.infoItem}>
										<div css={styles.infoLabel}>
											<CrownOutlined />
											{intl.formatMessage({ id: "page.profile.info.role" })}
										</div>
										<div css={styles.infoValue}>
											{getRoleTag()}
										</div>
									</div>

									<div css={styles.infoItem}>
										<div css={styles.infoLabel}>
											<CalendarOutlined />
											{intl.formatMessage({ id: "page.profile.info.createdAt" })}
										</div>
										<div css={styles.infoValue}>
											{formatDate(account.createdAt)}
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

ProfilePage.route = "/profile";

export default ProfilePage; 