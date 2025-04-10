import { css } from "@emotion/react";
import { App, Button, Card, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useResetPassword } from "apps/web/lib/contexts/auth/hooks";
import {
	confirmPasswordRule,
	requiredRule
} from "apps/web/lib/utils/validator-rules";

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
	title: css`
		margin-top: 0px;
	`,
	form: css`
		display: flex;
		flex-direction: column;
	`,
	submitButton: css`
		width: 100%;
		margin-top: 8px;
	`
};

const RedefinePasswordForm = () => {
	const [loading, setLoading] = useState(false);

	const { message } = App.useApp();
	const { token } = useParams();
	const [form] = useForm();
	const navigate = useNavigate();
	const resetPassword = useResetPassword();

	const submit = async () => {
		const values = await form.validateFields();
		if (!values) {
			return false;
		}
		setLoading(true);
		const result = await resetPassword(
			String(token),
			String(values.new_password)
		);
		setLoading(false);
		if (result) {
			message.success("Your password has been reset successfully!");
			navigate(LoginPage.route);
		}
		return result;
	};

	return (
		<Card css={styles.container}>
			<Typography.Title css={styles.title} level={4}>
				Join
			</Typography.Title>
			<Form css={styles.form} form={form} layout="vertical" onFinish={submit}>
				<Typography.Text>
					Enter and confirm your new password below.
				</Typography.Text>
				<Form.Item
					name="new_password"
					label="New Password"
					rules={[requiredRule()]}
				>
					<Input.Password placeholder="Enter your password" />
				</Form.Item>
				<Form.Item
					name="repeat_password"
					label="Confirm Passowrd"
					rules={[confirmPasswordRule("new_password"), requiredRule()]}
					dependencies={["password"]}
					hasFeedback
				>
					<Input placeholder="Confirm your password" type="password" />
				</Form.Item>
				<Button
					css={styles.submitButton}
					type="primary"
					htmlType="submit"
					disabled={loading}
				>
					Enviar
				</Button>
			</Form>
		</Card>
	);
};

export default RedefinePasswordForm;
