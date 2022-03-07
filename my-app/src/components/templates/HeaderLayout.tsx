import { memo, ReactNode, VFC } from "react";
import { Header } from "../organisms/layout/Header";
import { Redirector } from "../organisms/layout/Redirector";

type Props = {
    children?: ReactNode;
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;

    return (
        <>
            <Redirector />
            <Header />
            {children}
        </>
    )
})

