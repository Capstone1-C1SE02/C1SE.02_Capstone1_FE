import { Login, ListStudent, TestList } from '../pages';

const publicRouters = [
    { path: 'login', component: Login },
    { path: 'list-student', component: TestList },
];

// const privateRouters = [{ path: '/manage-user', component: ManageUser }];

// const notFoundRouters = [{ path: '*', component: NotFound }];

export { publicRouters };
