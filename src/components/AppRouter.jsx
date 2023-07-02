import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context";

import { publicRoutes, privateRoutes } from "../router/routes";

import Loader from "../UI/loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, isLoading, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuth) {
    return (
      <Routes>
        {privateRoutes.map((route) => (
          <Route element={route.element} path={route.path} key={route.path} />
        ))}
      </Routes>
    );
  } else {
    return (
      <Routes>
        {publicRoutes.map((route) => (
          <Route element={route.element} path={route.path} key={route.path} />
        ))}
      </Routes>
    );
  }
};

export default AppRouter;
