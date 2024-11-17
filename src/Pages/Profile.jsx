import axios from "axios";
import "./Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(null);

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
        onClick={() => alert("¿Estás seguro de que quieres cerrar sesión?")}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Profile;
