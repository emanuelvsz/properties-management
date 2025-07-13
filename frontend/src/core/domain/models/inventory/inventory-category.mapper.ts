import { InventoryCategory } from "./inventory-category";
import { Mapper } from "../mapper";
import { DTO } from "@core/domain/types";

export class InventoryCategoryMapper implements Mapper<InventoryCategory> {
	deserialize(data: DTO): InventoryCategory {
		return new InventoryCategory(
			data.id as string,
			data.name as string,
			data.description as string
		);
	}

	serialize(data: InventoryCategory): DTO {
		return {
			id: data.id,
			name: data.name,
			description: data.description
		};
	}
	static toDomain(raw: any): InventoryCategory {
		return new InventoryCategory(raw.id, raw.name, raw.description);
	}

	static toPersistence(entity: InventoryCategory): any {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description
		};
	}
}
