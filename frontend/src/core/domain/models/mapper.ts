import { Model } from "./model";
import { DTO } from "../types/index";

abstract class Mapper<T extends Model> {
	abstract deserialize(data: DTO): T;
	abstract serialize(data: T): DTO;
}

export { Mapper };
