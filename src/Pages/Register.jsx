import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseUser";


const Register = () => {
  const navigate = useNavigate();
  const { token } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/"); 
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError(true);
      Swal.fire({
        title: "Faltan datos",
        text: "Debe ingresar todos los datos",
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Email inválido",
        text: "Por favor ingrese un email válido",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error en la confirmación",
        text: "Las contraseñas no coinciden",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    Swal.fire({
      title: "Registro exitoso",
      text: "datos ingresados con exito",
      icon: "success",
      confirmButtonText: "Aceptar",
      showConfirmButton: true,
    }).then(() => {
    navigate("/"); 
  });
    setError(false);
  };
  return (
    <Form className="register-form" onSubmit={handleSubmit}>
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
      <Form.Group className="wide-input" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button className="register-btn" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
