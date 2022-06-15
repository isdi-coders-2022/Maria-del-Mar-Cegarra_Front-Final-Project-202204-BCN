import ExitIcon from "../../components/Icons/ExitIcon";
import { logOutActionCreator } from "../../redux/features/userSlice/userSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";

const SettingsPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    window.localStorage.removeItem("token");
    dispatch(logOutActionCreator());
  };

  return (
    <div className="flex justify-center transition-all">
      <div className="backdrop-blur-md absolute md:w-8/12 lg:w-8/12 border rounded-3xl center content-center bottom-0 top-16">
        <h1 className="text-6xl m-4 font-semibold">Settings</h1>
        <div className="flex justify-center items-center place-self-center top-40">
          <button
            className="md:m-2 m-auto mt-8 bg-red-600 shadow-md shadow-[#5865f28a]  py-2 px-6 rounded-xl  hover:bg-red-700 ease-linear duration-200"
            onClick={logOutUser}
          >
            <span className="text-white text-md font-semibold flex flex-row justify-evenly">
              <ExitIcon color={"test-slate-100"} />
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
