import AuthService from "@core/services/auth.service";
import DashboardService from "@core/services/dashboard.service";
import ExpenseService from "@core/services/expense.service";
import PropertyService from "@core/services/property.service";
import TenantService from "@core/services/tenant.service";
import AuthAPI from "@infra/api/auth";
import DashboardAPI from "@infra/api/dashboard";
import ExpenseAPI from "@infra/api/expense";
import PropertyAPI from "@infra/api/property";
import TenantAPI from "@infra/api/tenant";

export type ServiceKeys = "auth";

const DIContainer = {
	getAuthUseCase: () => new AuthService(new AuthAPI()),
	getPropertyUseCase: () => new PropertyService(new PropertyAPI()),
	getExpenseUseCase: () => new ExpenseService(new ExpenseAPI),
	getDashboardUseCase: () => new DashboardService(new DashboardAPI),
	getTenantUseCase: () => new TenantService(new TenantAPI)
};

export default DIContainer;
