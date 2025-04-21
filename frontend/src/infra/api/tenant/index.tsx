import { BackendClient } from "../clients";
import { DTO } from "@core/domain/types";
import TenantRepository from "@core/interfaces/repository/tenant.repository";
import { Tenant, TenantMapper } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";

class TenantAPI implements TenantRepository {
	mapper = new TenantMapper();

	async list(filters?: DefaultFilters): Promise<Tenant[]> {
		const response = await BackendClient.get<DTO[]>("/tenants", {
			params: filters
		});
		const tenantsDTOs = response.data;
		return tenantsDTOs.map((dto) => this.mapper.deserialize(dto));
	}

	async listByID(id: string): Promise<Tenant> {
		const response = await BackendClient.get<DTO>(`/tenants/${id}`);
		return this.mapper.deserialize(response.data);
	}

	async create(data: Tenant): Promise<void> {
		await BackendClient.post("/tenants", data.toJSON());
	}

	async delete(id: string): Promise<void> {
		await BackendClient.delete(`/tenants/${id}`);
	}

	async update(data: Tenant): Promise<void> {
		await BackendClient.patch(`/tenants/${data.id}`, data.toJSON());
	}
}

export default TenantAPI;
