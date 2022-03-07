import { Box, Button, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { memo, VFC } from "react";

import { SiAmazonaws, SiVisualstudiocode, SiDocker, SiJava, SiPostgresql, SiGithub, SiApple, SiReact, SiTwitter } from "react-icons/si";

export const Footer: VFC = memo(() => {
    return (
        <VStack as='footer' bg='' align='center' display='flex' pb={9}>
            <Box display='flex'>
                <Text as='samp' align='center' color='black'>Proudly made in</Text>
                <Flex mx={1}>
                    <span className="flag-icon flag-icon-jp" />
                </Flex>
                <Text as='samp' align='center' color='black'>by Aaaa Bbbb</Text>
            </Box>
            <Box display='flex' pb={2}>
                <Link w={6} color='gray.400'>
                    <SiGithub width='1em' />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiApple />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiReact />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiAmazonaws />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiVisualstudiocode />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiDocker />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiJava />
                </Link>
                <Link w={6} color='gray.400'>
                    <SiPostgresql />
                </Link>
            </Box>
            <Button colorScheme='twitter' leftIcon={<SiTwitter />}>
                Twitter
            </Button>
        </VStack>
    );
})