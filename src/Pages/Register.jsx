import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseUser";

const Register = () => {
  const navigate = useNavigate();
  const { registerRequest } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      Swal.fire({
        title: "Faltan datos",
        text: "Debe ingresar todos los datos.",
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Email inválido",
        text: "Por favor, ingresa un correo electrónico válido.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres.",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error en la confirmación",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }

    try {
      await registerRequest(email, password);

      Swal.fire({
        title: "Registro exitoso",
        text: "Datos ingresados con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
        showConfirmButton: true,
      });

      navigate("/");
    } catch {
      Swal.fire({
        title: "Error en el registro",
        text: "No se pudo registrar el usuario. Intenta nuevamente.",
        icon: "error",
      });
    }
  };

  return (
    <Form className="register-form" onSubmit={handleSubmit}>
      <Form.Group className="wide-input" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su email"
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
      <Form.Group className="wide-input" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      <Button className="register-btn" type="submit">
        Registrarse
      </Button>
    </Form>
  );
};

export default Register;
