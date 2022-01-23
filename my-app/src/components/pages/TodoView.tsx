import { memo, useCallback, useEffect, useState, VFC } from "react";
import { Box, Divider, Flex, Heading, Input, Stack, HStack, Text, Center, Spinner } from '@chakra-ui/react'
import { MediumBox } from "../atoms/feature/MediumBox";
import { KanbanBox } from "../atoms/feature/KanbanBox";
import { useTodo } from "../../hooks/useTodo";
import { Todo } from "../../types/api/todo";


export const TodoView: VFC = memo(() => {

    const { todos, getTodo, loading } = useTodo();
    const [completeList, setCompleteList] = useState<Array<Todo>>([]);
    const [uncompleteList, setUncompleteList] = useState<Array<Todo>>([]);

    useEffect(() => {
        getTodo();
    }, [])

    useEffect(() => {
        setCompleteList(todos?.filter((entity) => entity.completed && entity.userId === 1) ?? [])
        setUncompleteList(todos?.filter((entity) => !entity.completed && entity.userId === 1) ?? [])
    }, [todos])

    return (<>
        {loading ? (
            <Center h="100vh">
                <Spinner />
            </Center>
        ) : (
            <HStack my={4} spacing={1} align={"top"}>
                <MediumBox
                    title='ToDo'
                    element='未実施のタスク'
                >
                    <Divider borderColor={"gray.300"} my={2} />
                    {uncompleteList?.map((uncompleteTodo) => (
                        <KanbanBox kanbanText={uncompleteTodo.title} />
                    ))}
                </MediumBox>
                <MediumBox
                    title='InProgress'
                    element='実施中のタスク'
                >
                    <Divider borderColor={"gray.300"} my={2} />
                </MediumBox>
                <MediumBox
                    title='In Review'
                    element='レビュー中のタスク'
                >
                    <Divider borderColor={"gray.300"} my={2} />
                </MediumBox>
                <MediumBox
                    title='Done'
                    element='完了のタスク'
                >
                    <Divider borderColor={"gray.300"} my={2} />
                    {completeList?.map((completeTodo) => (
                        <KanbanBox kanbanText={completeTodo.title} />
                    ))}

                </MediumBox>
            </HStack>
        )}
    </>)
})

