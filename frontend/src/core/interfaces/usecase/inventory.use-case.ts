import { InventoryItem } from "@core/domain/models/inventory";
import { InventoryCategory } from "@core/domain/models/inventory";
import { Pagination } from "@core/domain/models/pagination";

interface InventoryUseCase {
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

export default InventoryUseCase;
