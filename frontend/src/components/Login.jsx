import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/login.css";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data.email, data.password);
  };

  return (
    <div className="login">
      <p className="login__welcome">Entrar</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          id="email"
          required
          name="email"
          placeholder="E-mail"
          type="text"
          value={data.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          required
          name="password"
          placeholder="Senha"
          type="password"
          value={data.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Entrar
          </button>
        </div>
      </form>

      <div className="login__signup">
        <Link to="/signup" className="signup__link">
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </div>
    </div>
  );
};

export default Login;
