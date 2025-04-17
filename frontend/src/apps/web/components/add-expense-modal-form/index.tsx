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
import { useListExpenseTypes } from "@web/lib/contexts/expense/hooks";
import { InfoCircleOutlined } from "@ant-design/icons";

interface Props {
	visible: boolean;
	loadingButton: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
}

const styles = {
	inputNumber: css`
		width: 100%;
	`,
	halfWidth: css`
		width: 100%;
	`
};

const AddExpenseModalForm = ({
	visible,
	loadingButton,
	onCancel,
	onSubmit
}: Props) => {
	const [expenseTypes, setExpenseTypes] = useState<string[]>([]);
	const [loadingExpenseTypes, setLoadingExpenseTypes] = useState(false);
	const [isPayed, setIsPayed] = useState(false);
	const [form] = useForm();
	const intl = useIntl();

	const listExpenseTypes = useListExpenseTypes();

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
		if (!visible) {
			form.resetFields();
		}
	}, [visible]);

	useEffect(() => {
		const fetchTypes = async () => {
			setLoadingExpenseTypes(true);
			const result = await listExpenseTypes();
			setLoadingExpenseTypes(false);
			setExpenseTypes(result);
		};

		fetchTypes();
	}, [listExpenseTypes]);

	return (
		<Modal
			title="Add Property Expense"
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
			loading={loadingExpenseTypes}
			centered
		>
			<Form
				form={form}
				layout="vertical"
				name="add_property_form"
				initialValues={{
					expense_value: 0,
					expense_type: expenseTypes[0]
				}}
			>
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.add-property-modal-form.form.item.title.required-rule.message"
							})
						}
					]}
				>
					<Input placeholder="Water" />
				</Form.Item>

				<Form.Item name="description" label="Description">
					<Input.TextArea
						placeholder="Property monthly bills of water"
						showCount
						maxLength={200}
						draggable={false}
						style={{ height: 120, resize: "none" }}
					/>
				</Form.Item>

				<Form.Item
					name="expense_value"
					label="Expense Value"
					rules={[
						{ required: true, message: "Please enter the expense value" }
					]}
				>
					<InputNumber placeholder="0" css={styles.inputNumber} min={0} />
				</Form.Item>

				<Flex gap={16}>
					<Form.Item
						name="due_date"
						label="Due Date"
						style={{ flex: 1 }}
						rules={[{ required: true, message: "Please select a due date" }]}
					>
						<DatePicker style={{ width: "100%" }} />
					</Form.Item>
					<Flex gap={5}>
						<Form.Item label="Payed" name="payed" valuePropName="checked">
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
									Payment Date{" "}
									<Tooltip title="Only fill this if the bill has already been paid.">
										<InfoCircleOutlined
											style={{ color: "#999", fontSize: "14px" }}
										/>
									</Tooltip>
								</Flex>
							}
							name="payed_at"
						>
							{" "}
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
					label="Expense Type"
					rules={[
						{ required: true, message: "Please select the expense type" }
					]}
				>
					<ExpenseTypeSelect types={expenseTypes} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddExpenseModalForm;
