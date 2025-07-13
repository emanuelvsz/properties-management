import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { Pagination } from "@core/domain/models/pagination";
import InventoryRepository from "@core/interfaces/repository/inventory.repository";

export class InventoryService {
	constructor(private repository: InventoryRepository) {}

	async list(params: {
		propertyId?: string;
		categoryId?: string;
		q?: string;
		condition?: string;
		orderBy?: string;
		page?: number;
	}): Promise<Pagination<InventoryItem>> {
		return this.repository.list(params);
	}

	async getById(id: string): Promise<InventoryItem> {
		return this.repository.getById(id);
	}

	async create(data: InventoryItem): Promise<void> {
		return this.repository.create(data);
	}

	async update(data: InventoryItem): Promise<void> {
		return this.repository.update(data);
	}

	async delete(id: string): Promise<void> {
		return this.repository.delete(id);
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
		return this.repository.getPropertyInventory(propertyId, params);
	}

	async listCategories(): Promise<Pagination<InventoryCategory>> {
		return this.repository.listCategories();
	}
}
