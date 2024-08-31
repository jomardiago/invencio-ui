import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Theme } from "@carbon/react";
import LoginForm from "./components/loginForm/LoginForm";
import useSessionStore from "../../stores/sessionStore";
import classes from "./Login.module.scss";

function Login() {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <div className={classes.container}>
      <Theme theme="white" className={classes.loginFormWrapper}>
        <div className={classes.loginFormHeader}>
          <h1>Login</h1>
          <p>Invencio - An Inventory Management System</p>
        </div>
        <div>
          <LoginForm />
        </div>
      </Theme>
    </div>
  );
}

export default Login;
