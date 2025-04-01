export enum ErrorType {
	CONFLICT = "conflict",
	UNAUTHORIZED = "unauthorized",
	UNPROCESSABLE_ENTITY = "unprocessable-entity",
	UNKNOWN = "unknown",
	BAD_REQUEST = "bad-request"
}

class AppError extends Error {
	#type!: ErrorType;

	static messages = {
		NOT_FOUND: "O item requisitado não foi encontrado.",
		UNEXPECTED: "Um erro inesperado ocorreu. Por favor, contate o suporte.",
		UNAVAILABLE_SERVICE:
			"Não foi possível conectar aos nossos servidores. Por favor, tente novamente mais tarde."
	};

	constructor(message: string) {
		super(message);
		this.#type = ErrorType.UNKNOWN;
		this.name = "AppError";
	}

	get type(): ErrorType {
		return this.#type;
	}

	get isConflict(): boolean {
		return this.#type === ErrorType.CONFLICT;
	}

	get isUnauthorized(): boolean {
		return this.#type === ErrorType.UNAUTHORIZED;
	}

	get isUnprocessableEntity(): boolean {
		return this.#type === ErrorType.UNPROCESSABLE_ENTITY;
	}

	get isUnknown(): boolean {
		return this.#type === ErrorType.UNKNOWN;
	}

	get isBadRequest(): boolean {
		return this.#type === ErrorType.BAD_REQUEST;
	}

	static BadRequest(message: string): AppError {
		const error = new AppError(message);
		error.#type = ErrorType.BAD_REQUEST;
		return error;
	}

	static Conflict(message: string): AppError {
		const error = new AppError(message);
		error.#type = ErrorType.CONFLICT;
		return error;
	}

	static Unauthorized(message: string): AppError {
		const error = new AppError(message);
		error.#type = ErrorType.UNAUTHORIZED;
		return error;
	}

	static UnprocessableEntity(message: string): AppError {
		const error = new AppError(message);
		error.#type = ErrorType.UNPROCESSABLE_ENTITY;
		return error;
	}

	static Unknown(message: string = AppError.messages.UNEXPECTED): AppError {
		const error = new AppError(message);
		error.#type = ErrorType.UNKNOWN;
		return error;
	}
}

export default AppError;
