import { css } from "@emotion/react";
import { Modal, Form, Input, DatePicker } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { Tenant } from "@core/domain/models/tenant";

const styles = {
	fullWidth: css`
		width: 100%;
	`
};

interface Props {
	visible: boolean;
	loadingButton: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	tenant?: Tenant;
	title: string;
	formName: string;
}

const TenantModalForm = ({
	visible,
	loadingButton,
	onCancel,
	onSubmit,
	tenant,
	title,
	formName
}: Props) => {
	const [form] = useForm();
	const intl = useIntl();

	const handleOk = () => {
		form.validateFields().then((values) => {
			const formattedValues = {
				...values,
				id: tenant?.id,
				birthDate: values.birthDate?.format("YYYY-MM-DD")
			};
			onSubmit(formattedValues);
			form.resetFields();
		});
	};

	useEffect(() => {
		if (visible && tenant) {
			const values = tenant.toJSON();
			form.setFieldsValue({
				name: values.name ?? "",
				email: values.email ?? "",
				phone: values.phone ?? "",
				birthDate: values.birthDate ? dayjs(values.birthDate) : null
			});
		}
	}, [visible, tenant]);

	return (
		<Modal
			title={title}
			open={visible}
			onOk={handleOk}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: "general.submit" })}
			cancelText={intl.formatMessage({ id: "general.cancel" })}
			confirmLoading={loadingButton}
			centered
		>
			<Form form={form} layout="vertical" name={formName} onFinish={handleOk}>
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{ required: true, message: "Please enter the tenant's name" }
					]}
				>
					<Input
						placeholder="Tenant's full name"
						showCount
						maxLength={60}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							type: "email",
							required: true,
							message: "Please enter a valid email"
						}
					]}
				>
					<Input
						placeholder="tenant@email.com"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
					/>
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone"
					rules={[{ required: true, message: "Please enter a phone number" }]}
				>
					<Input
						placeholder="+1 (555) 123-4567"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
					/>
				</Form.Item>
				<Form.Item
					name="birthDate"
					label="Birth Date"
					rules={[{ required: true, message: "Please select a birth date" }]}
				>
					<DatePicker css={styles.fullWidth} format="DD/MM/YYYY" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default TenantModalForm;
