import { Account } from "@core/domain/models/account";
import { css } from "@emotion/react";
import { THEME_COLORS } from "@web/config/theme";
import { Button, Col, Form, FormInstance, Input, Row } from "antd";
import { useIntl } from "react-intl";

interface Props {
	account: Account;
	loading: boolean;
	form: FormInstance<any>;
	onSave: (values: any) => void;
	onCancel: () => void;
}

const styles = {
	formItem: css`
		margin-bottom: 1.5rem;
	`,
	buttonGroup: css`
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding-top: 1.5rem;
	`,
	submitButton: css`
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
	cancelButton: css`
		height: 35px;
		box-shadow: none;
	`
};

const EditContainer = ({ account, loading, form, onSave, onCancel }: Props) => {
	const intl = useIntl();

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={onSave}
			initialValues={{
				name: account.username,
				email: account.email
			}}
		>
			<Row gutter={24}>
				<Col span={12}>
					<Form.Item
						name="name"
						label={intl.formatMessage({
							id: "page.profile.form.name"
						})}
						rules={[
							{
								required: true,
								message: intl.formatMessage({
									id: "page.profile.form.name.required"
								})
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
						label={intl.formatMessage({
							id: "page.profile.form.email"
						})}
						rules={[
							{
								required: true,
								message: intl.formatMessage({
									id: "page.profile.form.email.required"
								})
							},
							{
								type: "email",
								message: intl.formatMessage({
									id: "page.profile.form.email.invalid"
								})
							}
						]}
						css={styles.formItem}
					>
						<Input size="large" />
					</Form.Item>
				</Col>
			</Row>

			<div css={styles.buttonGroup}>
				<Button onClick={onCancel} size="large" css={styles.cancelButton}>
					{intl.formatMessage({ id: "general.cancel" })}
				</Button>
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
					size="large"
					css={styles.submitButton}
				>
					{intl.formatMessage({ id: "general.submit" })}
				</Button>
			</div>
		</Form>
	);
};

export default EditContainer;
