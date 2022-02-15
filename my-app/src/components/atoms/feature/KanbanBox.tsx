import { Box, Stack } from '@chakra-ui/react'
import { VFC } from 'react'

type Prop = {
    id: number;
    kanbanText: string;
}

export const KanbanBox: VFC<Prop> = (prop) => {

    const { id, kanbanText } = prop;

    return (
        <Stack>
            <Box className="item" as={"a"} my={2} p={2} backgroundColor="white" borderRadius={"10px"} border={"10px"} shadow={"md"} >
                {id}{":"}{kanbanText}
            </Box>
        </Stack>
    )
}