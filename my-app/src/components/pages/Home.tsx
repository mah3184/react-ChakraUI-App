import { Box } from "@chakra-ui/react";
import { memo, VFC } from "react";
import { Outlet } from "react-router-dom";
import { HeaderLayout } from "../templates/HeaderLayout";

export const Home: VFC = memo(() => {
    return (
        <>
            <HeaderLayout>
                <p>HOMEページです</p>
                <Box p={1}>
                <Outlet />
                </Box>
            </HeaderLayout>
        </>
    )
})