import Home from "@/pages/user/Home";
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
