import { css } from "@emotion/react";

import { Button, Card, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

import { useState } from "react";

import { useLogin } from "apps/web/lib/contexts/auth/hooks";
import { requiredRule } from "apps/web/lib/utils/validator-rules";

const styles = {
	container: css`
		max-width: 500px;
		width: 100%;
		box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
		border-radius: 6px;
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
		border-radius: 4px;
		box-shadow: none;
	`
};

const LoginForm = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [form] = useForm();
	const login = useLogin();

	const submit = async () => {
		const values = await form.validateFields();
		if (!values) {
			return false;
		}
		const { username, password } = values;
		setLoading(true);
		const response = await login(username, password);
		setLoading(false);
		return response;
	};

	return (
		<Card css={styles.container} bordered>
			<Typography.Title css={styles.title} level={4}>
				Login
			</Typography.Title>
			<Form css={styles.form} form={form} layout="vertical" onFinish={submit}>
				<Form.Item name="username" label="Username" rules={[requiredRule()]}>
					<Input disabled={loading} autoComplete="on" />
				</Form.Item>
				<div>
					<Form.Item name="password" label="Password" rules={[requiredRule()]}>
						<Input.Password
							disabled={loading}
							placeholder="Enter your password"
							visibilityToggle
						/>
					</Form.Item>
				</div>
				<Button
					css={styles.submitButton}
					type="primary"
					loading={loading}
					htmlType="submit"
				>
					Submit
				</Button>
			</Form>
		</Card>
	);
};

export default LoginForm;
