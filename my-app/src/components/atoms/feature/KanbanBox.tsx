import { Box, ListItem, Stack, UnorderedList, Wrap, WrapItem } from '@chakra-ui/react'
import { memo, VFC } from 'react'

type Prop = {
    kanbanText : string;
}

export const KanbanBox: VFC<Prop> = memo((prop) => {

    const {kanbanText} = prop;

    return (
        <Stack>
            <Box as={"a"} my={2} p={2}  backgroundColor="white" borderRadius={"10px"} border={"10px"} shadow={"md"} _hover={{cursor: "pointer", opacity: 0.8}}>
                {kanbanText}
            </Box>
        </Stack>
    )
})