import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
import styles from "./UserPhotoPost.module.css";
import { useNavigate } from "react-router-dom";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, request, loading, error } = useFetch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (nome.validate() && peso.validate() && idade.validate()) {
      const formData = new FormData();
      formData.append("img", img.raw);
      formData.append("nome", nome.value);
      formData.append("idade", idade.value);
      formData.append("peso", peso.value);

      const token = localStorage.getItem("token");
      const { url, options } = PHOTO_POST(formData, token);
      const res = await request(url, options);
      console.log(res);
    }
  }
  function handleImgchange({ target }) {
    setImg({
      raw: target.files[0],
      preview: URL.createObjectURL(target.files[0]),
    });
  }

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" id="nome" {...nome} />
        <Input label="Peso" type="number" id="peso" {...peso} />
        <Input label="Idade" type="number" id="idade" {...idade} />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImgchange}
        />
        {loading ? (
          <Button disabled>Enivando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <Error error={error} />}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
