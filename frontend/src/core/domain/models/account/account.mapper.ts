import { Account } from "./account";
import { DTO } from "../../types/index";
import { AccountRoleMapper } from "../account-role";
import { Mapper } from "../mapper";

class AccountMapper extends Mapper<Account> {
	#roleMapper = new AccountRoleMapper();

	deserialize(data: DTO): Account {
		const id = String(data.id);
		const username = String(data.username || data.name || '');
		const email = String(data.email);
		const rolesDTO = (data.roles as DTO[]) ?? [];
		const roles = rolesDTO.map((role) => this.#roleMapper.deserialize(role));
		const createdAt = String(data.date_joined || data.createdAt || '');
		return new Account(id, username, email, roles, createdAt);
	}

	serialize(data: Account): DTO {
		return {
			id: data.id,
			name: data.username,
			email: data.email,
			roles: data.roles.map((role) => this.#roleMapper.serialize(role)),
			createdAt: data.createdAt
		};
	}
}

export { AccountMapper };
