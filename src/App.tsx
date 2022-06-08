import jwtDecode from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import CredentialsValidation from "./components/CredentialsValidation/CredentialsValidation";
import Modal from "./components/Modal/Modal";
import Navigation from "./components/Navigation/Navigation";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { loginActionCreator } from "./redux/features/userSlice";
import { useAppDispatch } from "./redux/hooks/hooks";
import { UserData } from "./types/UserTypes";

function App() {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem("token");

  if (token) {
    const tokenData: UserData = jwtDecode(token as string);
    const userData = {
      name: tokenData.name,
      username: tokenData.username,
      id: tokenData.id,
      logged: true,
    };
    dispatch(loginActionCreator(userData));
  }

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
        <Route
          path="/my-profile"
          element={
            <CredentialsValidation>
              <ProfilePage />
            </CredentialsValidation>
          }
        />
        <Route
          path="/add-post"
          element={
            <CredentialsValidation>
              <AddPostPage />
            </CredentialsValidation>
          }
        />
        <Route path=""></Route>
      </Routes>
      <Navigation />
      <Modal />
    </>
  );
}

export default App;
