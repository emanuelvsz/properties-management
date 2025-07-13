import React, { createContext, useState, useCallback, useMemo } from "react";
import { InventoryItem } from "@core/domain/models/inventory/inventory-item";
import { InventoryCategory } from "@core/domain/models/inventory/inventory-category";
import { Pagination } from "@core/domain/models/pagination";
import { InventoryService } from "@core/services/inventory.service";

interface InventoryContextData {
	inventoryItems: Pagination<InventoryItem>;
	categories: Pagination<InventoryCategory>;
	loading: boolean;
	error: string | null;

	listItems: (params: {
		propertyId?: string;
		categoryId?: string;
		q?: string;
		condition?: string;
		orderBy?: string;
		page?: number;
	}) => Promise<void>;

	getItemById: (id: string) => Promise<InventoryItem>;
	createItem: (data: InventoryItem) => Promise<void>;
	updateItem: (data: InventoryItem) => Promise<void>;
	deleteItem: (id: string) => Promise<void>;

	getPropertyInventory: (
		propertyId: string,
		params: {
			categoryId?: string;
			q?: string;
			condition?: string;
			orderBy?: string;
			page?: number;
		}
	) => Promise<void>;

	listCategories: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextData | null>(null);

interface InventoryProviderProps {
	children: React.ReactNode;
	service: InventoryService;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({
	children,
	service
}) => {
	const [inventoryItems, setInventoryItems] = useState<
		Pagination<InventoryItem>
	>(Pagination.empty<InventoryItem>());
	const [categories, setCategories] = useState<Pagination<InventoryCategory>>(
		Pagination.empty<InventoryCategory>()
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const listItems = useCallback(
		async (params: {
			propertyId?: string;
			categoryId?: string;
			q?: string;
			condition?: string;
			orderBy?: string;
			page?: number;
		}) => {
			setLoading(true);
			setError(null);

			try {
				const result = await service.list(params);
				setInventoryItems(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao carregar itens");
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const getItemById = useCallback(
		async (id: string): Promise<InventoryItem> => {
			setLoading(true);
			setError(null);

			try {
				const result = await service.getById(id);
				return result;
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao carregar item");
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const createItem = useCallback(
		async (data: InventoryItem) => {
			setLoading(true);
			setError(null);

			try {
				await service.create(data);
				const result = await service.list({});
				setInventoryItems(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao criar item");
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const updateItem = useCallback(
		async (data: InventoryItem) => {
			setLoading(true);
			setError(null);

			try {
				await service.update(data);
				const result = await service.list({});
				setInventoryItems(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao atualizar item");
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const deleteItem = useCallback(
		async (id: string) => {
			setLoading(true);
			setError(null);

			try {
				await service.delete(id);
				const result = await service.list({});
				setInventoryItems(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao deletar item");
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const getPropertyInventory = useCallback(
		async (
			propertyId: string,
			params: {
				categoryId?: string;
				q?: string;
				condition?: string;
				orderBy?: string;
				page?: number;
			}
		) => {
			setLoading(true);
			setError(null);

			try {
				const result = await service.getPropertyInventory(propertyId, params);
				setInventoryItems(result);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Erro ao carregar inventário da propriedade"
				);
			} finally {
				setLoading(false);
			}
		},
		[service]
	);

	const listCategories = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await service.listCategories();
			setCategories(result);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Erro ao carregar categorias"
			);
		} finally {
			setLoading(false);
		}
	}, [service]);

	const contextValue = useMemo(
		() => ({
			inventoryItems,
			categories,
			loading,
			error,
			listItems,
			getItemById,
			createItem,
			updateItem,
			deleteItem,
			getPropertyInventory,
			listCategories
		}),
		[
			inventoryItems,
			categories,
			loading,
			error,
			listItems,
			getItemById,
			createItem,
			updateItem,
			deleteItem,
			getPropertyInventory,
			listCategories
		]
	);

	return (
		<InventoryContext.Provider value={contextValue}>
			{children}
		</InventoryContext.Provider>
	);
};

export { InventoryContext };
