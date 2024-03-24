import { Header } from '~/layouts/components';
import './DefaultLayout.module.scss';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default DefaultLayout;
