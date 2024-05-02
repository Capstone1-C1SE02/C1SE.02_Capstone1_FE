import Home from "@/pages/user/Home";
import DefaultLayoutUser from "@/layouts/user";
import { Login, Home as AdminHome } from "@/pages/admin";
import { adminLoginLayout, adminLayout } from "@/layouts/admin";
import SearchByText from "@/pages/user/SearchByText";
import Result from "@/pages/user/Result";
import FormLayoutUser from "@/layouts/user/form.layout";
import RootLayoutUser from "@/layouts/user/root.layout";

const publicUserRoutes = [
  { path: "/", component: Home, layout: FormLayoutUser },
  {
    path: "/search-by-text",
    component: SearchByText,
    layout: FormLayoutUser,
  },
  { path: "/result", component: Result, layout: RootLayoutUser },
];

export { publicUserRoutes };
