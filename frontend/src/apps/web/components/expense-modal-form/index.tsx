import { css } from "@emotion/react";
import {
	Modal,
	Form,
	Input,
	InputNumber,
	DatePicker,
	Flex,
	Switch,
	Tooltip
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import ExpenseTypeSelect from "./components/expense-type-select";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Expense } from "@core/domain/models/expense";

interface Props {
	visible: boolean;
	loadingButton: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	expense?: Expense;
	types: string[];
	title: string;
	loading: boolean;
	formName: string;
}

const styles = {
	inputNumber: css`
		width: 100%;
	`,
	halfWidth: css`
		width: 100%;
	`
};

const ExpenseModalForm = ({
	visible,
	loadingButton,
	onCancel,
	onSubmit,
	expense,
	title,
	types,
	loading,
	formName
}: Props) => {
	const [isPayed, setIsPayed] = useState(false);
	const [form] = useForm();
	const intl = useIntl();

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				const formattedValues = {
					...values,
					due_date: values.due_date?.format("YYYY-MM-DD"),
					payed_at: values.payed_at?.format("YYYY-MM-DD") ?? null
				};

				onSubmit(formattedValues);
				form.resetFields();
			})
			.catch((info) => {
				console.info("Validate Failed: ", info);
			});
	};

	useEffect(() => {
		if (visible && expense) {
			const values = expense.toJSON();
			form.setFieldsValue({
				name: values.name ?? "",
				description: values.description !== "null" ? values.description : null,
				expense_value: values.expense_value ?? 0,
				expense_type: values.expense_type ?? null,
				due_date: values.due_date ? dayjs(values.due_date) : null,
				payed_at: values.payed_at ? dayjs(values.payed_at) : null,
				payed: !!values.payed_at
			});
			setIsPayed(!!values.payed_at);
		}
	}, [visible, expense]);

	return (
		<Modal
			title={title}
			open={visible}
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
			loading={loading}
			centered
		>
			<Form form={form} layout="vertical" name={formName} onFinish={handleOk}>
				<Form.Item
					name="name"
					label={intl.formatMessage({
						id: "component.expense-modal-form.form.name.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.expense-modal-form.form.name.required"
							})
						}
					]}
				>
					<Input
						placeholder={intl.formatMessage({
							id: "component.expense-modal-form.form.name.placeholder"
						})}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
						showCount
						maxLength={40}
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label={intl.formatMessage({
						id: "component.expense-modal-form.form.description.label"
					})}
				>
					<Input.TextArea
						placeholder={intl.formatMessage({
							id: "component.expense-modal-form.form.description.placeholder"
						})}
						showCount
						maxLength={200}
						draggable={false}
						style={{ height: 120, resize: "none" }}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
					/>
				</Form.Item>
				<Form.Item
					name="expense_value"
					label={intl.formatMessage({
						id: "component.expense-modal-form.form.expense-value.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.expense-modal-form.form.expense-value.required"
							})
						}
					]}
				>
					<InputNumber
						placeholder={intl.formatMessage({
							id: "component.expense-modal-form.form.expense-value.placeholder"
						})}
						css={styles.inputNumber}
						min={0}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								form.submit();
							}
						}}
					/>
				</Form.Item>
				<Flex gap={16}>
					<Form.Item
						name="due_date"
						label={intl.formatMessage({
							id: "component.expense-modal-form.form.due-date.label"
						})}
						style={{ flex: 1 }}
						rules={[
							{
								required: true,
								message: intl.formatMessage({
									id: "component.expense-modal-form.form.due-date.required"
								})
							}
						]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>
					<Flex gap={5}>
						<Form.Item
							label={intl.formatMessage({
								id: "component.expense-modal-form.form.payed.label"
							})}
							name="payed"
							valuePropName="checked"
						>
							<Switch
								onChange={(checked) => {
									setIsPayed(checked);
									if (checked) {
										form.setFieldsValue({ payed_at: dayjs() });
									} else {
										form.setFieldsValue({ payed_at: null });
									}
								}}
							/>
						</Form.Item>
						<Form.Item
							label={
								<Flex gap={8} justify="center" align="center">
									{intl.formatMessage({
										id: "component.expense-modal-form.form.payment-date.label"
									})}{" "}
									<Tooltip
										title={intl.formatMessage({
											id: "component.expense-modal-form.form.payment-date.tooltip"
										})}
									>
										<InfoCircleOutlined
											style={{ color: "#999", fontSize: "14px" }}
										/>
									</Tooltip>
								</Flex>
							}
							name="payed_at"
						>
							<DatePicker
								style={{ width: "100%" }}
								disabled={!isPayed}
								format="DD/MM/YYYY"
							/>
						</Form.Item>
					</Flex>
				</Flex>
				<Form.Item
					name="expense_type"
					label={intl.formatMessage({
						id: "component.expense-modal-form.form.expense-type.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.expense-modal-form.form.expense-type.required"
							})
						}
					]}
				>
					<ExpenseTypeSelect types={types} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ExpenseModalForm;
