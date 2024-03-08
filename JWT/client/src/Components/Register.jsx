import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HeroSection = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  border: 1px solid #2a1091;
  width: 30%;
  margin-top: 30px;
  border-radius: 15px;
  padding: 30px;
`;

const Button = styled.button`
  padding: 5px 20px;
  font-size: 20px;
  color: white;
  background-color: #2a1091;
  margin: 20px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
`;
const Error = styled.p`
  color: red;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid #2a1091;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  color: #2a1091;
`;

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    setErr("");
    let response;
    console.log("clicked");
    try {
      response = await axios.post(
        "http://localhost:5050/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.status);
      console.log(response);
      navigate("/login");
      if (response.data.error) {
        console.log(response.data.error);
        setErr(response.data.error);
        console.log(Err);
      }
    } catch (err) {
      console.log(err);
      //setErr(err.response.data.error);
    }
  };

  return (
    <HeroSection>
      <H1>"SIGNUP FORM"</H1>
      <Form>
        <Input
          type="text"
          required
          placeholder="enter your name"
          name="name"
          value={name} // Use 'value' to bind the input to the 'name' state
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Input
          type="email"
          name="email"
          required
          placeholder="email@gmail.com"
          value={email} // Use 'value' to bind the input to the 'email' state
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          name="password"
          required
          placeholder="your password here"
          value={password} // Use 'value' to bind the input to the 'password' state
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button onClick={handleClick}>submit</Button>
        {Err && <Error>{Err}</Error>}
      </Form>
    </HeroSection>
  );
};

export default Register;
