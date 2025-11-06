import { type FC, type JSX } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: JSX.Element;
}
const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center gap-10 mt-40">
          <h1 className="text-9xl text-center">You are not authorized</h1>
          <p>Please, login to access this page</p>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
