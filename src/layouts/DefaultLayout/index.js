import { Header } from '~/layouts/components';
import { Nav } from '~/components';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <Nav />
            {children}
        </>
    );
}

export default DefaultLayout;
