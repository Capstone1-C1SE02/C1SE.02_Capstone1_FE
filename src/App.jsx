import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicUserRoutes, publicAdminRoutes } from "@/routes";
import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState, useEffect } from "react";

function App() {
  const data = localStorage.getItem("persist:auth");
  const checkIsLoggedIn = JSON.parse(data)?.isLoggedIn;
  // const checkIsLoggedIn = JSON.parse(data)?.isLoggedIn;
  console.log("checkIsLoggedIn", data);

  const [router, setrouter] = useState();
  useEffect(() => {
    checkIsLoggedIn === false
      ? setrouter(publicAdminRoutes)
      : setrouter(publicUserRoutes);
    router;
  }, [checkIsLoggedIn]);

  // const router = publicAdminRoutes;

  console.log("router", checkIsLoggedIn);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App overflow-hidden">
            <Routes>
              {router?.map((route, index) => {
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
