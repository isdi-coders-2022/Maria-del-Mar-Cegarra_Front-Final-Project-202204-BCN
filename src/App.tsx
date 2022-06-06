import { Route, Routes } from "react-router-dom";
import CredentialsValidation from "./components/CredentialsValidation/CredentialsValidation";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/home"
          element={
            <CredentialsValidation>
              <HomePage />
            </CredentialsValidation>
          }
        />
        <Route path=""></Route>
      </Routes>
      <Navigation />
    </>
  );
}

export default App;
