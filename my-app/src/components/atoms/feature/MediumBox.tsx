import { Box, Divider, Flex, Heading, Input,Stack, HStack, Text } from '@chakra-ui/react'
import { memo, ReactNode, VFC } from 'react';

type Props = {
    children? : ReactNode
    title: string
    element : string
}

export const MediumBox : VFC<Props> = memo((props) => {
    const {title, element, children} = props;

    return (
        <Box
        p={4}
        shadow='md'
        borderWidth='1px'
        flex='1'
        borderRadius='xl'
      >
        <Heading fontSize='xl'>{title}</Heading>
        <Text as="sub" mt={4} >{element}</Text>
        {children}
      </Box>
  
    )
})