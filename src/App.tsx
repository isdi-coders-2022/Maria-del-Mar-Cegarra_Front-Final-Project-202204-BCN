import jwtDecode from "jwt-decode";
import { Navigate, Route, Routes } from "react-router-dom";
import CredentialsValidation from "./components/CredentialsValidation/CredentialsValidation";
import Modal from "./components/Modal/Modal";
import Navigation from "./components/Navigation/Navigation";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import DetailPostPage from "./pages/DetailPostPage/DetailPostPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useAppDispatch } from "./redux/hooks/hooks";
import { UserData } from "./types/UserTypes";
import { loginActionCreator } from "./redux/features/userSlice/userSlice";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Loading from "./components/Loading/Loading";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem("token");

  if (token) {
    const tokenData: UserData = jwtDecode(token);
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
      <Modal />
      <CredentialsValidation>
        <ScrollToTop>
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/my-profile" element={<ProfilePage />} />
            <Route path="/add-post" element={<AddPostPage />} />
            <Route path="/post/:id" element={<DetailPostPage />} />
            <Route path="/post/edit/:postId" element={<EditPostPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </ScrollToTop>
      </CredentialsValidation>
      <Navigation />
      <Loading />
    </>
  );
}

export default App;
