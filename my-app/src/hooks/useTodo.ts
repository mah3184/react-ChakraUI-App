import { useCallback, useState } from "react"
import axios from "axios";
import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useTodo = () => {
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [loading, setLoading] = useState(false);
    const { showMessage } = useMessage();
    const [completeList, setCompleteList] = useState<Array<Todo>>([]);
    const [uncompleteList, setUncompleteList] = useState<Array<Todo>>([]);


    const getTodo = useCallback((userid?: string, id?: string) => {
        setLoading(true);
        let serchType: string = "";
        if (userid != null) {
            serchType = `?userId=${userid}`;
        } else if (id != null) {
            serchType = `/${id}`;
        } else {
            serchType = "?userId=1";
        }

        axios.get<Array<Todo>>(`https://jsonplaceholder.typicode.com/todos${serchType}`)
            .then((res) => {
                setLoading(false);
                if (res.data) {
                    let tmp = res.data.slice();
                    setTodos(tmp.sort((a, b) => {
                        if (a.completed && b.completed) {
                            return a.id - b.id;
                        } else if (a.completed && !b.completed) {
                            return 1;
                        } else if (!a.completed && b.completed) {
                            return -1;
                        } else {
                            return a.id - b.id;
                        }
                    }));
                    setCompleteList(res.data?.filter((entity) => entity.completed && entity.userId === 1) ?? [])
                    setUncompleteList(res.data?.filter((entity) => !entity.completed && entity.userId === 1) ?? [])
                } else {
                    setLoading(false);
                    showMessage({ title: "TODOはありません", status: "success" });
                }
            }).catch(() => {
                setLoading(false);
                showMessage({ title: "TODOの取得に失敗しました", status: "error" });
            })


    }, []);

    return { todos, getTodo, loading, completeList, uncompleteList }
}