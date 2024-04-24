import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicUserRoutes, publicAdminRoutes } from "@/routes";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  // const data = localStorage.getItem("persist:root");
  // const checkIsLoggedIn = JSON.parse(JSON.parse(data)?.auth)?.login?.isLoggedIn;
  // console.log("checkIsLoggedIn", checkIsLoggedIn);

  // const router = checkIsLoggedIn ? publicAdminRoutes : publicUserRoutes;

  const router = publicAdminRoutes;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App overflow-hidden">
            <Routes>
              {router.map((route, index) => {
                const Component = route.component;
                const Layout = route.layout;
                return (
                  <Route
                    key={`route-${index}`}
                    path={route.path}
                    element={
                      <Layout>
                        <Component />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
