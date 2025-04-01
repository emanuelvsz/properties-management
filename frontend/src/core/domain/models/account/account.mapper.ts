import { Account } from "./account";
import { DTO } from "../../types/index";
import { AccountRoleMapper } from "../account-role";
import { Mapper } from "../mapper";
import { PersonMapper } from "../person/person.mapper";

class AccountMapper extends Mapper<Account> {
	#personMapper = new PersonMapper();
	#roleMapper = new AccountRoleMapper();

	deserialize(data: DTO): Account {
		const id = String(data.id);
		const name = String(data.name);
		const email = String(data.email);
		const profileDTO = data.profile as DTO;
		const profile = this.#personMapper.deserialize(profileDTO);
		const rolesDTO = (data.roles as DTO[]) ?? [];
		const roles = rolesDTO.map((role) => this.#roleMapper.deserialize(role));
		const createdAt = String(data.createdAt);
		return new Account(id, name, email, profile, roles, createdAt);
	}

	serialize(data: Account): DTO {
		return {
			id: data.id,
			name: data.name,
			email: data.email,
			profile: this.#personMapper.serialize(data.profile),
			roles: data.roles.map((role) => this.#roleMapper.serialize(role)),
			createdAt: data.createdAt
		};
	}
}

export { AccountMapper };
