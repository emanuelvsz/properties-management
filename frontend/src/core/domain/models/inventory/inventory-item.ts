import { Model } from "../model";
import { InventoryCategory } from "./inventory-category";

class InventoryItem extends Model {
	#id: string;
	#property: string;
	#propertyTitle: string;
	#propertyCode: string;
	#category: InventoryCategory;
	#name: string;
	#description?: string;
	#quantity: number;
	#condition: string;
	#brand?: string;
	#model?: string;
	#serialNumber?: string;
	#purchaseDate?: string;
	#purchasePrice?: number;
	#notes?: string;

	constructor(
		id: string,
		property: string,
		propertyTitle: string,
		propertyCode: string,
		category: InventoryCategory,
		name: string,
		quantity: number,
		condition: string,
		description?: string,
		brand?: string,
		model?: string,
		serialNumber?: string,
		purchaseDate?: string,
		purchasePrice?: number,
		notes?: string
	) {
		super();
		this.#id = id;
		this.#property = property;
		this.#propertyTitle = propertyTitle;
		this.#propertyCode = propertyCode;
		this.#category = category;
		this.#name = name;
		this.#description = description;
		this.#quantity = quantity;
		this.#condition = condition;
		this.#brand = brand;
		this.#model = model;
		this.#serialNumber = serialNumber;
		this.#purchaseDate = purchaseDate;
		this.#purchasePrice = purchasePrice;
		this.#notes = notes;
	}

	static fromForm(formData: any): InventoryItem {
		return new InventoryItem(
			formData.id,
			formData.property,
			formData.propertyTitle,
			formData.propertyCode,
			formData.category,
			formData.name,
			formData.quantity,
			formData.condition,
			formData.description,
			formData.brand,
			formData.model,
			formData.serialNumber,
			formData.purchaseDate,
			formData.purchasePrice,
			formData.notes
		);
	}

	public toJSON() {
		return {
			id: this.#id,
			property: this.#property,
			propertyTitle: this.#propertyTitle,
			propertyCode: this.#propertyCode,
			category: this.#category,
			name: this.#name,
			description: this.#description,
			quantity: this.#quantity,
			condition: this.#condition,
			brand: this.#brand,
			model: this.#model,
			serialNumber: this.#serialNumber,
			purchaseDate: this.#purchaseDate,
			purchasePrice: this.#purchasePrice,
			notes: this.#notes
		};
	}

	get id() {
		return this.#id;
	}

	get property() {
		return this.#property;
	}

	get propertyTitle() {
		return this.#propertyTitle;
	}

	get propertyCode() {
		return this.#propertyCode;
	}

	get category() {
		return this.#category;
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description ?? "";
	}

	get quantity() {
		return this.#quantity;
	}

	get condition() {
		return this.#condition;
	}

	get brand() {
		return this.#brand ?? "";
	}

	get model() {
		return this.#model ?? "";
	}

	get serialNumber() {
		return this.#serialNumber ?? "";
	}

	get purchaseDate() {
		return this.#purchaseDate ?? "";
	}

	get purchasePrice() {
		return this.#purchasePrice;
	}

	get notes() {
		return this.#notes ?? "";
	}

	get formattedPurchasePrice() {
		return this.#purchasePrice ? `$${this.#purchasePrice.toFixed(2)}` : "N/A";
	}

	get conditionLabel() {
		const conditions = {
			excellent: "Excelente",
			good: "Bom",
			fair: "Regular",
			poor: "Ruim",
			damaged: "Danificado"
		};
		return (
			conditions[this.#condition as keyof typeof conditions] || this.#condition
		);
	}

	get summary() {
		return `${this.#name} - ${this.#category.name} (${this.#quantity}x)`;
	}
}

export { InventoryItem };
