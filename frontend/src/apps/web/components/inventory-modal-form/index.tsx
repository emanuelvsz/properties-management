import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Typography,
	message,
	InputNumber,
	DatePicker,
	Modal
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useIntl } from "react-intl";
import dayjs from "dayjs";

import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { Property } from "@core/domain/models/property";
import { useInventoryContext } from "../../lib/contexts/inventory/hooks";
import { useListProperties } from "../../lib/contexts/property/hooks";
import { THEME_COLORS } from "../../config/theme";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const styles = {
	modal: css`
		.ant-modal-content {
			border-radius: 12px;
		}
	`,
	formItem: css`
		margin-bottom: 1rem;
	`,
	propertyOption: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
	`,
	propertyCode: css`
		font-size: 12px;
		color: ${THEME_COLORS.GRAY_COLOR};
		margin-left: 8px;
	`
};

interface Props {
	visible: boolean;
	loading?: boolean;
	onCancel: () => void;
	onSubmit: (data: any) => void;
	title?: string;
	editingItem?: InventoryItem | null;
}

const InventoryModalForm = ({
	visible,
	loading = false,
	onCancel,
	onSubmit,
	title,
	editingItem
}: Props) => {
	const intl = useIntl();
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();

	const { categories, listCategories } = useInventoryContext();

	const listProperties = useListProperties();
	const [properties, setProperties] = useState<Property[]>([]);
	const [loadingCategories, setLoadingCategories] = useState(false);
	const [loadingProperties, setLoadingProperties] = useState(false);

	useEffect(() => {
		if (visible) {
			loadData();
		}
	}, [visible]);

	useEffect(() => {
		if (editingItem && visible) {
			form.setFieldsValue({
				property: editingItem.property,
				name: editingItem.name,
				description: editingItem.description,
				quantity: editingItem.quantity,
				condition: editingItem.condition,
				category: editingItem.category.id,
				brand: editingItem.brand,
				model: editingItem.model,
				serialNumber: editingItem.serialNumber,
				purchaseDate: editingItem.purchaseDate
					? dayjs(editingItem.purchaseDate)
					: undefined,
				purchasePrice: editingItem.purchasePrice,
				notes: editingItem.notes
			});
		} else if (visible) {
			form.resetFields();
			form.setFieldsValue({
				quantity: 1,
				condition: "good"
			});
		}
	}, [editingItem, visible, form]);

	const loadData = async () => {
		setLoadingCategories(true);
		setLoadingProperties(true);

		try {
			await Promise.all([listCategories(), loadProperties()]);
		} catch (error) {
			messageApi.error(intl.formatMessage({ id: "page.inventory.error.load" }));
		} finally {
			setLoadingCategories(false);
			setLoadingProperties(false);
		}
	};

	const loadProperties = async () => {
		try {
			const response = await listProperties();
			setProperties(response?.items || []);
		} catch (error) {
			messageApi.error(intl.formatMessage({ id: "page.inventory.error.load" }));
		}
	};

	const handleSubmit = async (values: any) => {
		try {
			const selectedProperty = properties.find((p) => p.id === values.property);

			if (!selectedProperty) {
				messageApi.error(
					intl.formatMessage({ id: "page.inventory.form.property.required" })
				);
				return;
			}

			const itemData = {
				id: editingItem?.id || "",
				property: values.property,
				propertyTitle: selectedProperty.title,
				propertyCode: selectedProperty.code,
				category: categories.items.find(
					(c: InventoryCategory) => c.id === values.category
				)!,
				name: values.name,
				description: values.description || "",
				quantity: values.quantity,
				condition: values.condition,
				brand: values.brand || "",
				model: values.model || "",
				serialNumber: values.serialNumber || "",
				purchaseDate: values.purchaseDate
					? values.purchaseDate.format("YYYY-MM-DD")
					: null,
				purchasePrice: values.purchasePrice
					? Number(values.purchasePrice)
					: null,
				notes: values.notes || ""
			};

			onSubmit(itemData);
		} catch (error) {
			messageApi.error(intl.formatMessage({ id: "page.inventory.error.save" }));
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};

	return (
		<>
			{contextHolder}
			<Modal
				title={
					<Title level={4}>
						{title ||
							(editingItem
								? intl.formatMessage({ id: "page.inventory.edit-item" })
								: intl.formatMessage({ id: "page.inventory.add-item" }))}
					</Title>
				}
				open={visible}
				onCancel={handleCancel}
				footer={null}
				width={800}
				css={styles.modal}
				destroyOnClose
				centered
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					initialValues={{
						quantity: 1,
						condition: "good"
					}}
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.property.label"
								})}
								name="property"
								rules={[
									{
										required: true,
										message: intl.formatMessage({
											id: "page.inventory.form.property.required"
										})
									}
								]}
								css={styles.formItem}
							>
								<Select
									placeholder={intl.formatMessage({
										id: "page.inventory.form.property.placeholder"
									})}
									loading={loadingProperties}
									showSearch
									filterOption={(input, option) =>
										(option?.children as unknown as string)
											?.toLowerCase()
											.includes(input.toLowerCase())
									}
								>
									{properties.map((property) => (
										<Option key={property.id} value={property.id}>
											<div css={styles.propertyOption}>
												<span>{property.title}</span>
												<Text css={styles.propertyCode}>({property.code})</Text>
											</div>
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.category.label"
								})}
								name="category"
								rules={[
									{
										required: true,
										message: intl.formatMessage({
											id: "page.inventory.form.category.required"
										})
									}
								]}
								css={styles.formItem}
							>
								<Select
									placeholder={intl.formatMessage({
										id: "page.inventory.form.category.placeholder"
									})}
									loading={loadingCategories}
								>
									{categories.items.map((category: InventoryCategory) => (
										<Option key={category.id} value={category.id}>
											{category.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={16}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.name.label"
								})}
								name="name"
								rules={[
									{
										required: true,
										message: intl.formatMessage({
											id: "page.inventory.form.name.required"
										})
									}
								]}
								css={styles.formItem}
							>
								<Input
									placeholder={intl.formatMessage({
										id: "page.inventory.form.name.placeholder"
									})}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.quantity.label"
								})}
								name="quantity"
								rules={[
									{
										required: true,
										message: intl.formatMessage({
											id: "page.inventory.form.quantity.required"
										})
									}
								]}
								css={styles.formItem}
							>
								<InputNumber
									min={1}
									style={{ width: "100%" }}
									placeholder={intl.formatMessage({
										id: "page.inventory.form.quantity.placeholder"
									})}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label={intl.formatMessage({
							id: "page.inventory.form.description.label"
						})}
						name="description"
						css={styles.formItem}
					>
						<TextArea
							rows={3}
							placeholder={intl.formatMessage({
								id: "page.inventory.form.description.placeholder"
							})}
						/>
					</Form.Item>

					<Row gutter={16}>
						<Col span={8}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.condition.label"
								})}
								name="condition"
								rules={[
									{
										required: true,
										message: intl.formatMessage({
											id: "page.inventory.form.condition.required"
										})
									}
								]}
								css={styles.formItem}
							>
								<Select
									placeholder={intl.formatMessage({
										id: "page.inventory.form.condition.placeholder"
									})}
								>
									<Option value="excellent">
										{intl.formatMessage({
											id: "page.inventory.condition.excellent"
										})}
									</Option>
									<Option value="good">
										{intl.formatMessage({
											id: "page.inventory.condition.good"
										})}
									</Option>
									<Option value="fair">
										{intl.formatMessage({
											id: "page.inventory.condition.fair"
										})}
									</Option>
									<Option value="poor">
										{intl.formatMessage({
											id: "page.inventory.condition.poor"
										})}
									</Option>
									<Option value="damaged">
										{intl.formatMessage({
											id: "page.inventory.condition.damaged"
										})}
									</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.brand.label"
								})}
								name="brand"
								css={styles.formItem}
							>
								<Input
									placeholder={intl.formatMessage({
										id: "page.inventory.form.brand.placeholder"
									})}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.model.label"
								})}
								name="model"
								css={styles.formItem}
							>
								<Input
									placeholder={intl.formatMessage({
										id: "page.inventory.form.model.placeholder"
									})}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.serialNumber.label"
								})}
								name="serialNumber"
								css={styles.formItem}
							>
								<Input
									placeholder={intl.formatMessage({
										id: "page.inventory.form.serialNumber.placeholder"
									})}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.purchaseDate.label"
								})}
								name="purchaseDate"
								css={styles.formItem}
							>
								<DatePicker
									style={{ width: "100%" }}
									placeholder={intl.formatMessage({
										id: "page.inventory.form.purchaseDate.placeholder"
									})}
									format="YYYY-MM-DD"
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label={intl.formatMessage({
									id: "page.inventory.form.purchasePrice.label"
								})}
								name="purchasePrice"
								css={styles.formItem}
							>
								<InputNumber
									style={{ width: "100%" }}
									placeholder={intl.formatMessage({
										id: "page.inventory.form.purchasePrice.placeholder"
									})}
									min={0}
									precision={2}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label={intl.formatMessage({
							id: "page.inventory.form.notes.label"
						})}
						name="notes"
						css={styles.formItem}
					>
						<TextArea
							rows={3}
							placeholder={intl.formatMessage({
								id: "page.inventory.form.notes.placeholder"
							})}
						/>
					</Form.Item>

					<Form.Item css={styles.formItem}>
						<Row gutter={16} justify="end">
							<Col>
								<Button onClick={handleCancel}>
									{intl.formatMessage({ id: "page.inventory.form.cancel" })}
								</Button>
							</Col>
							<Col>
								<Button
									type="primary"
									htmlType="submit"
									icon={<SaveOutlined />}
									loading={loading}
								>
									{editingItem
										? intl.formatMessage({ id: "page.inventory.form.update" })
										: intl.formatMessage({ id: "page.inventory.form.save" })}
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default InventoryModalForm;
