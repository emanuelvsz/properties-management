import { AccountRole } from "./account-role";
import { DTO } from "../../types/index";
import { Mapper } from "../mapper";

class AccountRoleMapper extends Mapper<AccountRole> {
	deserialize(data: DTO): AccountRole {
		const id = String(data.id);
		const name = String(data.name);
		const code = String(data.code);
		return new AccountRole(id, name, code);
	}

	serialize(data: AccountRole): DTO {
		return {
			id: data.id,
			name: data.name,
			code: data.code
		};
	}
}

export { AccountRoleMapper };
