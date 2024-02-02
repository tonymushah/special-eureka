<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
    import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Text } from "@svelteuidev/core";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { createEventDispatcher } from "svelte";
	import { v4 } from "uuid";
	export let label: string;
	export let href: string | undefined = undefined;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
    $: collapsed = $isOpen;
    const sub_id = v4();
    const rlt_sub = subscriptionStore({
        client: getContextClient(),
        query: sideDirGQLDoc,
        variables: {
            sub_id
        }
    });
    $: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
</script>

<a {href} on:click>
	<div class:base={true} class:collapsed>
        {#if !rtl}
            <div class="icon">
                <slot name="icon" />
            </div>
        {/if}
		
        <div class:label={true} class:rtl class:collapsed>
            <h4>{label}</h4>
        </div>

        {#if rtl}
            <div class="icon">
                <slot name="icon" />
            </div>
            
        {/if}
	</div>
</a>

<style lang="scss">
    h4 {
        font-family: Poppins;
        margin: 0px;
        margin-left: 10px;
        line-clamp: 1;
    }
    div {
        animation-duration: 300ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    }
    .base {
        display: flex;
        animation-name: base-in;
    }
    .base.collapsed {
        animation-name: base-out;
    }
    @keyframes base-out {
        to {
            margin-left: 0px;
            align-items: center;
            justify-content: center;
        }
    }
    @keyframes base-in {
        to {
            margin-left: 25px;
            align-items: initial;
            justify-content: initial;
        }
    }
    .label.rtl {
        text-align: end;
    }
    @keyframes label-in{
        from {
            display: initial;
            opacity: 0;
            width: 0px;
        }
        to {
            width: initial;
            opacity: 1;
        }
    }
    @keyframes label-out{
        from {
            width: initial;
            opacity: 1;
        }
        to {
            display: none;
            width: 0px;
            opacity: 0;
        }
    }
    .label {
        width: 100%;
        transition: text-align 300ms ease-in-out;
        animation-name: label-in;
    }
    .label.collapsed {
        animation-name: label-out;
    }
</style>