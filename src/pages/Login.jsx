import { useContext } from "react";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const login = (e) => {
      e.preventDefault()
      setIsAuth(true)
      localStorage.setItem('auth', 'true')
      navigate('/posts')
    }

  return (
    <div>
      <h1>Login</h1>
      <form action="" onSubmit={login}>
				<MyInput type="text" placeholder="Login" />
				<MyInput type="password" placeholder="Password" />
				<MyButton>Go</MyButton>
			</form>
    </div>
  );
};

export default Login;
