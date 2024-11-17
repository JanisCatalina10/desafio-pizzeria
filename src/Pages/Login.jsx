import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      Swal.fire({
        title: "Faltan datos",
        text: "Debe ingresar todos los datos",
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        title: "Contraseña incorrecta",
        text: "La contraseña debe tener al menos 6 caracteres",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
  };
  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Form.Group className="wide-input" controlId="formBasicEmail">
        <Form.Label>
          Email address {error ? <p>Complete los campos</p> : null}{" "}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="wide-input" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
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
