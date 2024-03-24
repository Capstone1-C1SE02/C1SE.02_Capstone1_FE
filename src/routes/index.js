import {
    Login,
    Home,
    ManagementAcademic,
    ManagementAcademicFollowYear,
    ManagementStudent,
    ManagementYear,
} from '~/pages';

const publicRouters = [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/management-student', component: ManagementStudent },
    { path: '/management-year', component: ManagementYear },
    { path: '/management-academic', component: ManagementAcademic },
    { path: '/management-academic-follow-year', component: ManagementAcademicFollowYear },
];

// const privateRouters = [{ path: '/manage-user', component: ManageUser }];

// const notFoundRouters = [{ path: '*', component: NotFound }];

export { publicRouters };
