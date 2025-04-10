import { css } from "@emotion/react";
import { App, Button, Card, Divider, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

import { useState } from "react";

import { Link } from "react-router-dom";

import { useForgotPassword } from "apps/web/lib/contexts/auth/hooks";
import { emailRule, requiredRule } from "apps/web/lib/utils/validator-rules";

import LoginPage from "../../../login";

const styles = {
	container: css`
		max-width: 500px;
		width: 100%;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);

		@media (max-height: 800px) {
			box-shadow: unset;
			border: unset;
			.ant-card-body {
				padding-inline: 0px !important;
			}
		}
	`,
	form: css`
		display: flex;
		flex-direction: column;
	`,
	title: css`
		margin-top: 0px;
	`,
	submitButton: css`
		width: 100%;
		margin-top: 8px;
	`,
	forgotPasswordText: css`
		text-align: right;
	`
};

const ResetPasswordForm = () => {
	const { message } = App.useApp();
	const forgotPassword = useForgotPassword();
	const [loading, setLoading] = useState(false);
	const [form] = useForm();

	const submit = async () => {
		const values = await form.validateFields();
		if (!values) {
			return false;
		}
		setLoading(true);
		const result = await forgotPassword(String(values.email));
		setLoading(false);
		if (result) {
			message.success(
				"An email has been sent to reset your password. Check your inbox!"
			);
		}
		return result;
	};

	return (
		<Card css={styles.container}>
			<Typography.Title css={styles.title} level={4}>
				Recovery Password
			</Typography.Title>
			<Form css={styles.form} form={form} layout="vertical" onFinish={submit}>
				<Form.Item
					name="email"
					label="Email"
					rules={[requiredRule(), emailRule()]}
				>
					<Input disabled={loading} autoComplete="on" />
				</Form.Item>
				<Button
					css={styles.submitButton}
					type="primary"
					loading={loading}
					htmlType="submit"
				>
					Enviar
				</Button>
			</Form>
			<Divider />
			<Typography.Text css={styles.forgotPasswordText}>
				Already have an account and know the password?&nbsp;
				<Link to={LoginPage.route}>Click here</Link>
			</Typography.Text>
		</Card>
	);
};

export default ResetPasswordForm;
