import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

// using React.createContext() to create a global context where
//can access all the info set in the UserStorage anywhere on teh app

export const UserContext = React.createContext();
// set all the data that want to share on the app
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  // set a const to use the Router Dom custom hook to navigate to a certain page
  const navigate = useNavigate();

  // func to get the user using the token to authorization in the server
  // with the USER_GET (api.js) endpoint
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    console.log(json);
  }
  // func to send the username & password to the server
  // to validate the account and if sucess, returns the user token
  // TOKEN_POST(api.js)
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      // throw an error passing the token response status text
      if (!tokenRes.ok) throw new Error(`Usuário não encontrado`);
      const { token } = await tokenRes.json();
      localStorage.setItem("token", token);
      await getUser(token);
      // after login & get the user, load the "/conta" page
      navigate("/conta");
    } catch (e) {
      // set Error with token status text to error (state)
      setError(e.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  // func to logout reseting all the states
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      localStorage.removeItem("token");
      // after logout, load the "/login" page
      navigate("/login");
    },
    [navigate]
  );

  // Using React.useEffect get the token in the local Storage (if exists) and validate before
  // get the user (getUser) when loads the page.
  //this will happen in any component that is wrapped in the UserContext
  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLogin(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (e) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      // sharing all the states and functions using the value parameter
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
