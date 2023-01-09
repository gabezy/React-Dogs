import React from "react";
import styles from "./UserStatsGraphs.module.css";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [totalAccess, setTotalAccess] = React.useState(0);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className={`animeLeft ${styles.graph}`}>
      <div className={`${styles.totalAcess}`}>
        <p>Acessos: {totalAccess}</p>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
