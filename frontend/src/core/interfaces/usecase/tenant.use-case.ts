import { Tenant } from "@core/domain/models/tenant";
import { DefaultFilters } from "@core/domain/types/filters/default-filters";

abstract class TenantUseCase {
    abstract list(filters?: DefaultFilters): Promise<Tenant[]>;
}

export default TenantUseCase;
