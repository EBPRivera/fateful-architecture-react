import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Form, Button } from "react-bootstrap";

import { login } from "../features/user";

const Login = () => {
  const [userParams, setUserParams] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Group, Label, Control } = Form;

  const updateParams = (key, value) => {
    setUserParams({ ...userParams, [key]: value });
  };

  const handleLogin = async () => {
    const { username, password } = userParams;

    await axios
      .post("http://localhost:8080/login", { username, password })
      .then(({ data }) => {
        // save data to redux
        dispatch(login({ id: data.user.id, token: data.token }));
        navigate("/characters");
      })
      .catch((e) => {
        navigate("/");
      });
  };

  return (
    <div id="login">
      <Form>
        <Group className="mb-3">
          <Label>Username</Label>
          <Control
            type="text"
            onChange={(e) => updateParams("username", e.target.value)}
          />
          <br />
          <Label>Password</Label>
          <Control
            type="password"
            onChange={(e) => updateParams("password", e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </Group>
      </Form>
    </div>
  );
};

export default Login;
