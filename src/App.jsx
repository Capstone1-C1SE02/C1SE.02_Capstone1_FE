import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicUserRoutes, publicAdminRoutes } from "@/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicAdminRoutes.map((route, index) => {
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
  );
}

export default App;
