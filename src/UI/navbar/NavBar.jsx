import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context";

import MyButton from "../button/MyButton";

const NavBar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <nav>
      <div className="nav__items">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/counter">Counter</NavLink>
      </div>
      <MyButton onClick={logout}>Logout</MyButton>
    </nav>
  );
};

export default NavBar;
