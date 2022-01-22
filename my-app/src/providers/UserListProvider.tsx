import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { User } from "../types/api/user";

export type UserListContextType = {
    userList: Array<User> | null
    setUserList: Dispatch<SetStateAction<Array<User> | null>>
}

export const UserListContext = createContext<UserListContextType>({} as UserListContextType);

export const UserListProvider = (props: {children: ReactNode}) => {
    const {children} = props;
    const [userList, setUserList] = useState<Array<User> | null>(null);

    return (
        <UserListContext.Provider value={{userList, setUserList}}>
            {children}
        </UserListContext.Provider>
    )
}
