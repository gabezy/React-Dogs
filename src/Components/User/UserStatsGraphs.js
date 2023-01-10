import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [views, setViews] = React.useState(0);

  React.useEffect(() => {
    if (data.length) {
      const graphData = data.map((item) => {
        return {
          x: item.title,
          y: Number(item.acessos),
        };
      });
      const viewsArr = data.map(({ acessos }) => Number(acessos));
      const totalViews = viewsArr.reduce((acc, value) => acc + value);
      setViews(totalViews);
      setGraph(graphData);
    }
  }, [data]);

  if (data.length)
    return (
      <section className={`animeLeft ${styles.graph}`}>
        <div className={`${styles.totalAcess} ${styles.graphItem}`}>
          <p>Acessos: {views}</p>
        </div>
        <div className={styles.graphItem}>
          <VictoryPie
            data={graph}
            innerRadius={50}
            padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
            style={{
              data: {
                fillOpacity: 0.9,
                stroke: "#fff",
                strokeWidth: 2,
              },
              labels: {
                fontSize: 14,
                fill: "#333",
              },
            }}
          />
        </div>
        <div className={styles.graphItem}>
          <VictoryChart>
            <VictoryBar data={graph} alignment="start" />
          </VictoryChart>
        </div>
      </section>
    );
  else return null;
};

export default UserStatsGraphs;
