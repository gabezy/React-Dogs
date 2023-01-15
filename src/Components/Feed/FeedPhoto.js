import React from "react";
import FeedPhotoItem from "./FeedPhotoItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhoto.module.css";

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite, pathname }) => {
  const { data, loading, error, request } = useFetch();
  const inUserFeed = pathname === "/conta";

  if (data) console.log(data);
  if (user) console.log(user);

  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET({ page, total, user });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) setInfinite(false);
      console.log("Did request");
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <>
        {data.length ? (
          <ul className={`${styles.feed} animeLeft`}>
            {data.map((photo) => (
              <FeedPhotoItem
                key={photo.id}
                photo={photo}
                setModalPhoto={setModalPhoto}
              />
            ))}
          </ul>
        ) : inUserFeed ? (
          <p className={styles.noPhoto}>Não encontramos nenhuma foto</p>
        ) : null}
      </>
    );
  else {
    return null;
  }
};

export default FeedPhotos;
