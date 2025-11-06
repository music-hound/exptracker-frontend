import type { FC } from "react";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
      Page not found
      <span className="text-9xl">404</span>
      <Link to={"/"} className="btn btn-green">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
