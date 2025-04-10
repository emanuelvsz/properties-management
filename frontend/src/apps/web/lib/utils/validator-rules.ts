import { Rule } from "antd/es/form";
import CPFValidator from "cpf";
import emailValidator from "email-validator";
import { isNaN, isNil } from "lodash";

import { formatDate, formatDateToObject } from "./date";

export function requiredRule(): Rule {
	return { required: true, message: "Este campo é obrigatório!" };
}

export function maxLengthRule(maxLength: number): Rule {
	return () => ({
		validator(_, value) {
			if (maxLength < value.length) {
				return Promise.reject(
					new Error(`O limite é de ${maxLength} caracteres!`)
				);
			}
			return Promise.resolve();
		}
	});
}

export function minLengthRule(minLength: number): Rule {
	return () => ({
		validator(_, value) {
			if (minLength > value.length) {
				return Promise.reject(
					new Error(`Insira pelo menos ${minLength} caracteres!`)
				);
			}
			return Promise.resolve();
		}
	});
}

export function maxValueRule(maxValue: number): Rule {
	return () => ({
		validator(_, value) {
			if (isNaN(value)) {
				return Promise.reject(new Error("Valor inválido!"));
			}
			if (maxValue < Number(value)) {
				return Promise.reject(new Error(`O valor máximo é ${maxValue}!`));
			}
			return Promise.resolve();
		}
	});
}

export function minValueRule(minValue: number): Rule {
	return () => ({
		validator(_, value) {
			if (isNaN(value)) {
				return Promise.reject(new Error("Valor inválido!"));
			}
			if (minValue > Number(value)) {
				return Promise.reject(new Error(`O valor mínimo é ${minValue}!`));
			}
			return Promise.resolve();
		}
	});
}

export function lengthRule(length: number): Rule {
	return () => ({
		validator(_, value) {
			if (length !== value.length) {
				return Promise.reject(
					new Error(`Você precisa inserir ${length} caracteres!`)
				);
			}
			return Promise.resolve();
		}
	});
}

export function CPFRule(): Rule {
	return () => ({
		validator(_, value) {
			if (!CPFValidator.isValid(value)) {
				return Promise.reject(new Error(`CPF inválido!`));
			}
			return Promise.resolve();
		}
	});
}

export function birthDateRule(): Rule {
	return () => ({
		validator(_, value) {
			const [day, month, year] = value.split("/");
			const dateObj = new Date(`${year}-${month}-${day}`);
			if (dateObj > new Date() || dateObj < new Date(`1870-01-01`)) {
				return Promise.reject(new Error("Data de nascimento inválida!"));
			}
			return Promise.resolve();
		}
	});
}

export function CEPRule(): Rule {
	return () => ({
		validator(_, value) {
			if (value.match(/^\d{5}-\d{3}$/) === null) {
				return Promise.reject(new Error("CEP inválido!"));
			}
			return Promise.resolve();
		}
	});
}

export function futureDateRule(): Rule {
	return () => ({
		validator(_, value) {
			const date = formatDateToObject(formatDate(value, "YYYY-MM-DD"));
			if (isNil(date)) {
				return Promise.reject(new Error("Data inválida!"));
			}
			if (date <= new Date()) {
				return Promise.reject(
					new Error("Você precisa fornecer uma data futura!")
				);
			}
			return Promise.resolve();
		}
	});
}

export function emailRule(): Rule {
	return () => ({
		validator(_, value) {
			if (!emailValidator.validate(value)) {
				return Promise.reject(new Error("Email inválido!"));
			}
			return Promise.resolve();
		}
	});
}

export function confirmPasswordRule(passwordFieldName: string): Rule {
	return ({ getFieldValue }) => ({
		validator(_, value) {
			if (!value || getFieldValue(passwordFieldName) === value) {
				return Promise.resolve();
			}
			return Promise.reject(new Error("The passwords provided are not the same!"));
		}
	});
}

export function pastDateRule(): Rule {
	return () => ({
		validator(_, value) {
			const date = formatDateToObject(formatDate(value, "YYYY-MM-DD"));
			if (isNil(date)) {
				return Promise.reject(new Error("Invalid date!"));
			}
			if (date >= new Date()) {
				return Promise.reject(
					new Error("You need to provide a past date!")
				);
			}
			return Promise.resolve();
		}
	});
}
