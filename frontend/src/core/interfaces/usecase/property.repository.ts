import { Property } from "@core/domain/models/property";

abstract class PropertyUseCase {
	abstract list(): Promise<Property[]>;
	abstract delete(id: string): Promise<void>;
	abstract create(data: Property): Promise<void>;
}

export default PropertyUseCase;
