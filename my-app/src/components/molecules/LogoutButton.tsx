import { memo, useCallback, VFC } from "react";
import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { MiniButton } from "../atoms/button/MiniButton";

export const LogoutButton: VFC = memo(() => {

    const { logout } = useLogout();
    const onClickLogOut = useCallback(() => logout(), []);

    return (
        <>
            <MiniButton onClick={onClickLogOut}>ログアウト</MiniButton>
        </>
    )
})