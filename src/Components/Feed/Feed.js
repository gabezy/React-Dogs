import React from "react";
import FeedModal from "./FeedModal";
import FeedPhoto from "./FeedPhoto";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;

    const infiniteScroll = () => {
      console.log(infinite);
      if (infinite) {
        const currentTotalscroll = window.scrollY;
        const pageHeight = document.body.offsetHeight;
        const scrollArea = pageHeight - window.innerHeight; // window.innerHeight = User view height

        if (currentTotalscroll > scrollArea * 0.75 && !wait) {
          wait = true;
          console.log("ativou");
          setPages((pages) => [...pages, pages.length + 1]);
          setTimeout(() => {
            wait = false;
          }, 1000);
        }
      }
    };

    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhoto
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

export default Feed;
