import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path=""></Route>
      </Routes>
      <Navigation />
    </>
  );
}

export default App;
