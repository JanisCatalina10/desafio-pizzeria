import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseUser";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(null);
  const { token, logout, fetchUserProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const fetchProfile = async () => {
        try {
          const userProfile = await fetchUserProfile();
          setEmail(userProfile.email);

          const response = await axios.get("https://randomuser.me/api/");
          const userAvatar = response.data.results[0].picture.large;
          setAvatar(userAvatar);
        } catch (error) {
          console.error("Error al obtener perfil:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo cargar el perfil.",
            icon: "error",
          });
        }
      };
      fetchProfile();
    }
  }, [token, navigate, fetchUserProfile]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <div className="profile">
      <h2>Perfil de Usuario</h2>
      <div className="profile-avatar">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="avatar-image" />
        ) : (
          <p>Cargando avatar...</p>
        )}
      </div>
      <p>{email ? email : "Cargando email..."}</p>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
