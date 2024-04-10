import Home from "@/pages/user/Home";
import SearchByText from "@/pages/user/SearchByText";
import DefaultLayoutUser from "@/layouts/user";

const publicUserRoutes = [
  { path: "/", component: Home, layout: DefaultLayoutUser },
  {
    path: "/search-by-text",
    component: SearchByText,
    layout: DefaultLayoutUser,
  },
];

export { publicUserRoutes };
