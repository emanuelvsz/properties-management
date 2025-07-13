import { InventoryItem } from "./inventory-item";
import { InventoryCategoryMapper } from "./inventory-category.mapper";
import { Mapper } from "../mapper";
import { DTO } from "@core/domain/types";

export class InventoryItemMapper implements Mapper<InventoryItem> {
	deserialize(data: DTO): InventoryItem {
		return new InventoryItem(
			data.id as string,
			data.property as string,
			data.property_title as string,
			data.property_code as string,
			InventoryCategoryMapper.toDomain(data.category),
			data.name as string,
			data.quantity as number,
			data.condition as string,
			data.description as string,
			data.brand as string,
			data.model as string,
			data.serial_number as string,
			data.purchase_date as string,
			data.purchase_price ? Number(data.purchase_price) : undefined,
			data.notes as string
		);
	}

	serialize(data: InventoryItem): DTO {
		return {
			id: data.id,
			property: data.property,
			category: data.category.id,
			name: data.name,
			description: data.description,
			quantity: data.quantity,
			condition: data.condition,
			brand: data.brand,
			model: data.model,
			serial_number: data.serialNumber,
			purchase_date: data.purchaseDate,
			purchase_price: data.purchasePrice,
			notes: data.notes
		};
	}

	static toDomain(raw: any): InventoryItem {
		return new InventoryItem(
			raw.id,
			raw.property,
			raw.property_title,
			raw.property_code,
			InventoryCategoryMapper.toDomain(raw.category),
			raw.name,
			raw.quantity,
			raw.condition,
			raw.description,
			raw.brand,
			raw.model,
			raw.serial_number,
			raw.purchase_date,
			raw.purchase_price ? Number(raw.purchase_price) : undefined,
			raw.notes
		);
	}

	static toPersistence(entity: InventoryItem): any {
		return {
			id: entity.id,
			property: entity.property,
			category: entity.category.id,
			name: entity.name,
			description: entity.description,
			quantity: entity.quantity,
			condition: entity.condition,
			brand: entity.brand,
			model: entity.model,
			serial_number: entity.serialNumber,
			purchase_date: entity.purchaseDate,
			purchase_price: entity.purchasePrice,
			notes: entity.notes
		};
	}
}
