import Home from "@/pages/user/Home";
import DefaultLayoutUser from "@/layouts/user";
import {
  Login,
  Home as AdminHome,
  ListStudent,
  DiplopmaManagementProfile,
  DegreeList,
  ListAcademicProgram,
  StudentAcademicIntakeSessionAcademicProgram,
  ListMajored,
  ListYear,
} from "@/pages/admin";
import { adminLoginLayout, adminLayout } from "@/layouts/admin";

const publicUserRoutes = [
  { path: "/", component: Home, layout: DefaultLayoutUser },
];

const publicAdminRoutes = [
  { path: "/login", component: Login, layout: adminLoginLayout },
  { path: "/", component: AdminHome, layout: adminLayout },
  { path: "/list-student", component: ListStudent, layout: adminLayout },
  { path: "/list-year", component: ListYear, layout: adminLayout },
  {
    path: "/list-academic-program",
    component: ListAcademicProgram,
    layout: adminLayout,
  },
  {
    path: "/list-academic-program-year",
    component: StudentAcademicIntakeSessionAcademicProgram,
    layout: adminLayout,
  },
  {
    path: "/list-majored",
    component: ListMajored,
    layout: adminLayout,
  },
  {
    path: "/degree-book",
    component: DiplopmaManagementProfile,
    layout: adminLayout,
  },
  {
    path: "/degree-list",
    component: DegreeList,
    layout: adminLayout,
  },
];

export { publicUserRoutes, publicAdminRoutes };
