import AuthService from "@core/services/auth.service";
import PropertyService from "@core/services/property.service";
import AuthAPI from "@infra/api/auth";
import PropertyAPI from "@infra/api/property";

export type ServiceKeys = "auth";

const DIContainer = {
	getAuthUseCase: () => new AuthService(new AuthAPI()),
	getPropertyUseCase: () => new PropertyService(new PropertyAPI())
};

export default DIContainer;
