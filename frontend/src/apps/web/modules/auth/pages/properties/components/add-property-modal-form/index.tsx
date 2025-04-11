// components/AddPropertyModalForm.tsx
import { css } from "@emotion/react";
import { Modal, Form, Input, InputNumber, Switch, Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

interface AddPropertyModalFormProps {
	visible: boolean;
	loadingButton: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
}

const NUMBER_INPUT_DEFAULT_PLACEHOLDER = "0";

const styles = {
	inputNumber: css`
		width: 100%;
	`,
	soloInputNumber: css`
		width: calc(100% / 3 - 10px);
	`
};

const AddPropertyModalForm: React.FC<AddPropertyModalFormProps> = ({
	visible,
	loadingButton,
	onCancel,
	onSubmit
}) => {
	const [form] = useForm();

	useEffect(() => {
		if (!visible) {
			form.resetFields();
		}
	}, [visible]);

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				onSubmit(values);
				form.resetFields();
			})
			.catch((info) => {
				console.log("Validate Failed:", info);
			});
	};

	return (
		<Modal
			title="Add New Property"
			visible={visible}
			onOk={handleOk}
			okButtonProps={{
				style: {
					boxShadow: "none"
				}
			}}
			onCancel={onCancel}
			confirmLoading={loadingButton}
		>
			<Form form={form} layout="vertical" name="add_property_form">
				<Form.Item
					name="title"
					label="Title"
					rules={[{ required: true, message: "Please input the title!" }]}
				>
					<Input placeholder="Property in Caracas" />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<Input.TextArea placeholder="This property is a good one to live!" />
				</Form.Item>
				<Flex align="center" justify="center" gap={15}>
					<Form.Item
						name="bedrooms"
						label="Bedrooms"
						rules={[
							{
								required: true,
								message: ""
							}
						]}
					>
						<InputNumber
							min={0}
							placeholder={NUMBER_INPUT_DEFAULT_PLACEHOLDER}
							css={styles.inputNumber}
						/>
					</Form.Item>
					<Form.Item
						name="bathrooms"
						label="Bathrooms"
						rules={[
							{
								required: true,
								message: ""
							}
						]}
					>
						<InputNumber
							min={0}
							placeholder={NUMBER_INPUT_DEFAULT_PLACEHOLDER}
							css={styles.inputNumber}
						/>
					</Form.Item>
					<Form.Item
						name="surface"
						label="Surface (m²)"
						rules={[{ required: true, message: "" }]}
					>
						<InputNumber
							min={0}
							placeholder={NUMBER_INPUT_DEFAULT_PLACEHOLDER}
							css={styles.inputNumber}
						/>
					</Form.Item>
				</Flex>
				<Form.Item
					name="rent"
					label="Rent Price"
					rules={[{ required: true, message: "" }]}
				>
					<InputNumber
						min={0}
						placeholder={NUMBER_INPUT_DEFAULT_PLACEHOLDER}
						css={styles.soloInputNumber}
					/>
				</Form.Item>
				<Form.Item name="furnished" label="Furnished" valuePropName="checked">
					<Switch />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddPropertyModalForm;
