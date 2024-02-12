<script lang="ts">
    import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sub_end } from "@mangadex/utils";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { v4 } from "uuid";
    const sub_id = v4();
    const rlt_sub = subscriptionStore({
        client: getContextClient(),
        query: sideDirGQLDoc,
        variables: {
            sub_id
        }
    });
    onDestroy(() => {
        sub_end(sub_id);
    })
    $: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
	export let collapsed: boolean = false;
    export let label: string;
</script>

<div class:label={true} class:rtl class:collapsed>
	<h4>{label}</h4>
</div>

<style lang="scss">
    h4 {
        color: currentColor;
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
