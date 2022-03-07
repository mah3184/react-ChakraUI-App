import { Box, Circle, Heading, Text } from '@chakra-ui/react'
import { memo, ReactNode, VFC } from 'react';

type Props = {
  children?: ReactNode
  title: string
  element: string
  className: string
  listSize: number
}

export const MediumBox: VFC<Props> = memo((props) => {
  const { title, element, children, className, listSize } = props;

  return (
    <Box
      p={4}
      height='50px'
      shadow='md'
      borderWidth='1px'
      flex='1'
      borderRadius='xl'
      style={{ display: 'table-cell' }}
      className={className}
    >
      <Heading fontSize='xl' style={{display: 'flex'}}>
        <Circle size='36px' bg='gray.300' color='white' mr={1}>{listSize}</Circle>
        <Text as='main' fontSize={30}>{title}</Text>
      </Heading>
      <Text as="sub" mt={4} >{element}</Text>
      <Box style={{ overflowY: 'scroll', maxHeight: '650px' }}>
      {children}
      </Box>
    </Box>

  )
})