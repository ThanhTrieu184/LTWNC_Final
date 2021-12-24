import { useSelector } from "react-redux";

const LoginLayout = ({ children }) => {
  const { userTheme } = useSelector((state) => state.responsive);
  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        userTheme !== "light" && "bg-gray-900"
      }`}
    >
      <main>{children}</main>
    </div>
  );
};

export default LoginLayout;
