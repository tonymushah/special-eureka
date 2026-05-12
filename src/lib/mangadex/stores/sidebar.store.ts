import { writable } from "svelte/store";

const sidebarState = writable(false);

export default sidebarState;