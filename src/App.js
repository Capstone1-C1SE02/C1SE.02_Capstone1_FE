import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '~/layouts';
import { publicRouters } from '~/routes';

import '~/App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={`public-router-${index}`}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
