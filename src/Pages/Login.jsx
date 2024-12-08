import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseUser";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const { loginRequest } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Swal.fire({
        title: "Email inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
      });
      return;
    }

    try {
      await loginRequest(email, password);

      Swal.fire({
        title: "Login exitoso",
        icon: "success",
      });

      navigate("/");
    } catch {
      Swal.fire({
        title: "Error de autenticación",
        text: "Email o contraseña incorrectos.",
        icon: "error",
      });
    }
  };

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Form.Group className="wide-input" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="wide-input" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button className="login-btn" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
