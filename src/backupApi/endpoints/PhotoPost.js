import React from "react";
import URL from "../URL";

const PhotoPost = () => {
  const [nome, setNome] = React.useState("");
  const [peso, setPeso] = React.useState("");
  const [idade, setIdade] = React.useState("");
  const [img, setImg] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    //using the FormData constructor cos
    // img is file type and needed to send via
    // FormData
    const formData = new FormData();
    // Using append set a "key" and the "value"
    formData.append("img", img);
    formData.append("nome", nome);
    formData.append("peso", peso);
    formData.append("idade", idade);

    fetch(`${URL}/api/photo`, {
      method: "POST",
      //send Authorization using the user token
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((r) => {
        console.log(r);
        return r.json();
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
        value={nome}
        placeholder="Nome"
        onChange={({ target }) => setNome(target.value)}
      />
      <input
        type="text"
        value={peso}
        placeholder="Peso"
        onChange={({ target }) => setPeso(target.value)}
      />
      <input
        type="text"
        value={idade}
        placeholder="Idade"
        onChange={({ target }) => setIdade(target.value)}
      />
      <input type="file" onChange={({ target }) => setImg(target.files[0])} />

      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
