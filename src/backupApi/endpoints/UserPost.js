import React from "react";
import URL from "../URL";

const UserPost = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // Acess the endpoint "/api/user" to send and
    // verify if username, email and password are already register
    // if not, register them
    fetch(`${URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        placeholder="Nome"
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Senha"
        onChange={({ target }) => setPassword(target.value)}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)}
      />
      <button>Cadastrar</button>
    </form>
  );
};

export default UserPost;
