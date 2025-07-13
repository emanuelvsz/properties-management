import { DefaultFilters } from "@core/domain/types/filters/default-filters";
import { Tenant } from "@core/domain/models/tenant";
import TenantUseCase from "@core/interfaces/usecase/tenant.use-case";
import TenantRepository from "@core/interfaces/repository/tenant.repository";

class TenantService implements TenantUseCase {
	constructor(protected readonly adapter: TenantRepository) {}

	async list(filters?: DefaultFilters): Promise<Tenant[]> {
		return await this.adapter.list(filters);
	}

	async listByID(id: string): Promise<Tenant> {
		return await this.adapter.listByID(id);
	}

	async create(data: Tenant): Promise<void> {
		return await this.adapter.create(data);
	}

	async delete(id: string): Promise<void> {
		return await this.adapter.delete(id);
	}

	async update(data: Tenant): Promise<void> {
		return await this.adapter.update(data);
	}
}

export default TenantService;
