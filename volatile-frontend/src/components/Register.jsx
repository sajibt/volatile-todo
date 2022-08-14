import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../UserContext";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const user = useContext(UserContext);
    let navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const data = { email, password };
    axios.post("http://localhost:4000/register", data, { withCredentials: true }).then((response) => {
      user.setEmail(response.data.email);
      setEmail("");
      setPassword("");
      setRedirect(true);
    });
  };
  if (redirect) {
    return ( navigate("/") )
  }


const Form = styled.div`
margin: 0 auto; 
max-width:250px;
text-align: center;
background: #e9edc9;
padding: 10px
`
  const Button = styled.button`
  padding: 5px;
  `


  return (
    <div>
    <form action="" onSubmit={(e) => registerUser(e)}>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Button type="submit"> register </Button>
    </form>
</div>
  );
};
