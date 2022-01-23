import axios from "axios";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "./useMessage";

export const useAuth = () => {
    const navigate = useNavigate();
    const { showMessage } = useMessage();
    const { setLoginUser } = useLoginUser();

    // 認証cookie
    const [cookies, setCookie, removeCookie] = useCookies(["lsid"]);

    const [loading, setLoading] = useState(false);
    const login = useCallback((id: string) => {
        setLoading(true);
        axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            if (res.data) {
                const isAdmin = res.data.id%10 === 0 ? true : false;
                setLoginUser({...res.data, isAdmin});
                setCookie("lsid", "YES" ,{path:"/"});
                showMessage({ title: "ログインしました", status: "success" });
                setLoading(false);
                navigate("/home");
            } else {
                setLoading(false);
                showMessage({ title: "ユーザーが見つかりません", status: "warning" });
            }
        })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 404) {
                    showMessage({ title: "ログインできません", status: "warning" })
                } else {
                    showMessage({ title: "a systemerror has occurred", status: "error" })
                }
            });
    }, [navigate]);
    return { login, loading }
}