import axios from "axios";
import { useCallback, useContext, useState } from "react"
import { UserListContext } from "../providers/UserListProvider";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

export const useAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const { userList , setUserList} = useUpdateUserList();
    const { showMessage } = useMessage();

    const getUsers = useCallback(() => {
        setLoading(true);
        axios.get<Array<User>>("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                 setUserList(res.data)
                })
            .catch((error) => {
                showMessage({ title: "ユーザー取得に失敗しました", status: "error" });
            })
            .finally(() => setLoading(false))
    }, [])
    return { getUsers, loading, userList }
}

export const useUpdateUserList = () => useContext(UserListContext);