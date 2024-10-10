<script lang="ts">
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import clientInfo from "@mangadex/stores/clientInfo";
</script>

<section class="personal-client">
	<h2>Personal Client</h2>
	<form
		on:submit|preventDefault={(e) => {
			let form = new FormData(e.currentTarget);
			const client_id = form.get("client-id");
			const client_secret = form.get("client-secret");
			if (typeof client_id == "string" && typeof client_secret == "string") {
				clientInfo.set({
					clientId: client_id,
					clientSecret: client_secret
				});
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
		<div class="buttons">
			<PrimaryButton type="submit">
				<p>Update</p>
			</PrimaryButton>
			<DangerButton
				type="button"
				on:click={() => {
					$clientInfo = undefined;
				}}
			>
				<p>Clear</p>
			</DangerButton>
		</div>
	</form>
</section>

<style lang="scss">
	h2,
	h3 {
		margin: 0px;
	}
	.buttons {
		display: flex;
		gap: 10px;
		margin-top: 0.75em;
		p {
			margin: 7px 11px;
		}
	}
</style>
