import { DTO } from "../../types";
import { Mapper } from "../mapper";
import { Tenant } from "./tenant";

class TenantMapper extends Mapper<Tenant> {
	deserialize(data: DTO): Tenant {
		const id = String(data.id);
		const name = String(data.name);
		const birthDate = String(data.birthDate);
		const email = String(data.email);
		const phone = String(data.phone);

		return new Tenant(id, name, birthDate, email, phone);
	}

	serialize(data: Tenant): DTO {
		return {
			id: data.id,
			name: data.name,
			birthDate: data.birthDate,
			email: data.email,
			phone: data.phone,
		};
	}
}

export { TenantMapper };
