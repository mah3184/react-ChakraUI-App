import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";

type Props = {
    id?: number;
    text: string;
    onClick : (params?: number) => void;
}

export const ArrowIconButton: VFC<Props> = memo((props) => {
    const { id, text, onClick } = props;

    const link = useCallback(() => onClick(id),[id]);

    return (
        <Button
        ml={3}
         rightIcon={<ArrowForwardIcon />}
         colorScheme='teal'
         variant='outline'
         disabled={ id ? false : true }
         onClick={link}
        >
            {text}
        </Button>
    );
})