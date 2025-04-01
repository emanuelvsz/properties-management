export type MaskType =
	| "br_cpf"
	| "br_hidden_cpf"
	| "br_rg"
	| "br_phone"
	| "br_residential_phone"
	| "br_sus"
	| "br_date"
	| "zip_code"
	| "time"
	| "number";

/**
 * A function to format the text that will be filled in on the FormInput.
 */
type MaskFn = (_?: string) => string;

/**
 * Applies Brazilian CPF pattern "000.000.000-00" to a given text.
 *
 * @param text the text to apply the CPF mask
 * @example
 * maskBRCPF("12345678901") // 123.456.789-01
 * @example
 * maskBRCPF("123456789") // 123.456.789
 * @example
 * maskBRCPF("123456") // 123.456
 * @example
 * maskBRCPF("123") // 123
 */
function maskBRCPF(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})/, "$1-$2")
			.replace(/(-\d{2})\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies a protected Brazilian CPF pattern "000.***.***-00" (with asterisks in the middle six numbers) to a given text.
 * It's useful when following Brazilian LGPD rules to don't expose the complete sensitive data.
 *
 * @param text the text to apply the CPF mask
 * @example
 * maskBRHiddenCPF("12345678901") // 123.***.***-01
 * @example
 * maskBRHiddenCPF("123456789") // 123.***.***
 * @example
 * maskBRHiddenCPF("123456") // 123.***
 * @example
 * maskBRHiddenCPF("123") // 123
 */
function maskBRHiddenCPF(text?: string): string {
	return `${text?.slice(0, 3)}.***.***-${text?.slice(9, 11)}`;
}

/**
 * Applies Brazilian RG pattern "0000000-0" to a given text.
 *
 * @param text the text to apply the RG mask
 * @example
 * maskBRRG("1234567") // 123456-7
 * @example
 * maskBRRG("123456") // 123456
 */
function maskBRRG(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{7})(\d)/, "$1-$2")
			.replace(/(-\d)\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies Brazilian Phone pattern "(00) 00000-0000" to a given text.
 *
 * @param text the text to apply the Brazilian Phone mask
 * @example
 * maskBRPhone("12345678901") // (12) 34567-8901
 * @example
 * maskBRPhone("1234567") // (12) 34567
 * @example
 * maskBRPhone("123") // (12) 3
 */
function maskBRPhone(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{5})(\d)/, "$1-$2")
			.replace(/(-\d{4})\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies Brazilian Residential Phone pattern "(00) 0000-0000" to a given text.
 *
 * @param text the text to apply the Brazilian Residential Phone mask
 * @example
 * maskBRResidentialPhone("123456-7890") // (12) 3456-7890
 * @example
 * maskBRResidentialPhone("1234567") // (12) 3456-7
 * @example
 * maskBRResidentialPhone("123") // (12) 3
 */
function maskBRResidentialPhone(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{4})(\d)/, "$1-$2")
			.replace(/(-\d{4})\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies Brazilian SUS (Sistema Único de Saúde) Card Number pattern "000 000 000 000 000" to a given text.
 *
 * @param text the text to apply the Brazilian SUS (Sistema Único de Saúde) card number mask
 * @example
 * maskBRSUSCard("123456789012345") // 123 456 789 012 345
 * @example
 * maskBRSUSCard("12345678901") // 123 456 789 01
 * @example
 * maskBRSUSCard("12345678") // 123 456 78
 * @example
 * maskBRSUSCard("12345") // 123 45
 */
function maskBRSUSCard(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{3})(\d)/, "$1 $2")
			.replace(/(\d{3})(\d)/, "$1 $2")
			.replace(/(\d{3})(\d)/, "$1 $2")
			.replace(/(\d{3})(\d)/, "$1 $2")
			.replace(/( \d{3})\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies Brazilian date pattern "DD/MM/YYYY" to a given text.
 *
 * @param text the text to apply the Brazilian date mask
 * @example
 * maskBRDate("01012000") // 01/01/2000
 * @example
 * maskBRDate("0101") // 01/01
 * @example
 * maskBRDate("01") // 01
 */
function maskBRDate(text?: string): string {
	if (!text) {
		return "";
	}
	const numbers = text?.split("/");
	if (numbers.length === 0) {
		return "";
	}
	let day;
	let month;
	switch (numbers.length) {
		case 1:
			day = Number(numbers[0]);
			if (numbers[0].length === 2 && day > 31) {
				return numbers[0][0];
			}
			break;
		case 2:
			day = Number(numbers[0]);
			month = Number(numbers[1]);
			if (numbers[1].length === 2 && month > 12) {
				return `${day}/${numbers[1][0]}`;
			}
			break;
		default:
			break;
	}
	return text
		?.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1/$2")
		.replace(/([0-2]\d)(\d)/, "$1/$2")
		.replace(/(\d{4})\d+?$/, "$1");
}

/**
 * Applies Zip Code pattern "00000-000" to a given text.
 *
 * @param text the text to apply the CEP mask
 * @example
 * maskZipCode("12345670") // 12345-678
 * @example
 * maskZipCode("12345") // 12345
 */
function maskZipCode(text?: string): string {
	return (
		text
			?.replace(/\D/g, "")
			.replace(/(\d{5})(\d{1,2})/, "$1-$2")
			.replace(/(-\d{3})\d+?$/, "$1") ?? ""
	);
}

/**
 * Applies Time (hour and minute) pattern "hh:mm" to a given text.
 *
 * @param text the text to apply the Time mask
 * @example
 * maskTime("2237") // 22:37
 * @example
 * maskTime("22") // 22
 * @example
 * maskTime("9999") //
 * @example
 * maskTime("24") // 2
 * @example
 * maskTime("23") // 23
 * @example
 * maskTime("23:6") // 23
 * @example
 * maskTime("23:5") // 23:5
 * @example
 * maskTime("2359") // 23:59
 */
function maskTime(text?: string): string {
	const numbers = text?.replace(/\D/g, "").replace(/(\d{4})/, "$1") ?? "";
	if (/^([3-9])/.test(numbers)) {
		// invalid hour start number (>= 3)
		return "";
	}
	if (/(?<=^2)([4-9])/.test(numbers)) {
		// invalid unit hour when it's more than 20 hours
		return numbers[0];
	}
	if (!/^\d{2}([0-5])/.test(numbers)) {
		return numbers.slice(0, 2);
	}
	return numbers.replace(/^(\d{2})(\d{1,2})/, "$1:$2");
}

/**
 * Applies Number pattern "\D" to a given text.
 *
 * @param text the text to apply the Number mask
 * @example
 * maskNumber("a") //
 * @example
 * maskNumber("1a") // 1
 */
function maskNumber(text?: string): string {
	return text?.replace(/\D/g, "") ?? "";
}

const masks: Record<MaskType, MaskFn> = {
	br_cpf: maskBRCPF,
	br_hidden_cpf: maskBRHiddenCPF,
	br_rg: maskBRRG,
	br_phone: maskBRPhone,
	br_residential_phone: maskBRResidentialPhone,
	br_sus: maskBRSUSCard,
	br_date: maskBRDate,
	zip_code: maskZipCode,
	time: maskTime,
	number: maskNumber
};

/**
 * Return a mask function by name.
 */
function getMask(name?: MaskType): MaskFn | undefined {
	if (!name) {
		return undefined;
	}
	return masks[name];
}

const removeBRCPFMask = (cpf?: string) => cpf?.replace(/[.|-]/g, "") ?? "";
const removeBRSUSCardMask = (susCard?: string) =>
	susCard?.replace(/\./g, "") ?? "";
const removeBRPhoneMask = (phone?: string) =>
	phone?.replace(/[ ().|-]/g, "") ?? "";
const removeZipCodeMask = (cep?: string) => cep?.replace(/[.|-]/g, "") ?? "";

export {
	getMask,
	maskBRCPF,
	maskBRDate,
	maskBRHiddenCPF,
	maskBRPhone,
	maskBRRG,
	maskBRResidentialPhone,
	maskBRSUSCard,
	maskNumber,
	maskTime,
	maskZipCode,
	removeBRCPFMask,
	removeBRPhoneMask,
	removeBRSUSCardMask,
	removeZipCodeMask
};
export type { MaskFn };
