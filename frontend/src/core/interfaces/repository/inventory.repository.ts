import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { Mapper } from "@core/domain/models/mapper";
import { Pagination } from "@core/domain/models/pagination";

interface InventoryRepository {
	mapper: Mapper<InventoryItem>;
	categoryMapper: Mapper<InventoryCategory>;
	list(params: {
		propertyId?: string;
		categoryId?: string;
		q?: string;
		condition?: string;
		orderBy?: string;
		page?: number;
	}): Promise<Pagination<InventoryItem>>;
	getById(id: string): Promise<InventoryItem>;
	create(data: InventoryItem): Promise<void>;
	update(data: InventoryItem): Promise<void>;
	delete(id: string): Promise<void>;
	getPropertyInventory(
		propertyId: string,
		params: {
			categoryId?: string;
			q?: string;
			condition?: string;
			orderBy?: string;
			page?: number;
		}
	): Promise<Pagination<InventoryItem>>;
	listCategories(): Promise<Pagination<InventoryCategory>>;
}

export default InventoryRepository;
