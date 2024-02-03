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
    export let collapsed: boolean = false;
    $: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
</script>

<div class:base={true} class:collapsed class:rtl>
    <slot/>
</div>

<style lang="scss">
    div {
        animation-duration: 300ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    }
    .base {
        padding-top: 8px;
        padding-bottom: 8px;
        display: flex;
        animation-name: base-in;
        transition: background-color 300ms ease-in-out;
        flex-direction: row;
    }
    .base:hover {
        background-color: #c0c0c0;
    }
    .base.collapsed {
        animation-name: base-out;
    }
    .base.rtl {
        flex-direction: row-reverse;
    }
    @keyframes base-out {
        to {
            padding-left: 0px;
            align-items: center;
            justify-content: center;
        }
    }
    @keyframes base-in {
        to {
            padding-left: 25px;
            align-items: initial;
            justify-content: initial;
        }
    }
</style>