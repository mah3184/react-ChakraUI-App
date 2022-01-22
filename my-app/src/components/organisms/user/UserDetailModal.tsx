import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack } from "@chakra-ui/react"
import { ChangeEvent, useCallback, useEffect, useState, VFC } from "react"
import { useUpdateUserList } from "../../../hooks/useAllUsers";
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
    isOpen : boolean,
    onClose : () => void;
    user : User | null;
    isAdmin? : boolean;
}

export const UserDetailModal: VFC<Props> = (props) => {
    const {isOpen, onClose, user, isAdmin} = props;
    const [tmpUsername, setTmpUsername] = useState<string>("");
    const [tmpName, setTmpName] = useState<string>("");
    const [tmpEmail, setTmpEmail] = useState<string>("");
    const [tmpPhone, setTmpPhone] = useState<string>("");
    const [tmpUser, setTmpUser] = useState<User | null>();
    const {userList, setUserList} = useUpdateUserList();

    useEffect(() => {
        setTmpUser(user);
        setTmpUsername(user?.username ?? "");
        setTmpName(user?.name ?? "");
        setTmpEmail(user?.email ?? "");
        setTmpPhone(user?.phone ?? "");
    },[user]);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setTmpName(e.target.value);
    }
    const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setTmpUsername(e.target.value);
    }
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setTmpEmail(e.target.value);
    }
    const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setTmpPhone(e.target.value);
    }

    const update = useCallback(() => {
        console.log(userList);
        setUserList(() => {
            userList?.map((user) => (
                user.id === tmpUser?.id ? {
                    username : tmpUsername,
                    name : tmpName,
                    phone : tmpPhone,
                    email : tmpEmail
                }
                 : user
            ));
            return userList
        });
        // console.log("ユーザーリスト")
        // userList?.map((user) => console.log(user));
    },[userList])

    return(
        <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} >
        <ModalOverlay />
        <ModalContent pb={2}>
            <ModalHeader>ユーザー詳細</ModalHeader>
            <ModalCloseButton />
            <ModalBody mx={4}>
                <Stack spacing={10}>
                    <FormControl>
                        <FormLabel>
                            名前
                        </FormLabel>
                        <Input value={tmpUsername} isReadOnly={!isAdmin} onChange={onChangeUsername}/>
                        <FormLabel>
                            フルネーム
                        </FormLabel>
                        <Input value={tmpName} isReadOnly={!isAdmin} onChange={onChangeName} />
                        <FormLabel>
                            MAIL
                        </FormLabel>
                        <Input value={tmpEmail} isReadOnly={!isAdmin} onChange={onChangeEmail} />
                        <FormLabel>
                            TEL
                        </FormLabel>
                        <Input value={tmpPhone} isReadOnly={!isAdmin} onChange={onChangePhone} />
                    </FormControl>
                </Stack>
                    <ModalFooter>
                        {isAdmin && (
                            <PrimaryButton onClick={update}>更新</PrimaryButton>
                        )}
            </ModalFooter>            
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}