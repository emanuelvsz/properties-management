import { useState } from "react";

type ToggleModalFn = () => void;

export const useModalProps = (): [boolean, ToggleModalFn, ToggleModalFn] => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = (state: boolean) => setIsOpen(state);
	const open = () => toggle(true);
	const close = () => toggle(false);

	return [isOpen, open, close];
};
