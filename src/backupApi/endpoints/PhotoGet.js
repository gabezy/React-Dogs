import React from "react";
import URL from "../URL";

const PhotoGet = () => {
  const [id, setId] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // if id is falsy, the fetch will return the last 10 photos
    // if id is truthy, will return the photo that matches the id
    fetch(`${URL}/api/photo/${id}`)
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
        value={id}
        onChange={({ target }) => setId(target.value)}
      />
      <button>Buscar</button>
    </form>
  );
};

export default PhotoGet;
