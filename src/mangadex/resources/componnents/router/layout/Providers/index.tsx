import { Mangadex_suspense } from "@mangadex/index";
import UserOptionProvider from "@mangadex/resources/componnents/userOption/utils/UserOptionProvider";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

const Content = React.lazy(() => import("@mangadex/resources/componnents/SideBar"));

export default function Providers({ children }: React.PropsWithChildren) {
    return (
        <UserOptionProvider>
            <ProSidebarProvider>
                <Mangadex_suspense>
                    <Content>
                        <AnimatePresence>
                            {
                                children
                            }
                        </AnimatePresence>
                    </Content>
                </Mangadex_suspense>
            </ProSidebarProvider>
        </UserOptionProvider>
    );
}