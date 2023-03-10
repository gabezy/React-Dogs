import React from "react";
import FeedModal from "./FeedModal";
import FeedPhoto from "./FeedPhoto";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]); // Create state to handle pages to fetch on feed, start fetch only the first page on the api
  const [infinite, setInfinite] = React.useState(true); // Create state to handle the infinite scroll
  const { pathname } = useLocation();
  const inFeed = pathname === "/";

  React.useEffect(() => {
    let wait = false;

    const infiniteScroll = () => {
      if (infinite) {
        const currentTotalscroll = window.scrollY;
        const pageHeight = document.body.offsetHeight;
        const scrollArea = pageHeight - window.innerHeight; // window.innerHeight = User view height

        if (currentTotalscroll > scrollArea * 0.75 && !wait) {
          wait = true;
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
          pathname={pathname}
        />
      ))}
      {!infinite && inFeed && (
        <p
          style={{
            width: "fit-content",
            margin: "0 auto",
            marginBlock: "2rem",
          }}
        >
          Fim Feed
        </p>
      )}
    </div>
  );
};
Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
