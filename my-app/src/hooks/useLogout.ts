import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useLogout = () => {    
    const navigate = useNavigate();
    const { showMessage } = useMessage();
    // 認証cookie
    const [cookies, setCookie, removeCookie] = useCookies(["lsid"]);

    const logout = useCallback(() => {
        setCookie("lsid","NO")
        showMessage({ title: "ログアウトしました", status: "success" });
        navigate("/");
    },[])

    return {logout};
}