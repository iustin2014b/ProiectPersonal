import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { FilesPage } from "./components/FilesPage";
import { ProjectsPage } from "./components/ProjectsPage";
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
