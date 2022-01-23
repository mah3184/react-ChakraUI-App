import { memo, VFC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { Setting } from "../components/pages/Settings";
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
                    <Route path="setting" element={<Setting />} />
                    <Route path="user_management" element={<UserManagement />} />
                </Route>
                <Route path="*" element={<Page404 />} />
        </Routes>
        </LoginUserProvider>
        </UserListProvider>
    )
})