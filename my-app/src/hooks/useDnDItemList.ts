import { useCallback, useState } from "react";
import { Todo } from "../types/api/todo";
import { DnDItems } from "../types/items/DnDItems";


export const useDnDItemList = () => {
    const [dndList, setDnDList] = useState<Array<DnDItems>>();

    const getDnDItems = useCallback((items: Array<Todo>) => {
        const result: Array<DnDItems> = items.map((item) => item.completed ? { ...item, group: 'Done' } : { ...item, group: 'ToDo' })
        setDnDList(result);
    }, [])

    return { getDnDItems, dndList }
}