import { memo } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";


export const Redirector = memo(() => {
    // 認証cookie
    const [cookies, setCookie, removeCookie] = useCookies(["lsid"]);
    console.log(`redirector:${cookies.lsid}`)

    return (
        <>
        {cookies.lsid != "YES" &&
        (
        <Navigate to="/" />
        )
        }
        </>
    )
})