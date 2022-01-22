import { memo, VFC } from "react";
import { Outlet } from "react-router-dom";

export const Page404: VFC = memo(() => {
    return (
        <>
            <p>404ページです</p>
        </>
    )
})