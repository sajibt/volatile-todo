import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { Register } from "./components/Register";
import UserContext from "./UserContext";
import Login from "./components/Login";
import { Home } from "./components/Home";

const StyleLink = styled(Link)`
  color: ${(props) => (props.primary ? "palevioletred" : "seagreen")};
  font-weight: bold;
  font-size: 1em;
  margin-top: 1px;
  padding: 0.25em 0.3em;
  text-decoration: none;
`;
const Button = styled.a`
  background: black;
  border-radius: 5px;
  border: 1px solid palevioletred;
  color: white;
  font-size: 1em;
  padding: 2px;
  display: inline-block;
`;

const Nav = styled.nav`
  margin: 0 auto;
  text-align: center;
  padding: 16px;
  font-weight: bold;
`;
const Main = styled.main`
  margin: 0 auto;
  max-width: 250px;
  text-align: center;
  padding: 16px;
  font-weight: bold;
  border-radius: 5px;
`;

function App() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => setEmail(""));
  }

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <Router>
        <Nav>
          <StyleLink to={"/"}>Home</StyleLink>

          {/* if not login show them register and loggin btn */}
          {!email && (
            <>
              <StyleLink primary={"primary"} to={"/login"}>
                Login
              </StyleLink>
              <StyleLink to={"/register"}>Register</StyleLink>
            </>
          )}
          {/* if login show logout button */}
          {!!email && (
            <>
              {/* <div> Logged is a as {email} </div> */}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}>
                {" "}
                Log out{" "}
              </Button>
            </>
          )}
        </Nav>
        {/* <div> Logged is a as {email} */}

        {/*   <button onClick={()=> logout() }> Log out </button> */}

        {/* </div> */}

        {/*               {!email && ( */}
        {/*                 <div> Not logged in  </div> */}
        {/*               )} */}

        <Main>
          <Routes>
            {/* <Route exact path={"/register"} element={<Register />}></Route> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
