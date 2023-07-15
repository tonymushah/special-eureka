import type { Meta, StoryObj } from "@storybook/react";

import HertaSpinner from "./HertaSpinner";

const meta : Meta<typeof HertaSpinner> = {
    component : HertaSpinner
};

export default meta;

type Story = StoryObj<typeof HertaSpinner>;

export const XS : Story = {
    render : () => <HertaSpinner size={"xs"}/>
};

export const SM : Story = {
    render : () => <HertaSpinner size={"sm"}/>
};

export const MD : Story = {
    render : () => <HertaSpinner size={"md"}/>
};

export const LG : Story = {
    render : () => <HertaSpinner size={"lg"}/>
};

export const XL : Story = {
    render : () => <HertaSpinner size={"xl"}/>
};