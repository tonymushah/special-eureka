<script lang="ts">
	import { preventDefault } from "svelte/legacy";

	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import clientInfo from "@mangadex/stores/clientInfo";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import { login } from "./actions";
	import { debounce, set, type DebouncedFunc } from "lodash";
	import { onDestroy } from "svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { slide } from "svelte/transition";
	let error: Error | undefined = $state(undefined);
	let isErrorOpen = $state(false);
	let isFetching = $state(false);
	function setError(err: Error) {
		error = err;
		isErrorOpen = true;
	}
	const debounce_fun = debounce((form: FormData) => {
		const client_id = form.get("client-id");
		const client_secret = form.get("client-secret");
		if (typeof client_id == "string" && typeof client_secret == "string") {
			if (client_id.length != 0 && client_secret.length != 0) {
				clientInfo.set({
					clientId: client_id,
					clientSecret: client_secret
				});
			} else {
				clientInfo.set(undefined);
			}
		} else {
			clientInfo.set(undefined);
		}
		const username = form.get("username-mail");
		const password = form.get("password");
		if (typeof username == "string" && typeof password == "string") {
			login(username, password)
				.catch((e) => {
					if (e instanceof Error) {
						setError(e);
					} else {
						setError(
							new Error("Unknown login error", {
								cause: e
							})
						);
					}
				})
				.finally(() => {
					isFetching = false;
				});
		} else {
			isFetching = false;
		}
	});
	onDestroy(() => {
		debounce_fun?.flush();
	});
</script>

<section class="login">
	<h2>Login information</h2>
	{#if isErrorOpen && error != undefined}
		<article class="error" transition:slide={{}}>
			<h4>{error.name}</h4>
			<p>{error.message}</p>
			<div class="btts">
				<ButtonAccent
					onclick={() => {
						isErrorOpen = false;
					}}
				>
					<p class="button-label">Close</p>
				</ButtonAccent>
			</div>
		</article>
	{/if}
	<form
		onsubmit={(e) => {
			e.preventDefault();
			let form = new FormData(e.currentTarget);
			if (isFetching == false) {
				isFetching = true;
				debounce_fun.cancel();
				debounce_fun(form);
			}
		}}
	>
		<div>
			<h3>Client ID</h3>
			<FormInput
				inputProps={{
					name: "client-id",
					type: "text"
				}}
				widthFull
				value={$clientInfo?.clientId}
			/>
		</div>
		<div>
			<h3>Client Secret</h3>
			<FormInput
				inputProps={{
					name: "client-secret",
					type: "password"
				}}
				widthFull
				value={$clientInfo?.clientSecret}
			/>
		</div>
		<div>
			<h3>Username or email address</h3>
			<FormInput
				inputProps={{
					name: "username-mail",
					type: "text"
				}}
				widthFull
			/>
		</div>
		<div>
			<h3>Password</h3>
			<FormInput
				inputProps={{
					name: "password",
					type: "password"
				}}
				widthFull
			/>
		</div>
		<div class="buttons">
			<PrimaryButton type="submit" disabled={isFetching}>
				<p>Log in</p>
			</PrimaryButton>
			<DangerButton
				type="button"
				onclick={() => {
					$clientInfo = undefined;
				}}
				disabled={isFetching}
			>
				<p>Clear personal client information</p>
			</DangerButton>
		</div>
	</form>
</section>

<style lang="scss">
	h2,
	h3 {
		margin: 0px;
	}
	section {
		margin-top: 12px;
	}
	.buttons {
		display: flex;
		gap: 10px;
		margin-top: 0.75em;
		p {
			margin: 7px 11px;
		}
	}
	.error {
		padding: 10px;
		background-color: color-mix(in srgb, var(--danger) 70%, transparent 30%);
		border-radius: 8px;
		border: solid 3px var(--mid-tone);
		box-shadow: 0px 3px 0px var(--mid-tone);
		display: flex;
		flex-direction: column;
		.btts {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: end;
		}
		h4 {
			font-weight: 600;
			font-size: 1.25em;
			margin: 0px;
		}
		.button-label {
			margin: 7px 11px;
		}
	}
</style>
