import { Box, Divider, Flex, Heading, Link, Tooltip, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks/useLogout";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { LogoutButton } from "../../molecules/LogoutButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    const onClickHome = useCallback(() => navigate("/home"), []);
    const onClickUserManagement = useCallback(() => navigate("/home/user_management"), []);
    const onClickTodo = useCallback(() => navigate("/home/Todo"), []);

    const { logout } = useLogout();
    const onClickLogOut = useCallback(() => logout(), []);

    return (
        <>
            <Flex as="nav" bg="teal.400" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
                <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
                    <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>ユーザー管理アプリ</Heading>
                </Flex>
                <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
                    <Box pr={4}>
                        <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
                    </Box>
                    <Tooltip label="ALL User's" bg="gray.300" color="black" aria-label='A tooltip'>
                    <Link onClick={onClickTodo}>TODO</Link>
                    </Tooltip>
                </Flex>
                <Divider
                    h={14}
                    orientation="vertical"
                    borderColor="ffffff"
                    opacity="1"
                    mr={14}
                    display={{ base: "none", md: "flex" }}
                />
                <Flex mr={20} align="center">
                    <LogoutButton />
                    <MenuIconButton onOpen={onOpen} />
                </Flex>
            </Flex>
            <MenuDrawer
                onClose={onClose}
                isOpen={isOpen}
                onClickHome={onClickHome}
                onClickUserManagement={onClickUserManagement}
                onClickSetting={onClickTodo}
                onClickLogout={onClickLogOut}
                 />
        </>
    )
})

