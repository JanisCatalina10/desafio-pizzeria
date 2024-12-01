import axios from "axios";
import "./Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UseUser";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(null);
  const { token, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); 
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/");
        const userAvatar = response.data.results[0].picture.large;
        const userEmail = response.data.results[0].email;
        setAvatar(userAvatar);
        setEmail(userEmail);
      } catch (error) {
        console.error("Error al obtener avatar:", error);
      }
    };
    fetchAvatar();
  }, []);
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
      <p>{email}</p>
      <button
        className="logout-button"
        onClick={() => {
          const confirmLogout = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
          
          if (confirmLogout) {
            logout(); 
            navigate("/login"); 
          }
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
