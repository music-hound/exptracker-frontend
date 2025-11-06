import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper";
import { login, logout } from "./store/userSlice";
import { AuthService } from "./services/auth.service";
import { useAppDispatch } from "./store/hooks";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

function App() {
  const dispatch = useAppDispatch();
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getMe();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (err) {
      toast.error(err?.toString());
    }
  };

  useEffect(() => {
    void checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router}/>;
}



export default App;
