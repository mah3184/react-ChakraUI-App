import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Outlet } from "react-router-dom";
import { FooterLayout } from "../templates/FooterLayout";
import { HeaderLayout } from "../templates/HeaderLayout";

export const Home: VFC = memo(() => {
    return (
        <>
            <HeaderLayout />
            <p>HOMEページです</p>
                <Box pt={1} pb={10}>
                <Outlet />
                </Box>
            <FooterLayout />
        </>
    )
})