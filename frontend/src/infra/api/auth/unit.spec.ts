import { RequestInterceptor } from "@core/utils/tests";
import AuthAPI from "@infra/api/auth";

const api = new AuthAPI();

describe("AuthAPI.login", () => {
	const mockedUsername = "username@test.com";
	const mockedPassword = "12345678";

	afterEach(() => jest.clearAllMocks());

	it("should return a logged user when passing valid credentials", async () => {
		RequestInterceptor.default.post("/auth/login", {
			data: { access_token: "" }
		});

		const response = await api.login(mockedUsername, mockedPassword);

		expect(response).toBeTruthy();
	});

	it('should return a "Invalid Credentials" error when passing invalid credentials', async () => {
		RequestInterceptor.default.post("/auth/login", {
			statusCode: 400,
			error: new Error("Invalid Credentials")
		});

		await expect(api.login(mockedUsername, mockedPassword)).rejects.toThrow(
			"Invalid Credentials"
		);
	});
});
