import React from "react";
import URL from "../URL";

const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //Check if username and password exist and return
    //the user token
    const r = await fetch(`${URL}/jwt-auth/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const json = await r.json();
    // Set a item in the local storage to the
    //user token
    localStorage.setItem("token", json.token);
    console.log(r);
    console.log(json);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="nome do usuário ou email cadastrado"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Senha"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default TokenPost;
