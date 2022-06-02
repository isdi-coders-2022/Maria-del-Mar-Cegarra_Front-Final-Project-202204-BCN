import LoginForm from "../components/LoginForm/LoginForm";
import Navigation from "../components/Navigation/Navigation";

const LoginPage = (): JSX.Element => {
  return (
    <div className="bg-main-img bg-scroll bg-no-repeat bg-cover h-screen w-screen ">
      <LoginForm />
      <Navigation />
    </div>
  );
};

export default LoginPage;
