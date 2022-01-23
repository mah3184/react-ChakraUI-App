import { SliderProvider } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react"
import { Todo } from "../types/api/todo";
import { useMessage } from "./useMessage";

export const useTodo = () => {
    const [todos, setTodos] = useState<Array<Todo>>();
    const [loading, setLoading] = useState(false);
    const { showMessage } = useMessage();

    const getTodo = useCallback((userid?:string, id?:string) => {
        setLoading(true);
        let serchType : string = "";
        if (userid != null) {
            serchType = `?userId=${userid}`;
        } else if (id != null) {
            serchType = `/${id}`;
        } else {
            serchType = "";
        }
        console.log(`https://jsonplaceholder.typicode.com/todos${serchType}`);

        axios.get<Array<Todo>>(`https://jsonplaceholder.typicode.com/todos${serchType}`)
        .then((res) => {
            setLoading(false);
            if (res.data) {
                setTodos(res.data);
            } else {
                setLoading(false);
                showMessage({ title: "TODOはありません", status: "success" });
            }
        }).catch(() => {
            setLoading(false);
            showMessage({ title: "TODOの取得に失敗しました", status: "error" });
        })
    
        
    },[]);

    return {todos, getTodo, loading}
}