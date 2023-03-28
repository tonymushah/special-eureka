import { To } from "react-router";

export default interface UserPage_Links{
    title: string;
    link_to: To;
    tabPanelChildren: React.ReactNode;
    key?: React.Key;
}