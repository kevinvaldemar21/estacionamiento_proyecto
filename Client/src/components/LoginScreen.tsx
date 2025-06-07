import React, { useState } from "react";
import "./LoginScreen.css";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Icon"
          />
        </div>
        <h2>Inicio de Sesión</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-button">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;