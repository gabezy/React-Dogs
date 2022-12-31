import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Stats } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobile, setMobile] = React.useState(false);

  return (
    <nav className={styles.nav}>
      <NavLink to="/conta" end>
        <MinhasFotos />
        {mobile && "Minhas fotos"}
      </NavLink>
      <NavLink to="/conta/estatisticas">
        <Stats />
        {mobile && "Estatísticas"}
      </NavLink>
      <NavLink to="/conta/postar">
        <AdicionarFoto />
        {mobile && "Postar foto"}
      </NavLink>
      <button onClick={userLogout}>
        <Sair />
        {mobile && "sair"}
      </button>
    </nav>
  );
};

export default UserHeaderNav;
