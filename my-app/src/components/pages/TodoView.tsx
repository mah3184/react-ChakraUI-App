import { memo, useCallback, useEffect, useState, VFC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { HStack, Center, Spinner } from '@chakra-ui/react'
import { useTodo } from "../../hooks/useTodo";
import useGroupedItems from "../../hooks/useGroupItems";
import { MoveHandler } from "../../types/items/DnDItems";
import { GroupTypes } from "../../types/items/GroupType";
import { useDnDItemList } from "../../hooks/useDnDItemList";
import { DnDGroup } from "../atoms/division/DnDGroup";
import { useParams } from "react-router-dom";

export const TodoView: VFC= memo(() => {

    const { userid } = useParams<"userid">();

    const { todos, getTodo, loading } = useTodo();
    const { getDnDItems, dndList } = useDnDItemList();
    const [groupedItems, dnDItems, setDnDItems] = useGroupedItems(dndList ?? []);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        getTodo(userid);
    }, [userid])

    // 元の配列データから {todo: Item[], doing: Item[], done: Item[]} データを準備するhooks
    useEffect(() => {
        getDnDItems(todos);
        setIsUpdate(prevState => !prevState);
    }, [todos])

    useEffect(() => {
        setDnDItems(dndList ?? []);
    }, [isUpdate])

    const moveItem: MoveHandler = useCallback((dragIndex, targetIndex, group) => {
        // dragIndexとtargetIndexからswap処理

        const item = dnDItems[dragIndex];

        console.log(dnDItems.map((a) => a));
        console.log(`${item.id}_${item.title}`)

        // console.log(`dragIndex:${dragIndex}`);
        // console.log(`targetIndex:${targetIndex}`);
        // console.log(`group:${group}`);
        // console.log(`item:${item.id}_${item.title}`);

        if (!item) return;
        setDnDItems(prevState => {
            const newItems = prevState.filter((_, idx) => idx !== dragIndex);
            newItems.splice(targetIndex, 0, { ...item, group });
            return newItems;
        })
    }, [dnDItems, setDnDItems]);


    let index = 0;

    return (<>
        {loading ? (
            <Center h="100vh">
                <Spinner />
            </Center>
        ) : (
            <DndProvider backend={HTML5Backend}>
                <HStack my={4} spacing={1} align={"top"} style={{ display: 'table', tableLayout: 'fixed', width: '100%' }}>
                    {GroupTypes.map(group => {
                        const items = groupedItems[group];
                        const firstIndex = index;
                        if (items === undefined) return null;
                        index = index + items.length;

                        return (
                            // <section key={group} className='group-section'>
                            <DnDGroup
                                key={group}
                                items={items}
                                groupType={group}
                                firstIndex={firstIndex}
                                onMove={moveItem}
                            />
                            // </section>
                        )
                    })}
                </HStack>
            </DndProvider>
        )}
    </>)
})

