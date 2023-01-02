import React from "react";
import FeedPhotoItem from "./FeedPhotoItem";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Loading from "../Helper/Loading";
import styles from "./FeedPhoto.module.css";

const FeedPhoto = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      const res = await request(url, options);
      console.log(res);
    }
    fetchPhotos();
  }, [request]);

  console.log(data);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotoItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhoto;
