import AuthService from "@core/services/auth.service";
import ExpenseService from "@core/services/expense.service";
import PropertyService from "@core/services/property.service";
import AuthAPI from "@infra/api/auth";
import ExpenseAPI from "@infra/api/expense";
import PropertyAPI from "@infra/api/property";

export type ServiceKeys = "auth";

const DIContainer = {
	getAuthUseCase: () => new AuthService(new AuthAPI()),
	getPropertyUseCase: () => new PropertyService(new PropertyAPI()),
	getExpenseUseCase: () => new ExpenseService(new ExpenseAPI)
};

export default DIContainer;
