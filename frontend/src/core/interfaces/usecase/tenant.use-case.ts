import { Tenant } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";

abstract class TenantUseCase {
	abstract list(filters?: DefaultFilters): Promise<Tenant[]>;
	abstract delete(id: string): Promise<void>;
	abstract create(data: Tenant): Promise<void>;
	abstract update(data: Tenant): Promise<void>;
	abstract listByID(id: string): Promise<Tenant>;
}

export default TenantUseCase;
