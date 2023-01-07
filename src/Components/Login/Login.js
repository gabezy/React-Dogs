import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";
import NotFound from "../NotFound";

const Login = () => {
  const { login } = React.useContext(UserContext);

  // similar to the useNavigate custom hook, where if
  // login is true, loads the "/conta" page
  if (login) return <Navigate to="/conta" />;
  return (
    <section className={`${styles.login}`}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/criar" element={<LoginCreate />} />
          <Route path="/esqueceu" element={<LoginPasswordLost />} />
          <Route path="/resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
