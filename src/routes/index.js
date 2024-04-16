import Home from "@/pages/user/Home";
import DefaultLayoutUser from "@/layouts/user";
import { Login, Home as AdminHome } from "@/pages/admin";
import { adminLoginLayout, adminLayout } from "@/layouts/admin";

const publicUserRoutes = [
  { path: "/", component: Home, layout: DefaultLayoutUser },
];

const publicAdminRoutes = [
  { path: "/", component: AdminHome, layout: adminLayout },
  { path: "/login", component: Login, layout: adminLoginLayout },
];

export { publicUserRoutes, publicAdminRoutes };
