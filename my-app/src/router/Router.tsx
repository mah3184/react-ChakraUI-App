import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { TodoView } from "../components/pages/TodoView";
import { UserManagement } from "../components/pages/UserManagement";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { UserListProvider } from "../providers/UserListProvider";

export const Router: VFC = memo(() => {
    return (
        <UserListProvider>
        <LoginUserProvider>
        <Routes>
                <Route path="/" element={<Login />} />
                <Route path="home" element={<Home />}>
                    <Route path="user_management" element={<UserManagement />} />
                    <Route path="todo" element={<TodoView />} />
                    <Route path="todo/:userid" element={<TodoView />} />
                </Route>
                <Route path="*" element={<Page404 />} />
        </Routes>
        </LoginUserProvider>
        </UserListProvider>
    )
})