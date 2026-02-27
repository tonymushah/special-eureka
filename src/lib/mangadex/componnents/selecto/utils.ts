import { createContext } from "svelte";

export type SelectoDialogContextData = {
	currentCustomList?: string;
};

export type SelectoDialogData = {
	titles?: string[];
	chapters?: string[];
	covers?: string[];
	customLists?: string[];
	scanGroups?: string[];
	users?: string[];
};
export const [getSelectoDialogContextData, setSelectoDialogContextData] =
	createContext<() => SelectoDialogContextData | undefined>();
