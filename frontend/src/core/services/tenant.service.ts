import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { Tenant } from "@core/domain/models/tenant";
import TenantUseCase from "@core/interfaces/usecase/tenant.use-case";
import TenantRepository from "@core/interfaces/repository/tenant.repository";

class TenantService implements TenantUseCase {
	constructor(protected readonly adapter: TenantRepository) {}

	async list(filters?: DefaultFilters): Promise<Tenant[]> {
		return await this.adapter.list(filters);
	}

}

export default TenantService;
