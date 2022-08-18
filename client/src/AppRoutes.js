import { Home } from "./components/Home";
import { Login } from "./components/Users/Login";
import { Register } from "./components/Users/Register";
import { FilesPage } from "./components/Files/FilesPage";
import { ProjectsPage } from "./components/Projects/ProjectsPage";
const AppRoutes = [
    {
        index: true,
        path: '/Home',
        element: <Home />
    },
    {
        path: '/ProjectsPage',
        element: <ProjectsPage />
    },
    {
        path: '/FilesPage',
        element: <FilesPage />
    },
    {
        path: '/Login',
        element: <Login />
    },
    {
        path: '/Register',
        element: <Register />
    }
];

export default AppRoutes;
