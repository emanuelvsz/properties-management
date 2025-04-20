import { Mapper } from "@core/domain/models/mapper";
import { Tenant } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";


interface TenantRepository {
	mapper: Mapper<Tenant>;

    list(filters?: DefaultFilters): Promise<Tenant[]>;
}

export default TenantRepository;
