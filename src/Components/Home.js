import React from "react";
import Feed from "./Feed/Feed";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Feed user={0} />
    </section>
  );
};

export default Home;
