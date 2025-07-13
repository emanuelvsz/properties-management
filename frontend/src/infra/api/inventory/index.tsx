import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { InventoryItemMapper } from "@core/domain/models/inventory/inventory-item.mapper";
import { InventoryCategoryMapper } from "@core/domain/models/inventory/inventory-category.mapper";
import { Pagination } from "@core/domain/models/pagination";
import InventoryRepository from "@core/interfaces/repository/inventory.repository";
import { BackendClient } from "../clients";

class InventoryApi implements InventoryRepository {
	mapper = new InventoryItemMapper();
	categoryMapper = new InventoryCategoryMapper();

	async list(params: {
		propertyId?: string;
		categoryId?: string;
		q?: string;
		condition?: string;
		orderBy?: string;
		page?: number;
	}): Promise<Pagination<InventoryItem>> {
		const searchParams = new URLSearchParams();

		if (params.propertyId)
			searchParams.append("property_id", params.propertyId);
		if (params.categoryId)
			searchParams.append("category_id", params.categoryId);
		if (params.q) searchParams.append("q", params.q);
		if (params.condition) searchParams.append("condition", params.condition);
		if (params.orderBy) searchParams.append("order_by", params.orderBy);
		if (params.page) searchParams.append("page", params.page.toString());

		const response = await BackendClient.get(
			`inventory/?${searchParams.toString()}`
		);

		return new Pagination<InventoryItem>(
			response.data.page,
			response.data.page_size,
			response.data.count,
			response.data.total,
			response.data.data.map((item: any) => this.mapper.deserialize(item))
		);
	}

	async getById(id: string): Promise<InventoryItem> {
		const response = await BackendClient.get(`inventory/${id}/`);
		return this.mapper.deserialize(response.data);
	}

	async create(data: InventoryItem): Promise<void> {
		const payload = this.mapper.serialize(data);
		await BackendClient.post("inventory/", payload);
	}

	async update(data: InventoryItem): Promise<void> {
		const payload = this.mapper.serialize(data);
		await BackendClient.put(`inventory/${data.id}/`, payload);
	}

	async delete(id: string): Promise<void> {
		await BackendClient.delete(`inventory/${id}/`);
	}

	async getPropertyInventory(
		propertyId: string,
		params: {
			categoryId?: string;
			q?: string;
			condition?: string;
			orderBy?: string;
			page?: number;
		}
	): Promise<Pagination<InventoryItem>> {
		const searchParams = new URLSearchParams();

		if (params.categoryId)
			searchParams.append("category_id", params.categoryId);
		if (params.q) searchParams.append("q", params.q);
		if (params.condition) searchParams.append("condition", params.condition);
		if (params.orderBy) searchParams.append("order_by", params.orderBy);
		if (params.page) searchParams.append("page", params.page.toString());

		const response = await BackendClient.get(
			`properties/${propertyId}/inventory/?${searchParams.toString()}`
		);

		return new Pagination<InventoryItem>(
			response.data.page,
			response.data.page_size,
			response.data.count,
			response.data.total,
			response.data.data.map((item: any) => this.mapper.deserialize(item))
		);
	}

	async listCategories(): Promise<Pagination<InventoryCategory>> {
		const response = await BackendClient.get("inventory/categories/");

		return new Pagination<InventoryCategory>(
			1,
			response.data.length,
			response.data.length,
			response.data.length,
			response.data.map((category: any) =>
				this.categoryMapper.deserialize(category)
			)
		);
	}
}

export const inventoryApi = new InventoryApi();
