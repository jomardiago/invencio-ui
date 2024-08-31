import { Theme } from "@carbon/react";
import LoginForm from "./components/loginForm/LoginForm";
import classes from "./Login.module.scss";

function Login() {
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
