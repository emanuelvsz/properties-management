import { css } from "@emotion/react";
import {
	Modal,
	Form,
	InputNumber,
	DatePicker,
	Flex,
	Tooltip,
	Select,
	Tag,
	Switch
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tenant } from "@core/domain/models/tenant";
import { RentContract } from "@core/domain/models/rent-contract";

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Props {
	visible: boolean;
	loadingButton: boolean;
	onCancel: () => void;
	onSubmit: (values: any) => void;
	contract?: RentContract;
	tenants: Tenant[];
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

const RentContractModalForm = ({
	visible,
	loadingButton,
	onCancel,
	onSubmit,
	contract,
	tenants,
	title,
	loading,
	formName
}: Props) => {
	const [form] = useForm();
	const intl = useIntl();

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				const formattedValues = {
					...values,
					id: contract?.id,
					started_at: values.started_at?.format("YYYY-MM-DD"),
					finish_at: values.finish_at?.format("YYYY-MM-DD"),
					payments_date: values.payments_date?.format("YYYY-MM-DD"),
					tenant: values.tenant,
					archived: values.archived
				};
				onSubmit(formattedValues);
				form.resetFields();
			})
			.catch((info) => {
				console.info("Validate Failed: ", info);
			});
	};

	useEffect(() => {
		if (visible && contract) {
			const values = contract.toJSON();
			form.setFieldsValue({
				property: values.property ?? undefined,
				tenant: values.tenant ?? undefined,
				started_at: values.started_at ? dayjs(contract.startedAt) : null,
				finish_at: values.finish_at ? dayjs(contract.finishAt) : null,
				deposit: typeof values.deposit === "number" ? contract.deposit : 0,
				payments_date: values.payments_date
					? dayjs(values.payments_date)
					: null,
				archived: values.archived
			});
		}
	}, [visible, contract]);

	useEffect(() => {
		if (!visible) {
			form.resetFields();
		}
	}, [visible]);

	return (
		<Modal
			title={title}
			open={visible}
			onOk={handleOk}
			onCancel={onCancel}
			okText={intl.formatMessage({ id: "general.submit" })}
			cancelText={intl.formatMessage({ id: "general.cancel" })}
			confirmLoading={loadingButton}
			loading={loading}
			okButtonProps={{
				style: {
					boxShadow: "none"
				}
			}}
			centered
		>
			{!contract && (
				<Tag color="warning">
					{intl.formatMessage({
						id: "component.rent-contract-modal-form.warning.new-contract"
					})}
				</Tag>
			)}
			<Form form={form} layout="vertical" name={formName} onFinish={handleOk}>
				<Form.Item
					name="tenant"
					label={intl.formatMessage({
						id: "component.rent-contract-modal-form.form.tenant.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.rent-contract-modal-form.form.tenant.required"
							})
						}
					]}
				>
					<Select
						options={tenants.map((tenant) => ({
							label: tenant.name,
							value: tenant.id
						}))}
						placeholder={intl.formatMessage({
							id: "component.rent-contract-modal-form.form.tenant.placeholder"
						})}
					/>
				</Form.Item>
				<Flex gap={16}>
					<Form.Item
						name="started_at"
						label={intl.formatMessage({
							id: "component.rent-contract-modal-form.form.start-date.label"
						})}
						rules={[
							{
								required: true,
								message: intl.formatMessage({
									id: "component.rent-contract-modal-form.form.start-date.required"
								})
							}
						]}
					>
						<DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
					</Form.Item>
					<Form.Item
						name="finish_at"
						label={intl.formatMessage({
							id: "component.rent-contract-modal-form.form.end-date.label"
						})}
						style={{ flex: 1 }}
						rules={[
							{
								required: true,
								message: intl.formatMessage({
									id: "component.rent-contract-modal-form.form.end-date.required"
								})
							}
						]}
					>
						<DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
					</Form.Item>
				</Flex>

				<Form.Item
					name="deposit"
					label={intl.formatMessage({
						id: "component.rent-contract-modal-form.form.deposit.label"
					})}
					rules={[
						{
							required: true,
							message: intl.formatMessage({
								id: "component.rent-contract-modal-form.form.deposit.required"
							})
						}
					]}
				>
					<InputNumber css={styles.inputNumber} min={0} />
				</Form.Item>

				<Form.Item
					name="payments_date"
					label={
						<Flex gap={8} justify="start" align="center">
							{intl.formatMessage({
								id: "component.rent-contract-modal-form.form.payment-due-day.label"
							})}
							<Tooltip
								title={intl.formatMessage({
									id: "component.rent-contract-modal-form.form.payment-due-day.tooltip"
								})}
							>
								<InfoCircleOutlined
									style={{ color: "#999", fontSize: "14px" }}
								/>
							</Tooltip>
						</Flex>
					}
				>
					<DatePicker style={{ width: "100%" }} format="DD" picker="date" />
				</Form.Item>
				{contract && (
					<Form.Item
						name="archived"
						label={intl.formatMessage({
							id: "component.rent-contract-modal-form.form.archived.label"
						})}
					>
						<Switch />
					</Form.Item>
				)}
			</Form>
		</Modal>
	);
};

export default RentContractModalForm;
