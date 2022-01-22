import { Center, Spinner, useDisclosure, Wrap, WrapItem} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

export const UserManagement: VFC = memo(() => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { getUsers, userList, loading } = useAllUsers();
    const { onSelectUser, selectedUser } = useSelectUser();
    const { loginUser } = useLoginUser();

    const onClickUser = useCallback((id: number) => {
        onSelectUser({id, users: userList ?? []});
        onOpen();
    }, [userList]);

    useEffect(() => getUsers(), [])
    return (
        <>
            {loading ? (
                <Center h="100vh">
                    <Spinner />
                </Center>
            ) : (
                <Wrap p={{ base: 4, md: 10 }}>
                    {userList?.map((user) => (
                        <WrapItem key={user.id} mx="auto">
                            <UserCard
                                id={user.id}
                                imageUrl="https://source.unsplash.com/random"
                                userName={user.username}
                                fullName={user.name}
                                onClick={onClickUser}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            )}
            <UserDetailModal isOpen={isOpen} onClose={onClose} user={selectedUser} isAdmin={loginUser?.isAdmin} />
        </>
    )
})