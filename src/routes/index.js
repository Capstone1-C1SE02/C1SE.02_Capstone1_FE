import Home from "@/pages/user/Home";
import DefaultLayoutUser from "@/layouts/user";

const publicUserRoutes = [
  { path: "/", component: Home, layout: DefaultLayoutUser },
];

export { publicUserRoutes };
