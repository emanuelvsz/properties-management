import { useContext } from "react";
import { InventoryContext } from "./provider";

export const useInventoryContext = () => {
	const context = useContext(InventoryContext);
	if (!context) {
		throw new Error(
			"useInventoryContext must be used within an InventoryProvider"
		);
	}
	return context;
};
