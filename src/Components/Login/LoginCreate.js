import React from "react";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm("email");
  //
  const { createUser, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.validate() && password.validate() && email.validate())
      await createUser(username.value, password.value, email.value);
  }

  return (
    <section className={`animeLeft`}>
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" id="username" type="text" {...username} />
        <Input label="email" id="email" type="email" {...email} />
        <Input label="Senha" id="password" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
