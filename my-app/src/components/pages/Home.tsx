import { memo, VFC } from "react";
import { Outlet } from "react-router-dom";
import { HeaderLayout } from "../templates/HeaderLayout";

export const Home: VFC = memo(() => {
    return (
        <>
            <HeaderLayout>
                <p>HOMEページです</p>
                <Outlet />
            </HeaderLayout>
        </>
    )
})