import { createMutation } from "@tanstack/svelte-query";
import { logout } from "./actions";

const logoutQMutation = () => createMutation(() => ({
	mutationKey: ["auth", "logout"],
	async mutationFn() {
		await logout()
	},
	networkMode: "always"
}));

export default logoutQMutation;