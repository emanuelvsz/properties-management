// components/AddPropertyModalForm.tsx
import { css } from "@emotion/react";
import { Modal, Form, Input, InputNumber, Switch, Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useIntl } from "react-intl";

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

	const intl = useIntl();

	return (
		<Modal
			title={intl.formatMessage({
				id: "component.add-property-modal-form.modal.title"
			})}
			visible={visible}
			onOk={handleOk}
			okButtonProps={{
				style: {
					height: "36px !important",
					boxShadow: "none"
				}
			}}
			cancelButtonProps={{
				style: {
					height: "36px !important",
					boxShadow: "none"
				}
			}}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: "general.submit" })}
			cancelText={intl.formatMessage({ id: "general.cancel" })}
			confirmLoading={loadingButton}
		>
			<Form form={form} layout="vertical" name="add_property_form">
				<Form.Item
					name="title"
					label={intl.formatMessage({
						id: "component.add-property-modal-form.form.item.title.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.add-property-modal-form.form.item.title.required-rule.message"
							})
						}
					]}
				>
					<Input
						placeholder={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.title.placeholder"
						})}
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label={intl.formatMessage({
						id: "component.add-property-modal-form.form.item.description.label"
					})}
				>
					<Input.TextArea
						placeholder={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.description.placeholder"
						})}
					/>
				</Form.Item>
				<Form.Item
					name="location"
					label={intl.formatMessage({
						id: "component.add-property-modal-form.form.item.location.label"
					})}
				>
					<Input
						placeholder={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.location.placeholder"
						})}
					/>
				</Form.Item>
				<Flex align="center" justify="center" gap={15}>
					<Form.Item
						name="bedrooms"
						label={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.bedrooms.label"
						})}
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
						label={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.bathrooms.label"
						})}
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
						label={intl.formatMessage({
							id: "component.add-property-modal-form.form.item.surface.label"
						})}
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
					label={intl.formatMessage({
						id: "component.add-property-modal-form.form.item.rent-price.label"
					})}
					rules={[{ required: true, message: "" }]}
				>
					<InputNumber
						min={0}
						placeholder={NUMBER_INPUT_DEFAULT_PLACEHOLDER}
						css={styles.soloInputNumber}
					/>
				</Form.Item>
				<Form.Item
					name="furnished"
					label={intl.formatMessage({
						id: "component.add-property-modal-form.form.item.furnished.label"
					})}
					valuePropName="checked"
				>
					<Switch />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddPropertyModalForm;
