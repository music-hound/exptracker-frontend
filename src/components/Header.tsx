import { type FC } from "react";
import { FaBtc, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { removeTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { logout } from "../store/userSlice";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeTokenFromLocalStorage();
    dispatch(logout());
    toast.info("You're logged out");
    navigate("/");
  };

  return (
    <header className="flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm">
      <Link to="/" className="flex flex-1">
        <FaBtc size={20} />
        <span className="ml-2 font-bold">Expense Tracker</span>
      </Link>

      {/* Menu  */}
      {isAuth && (
        <nav>
          <ul className="flex items-center gap-5 ml-auto mr-10">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  !isActive ? "text-white/50" : "inherit"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transactions"}
                className={({ isActive }) =>
                  !isActive ? "text-white/50" : "inherit"
                }
              >
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/categories"}
                className={({ isActive }) =>
                  !isActive ? "text-white/50" : "inherit"
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Actions  */}
      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Logout</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link to="auth" className="btn btn-green">
          Login / Register
          <FaSignInAlt />
        </Link>
      )}
    </header>
  );
};

export default Header;
