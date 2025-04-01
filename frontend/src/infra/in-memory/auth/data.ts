const createMockedAccount = () => ({
	id: 1,
	profile: {
		id: 1,
		name: "Test User",
		birth_date: "2000-01-01",
		cpf: "12312312312",
		email: "user@test.com",
		phone: "11911111111",
		created_at: "2000-01-01T00:00:00",
		updated_at: "2000-01-01T00:00:00"
	},
	role: [
		{
			id: 1,
			name: "Administrador",
			code: "ADMIN"
		}
	]
});

export { createMockedAccount };
