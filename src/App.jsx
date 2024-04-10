import { Routes, Route } from "react-router-dom";
import { Home, Login } from "@/pages/admin";
import { path } from "./ultils/constant"

function App() {
  return (
    <div className="h-screen w-screen bg-secondary">
      <Routes>
        <Route path={path.HOME} element={<Home />}/>
        <Route path={path.LOGIN} element={<Login />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
