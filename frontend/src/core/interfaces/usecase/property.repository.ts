import { Property } from "@core/domain/models/property";

abstract class PropertyUseCase {
	abstract list(): Promise<Property[]>;
}

export default PropertyUseCase;
