import AuthService from "@core/services/auth.service";
import AuthInMemory from "@infra/in-memory/auth";

export type ServiceKeys = "auth";

const DIContainer = {
	getAuthUseCase: () => new AuthService(new AuthInMemory())
};

export default DIContainer;
