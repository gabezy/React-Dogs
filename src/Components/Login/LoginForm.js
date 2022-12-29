import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import URL from "../URL";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      const response = await fetch(`${URL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });
      const json = await response.json();
      console.log(response, json);
    }
  }

  return (
    <section className={`container`}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" id="username" type="text" {...username} />
        <Input label="Senha" id="password" type="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/login/criar">Casdastro</Link>
      <Link to="/login/esqueceu">esquceu</Link>
      <Link to="/login/resetar">resetar</Link>
    </section>
  );
};

export default LoginForm;
