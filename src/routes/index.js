import Home from "@/pages/user/Home";
import { Login, Home as AdminHome } from "@/pages/admin";
import DefaultLayoutUser from "@/layouts/user";
import {
  Login,
  AcademicIntakeSessionAcademicProgramCurriculum,
  ListStudent,
  DiplopmaManagementProfile,
  DegreeList,
  ListAcademicProgram,
  StudentAcademicIntakeSessionAcademicProgram,
  ListMajored,
  ListYear,
} from "@/pages/admin";
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

const publicAdminRoutes = [
  { path: "/login", component: Login, layout: adminLoginLayout },
  {
    path: "/",
    component: AcademicIntakeSessionAcademicProgramCurriculum,
    layout: adminLayout,
  },
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
