import { Person } from "./person";
import { DTO } from "../../types/index";
import { Mapper } from "../mapper";

class PersonMapper extends Mapper<Person> {
	deserialize(data: DTO): Person {
		const id = String(data.id);
		const birthDate = String(data.birthDate);
		const cpf = String(data.cpf);
		const email = String(data.email);
		const name = String(data.name);
		const phone = String(data.phone);
		return new Person(id, birthDate, cpf, email, name, phone);
	}

	serialize(data: Person): DTO {
		return {
			id: data.id,
			birthDate: data.birthDate,
			cpf: data.cpf,
			email: data.email,
			name: data.name,
			phone: data.phone
		};
	}
}

export { PersonMapper };
