import { TodoView } from "../components/pages/TodoView";
import { UserManagement } from "../components/pages/UserManagement";

export const homeRoutes = [
    {
        path: "user_management",
        children: <UserManagement />
    },
    {
        path: "setting",
        children: <TodoView />
    },

];