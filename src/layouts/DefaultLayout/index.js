import { Header } from '~/layouts/components';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default DefaultLayout;
