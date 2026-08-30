import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/register.css";

const Register = ({ onRegister }) => {
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
    onRegister(data.email, data.password);
  };

  return (
    <div className="register">
      <p className="register__welcome">Inscrever-se</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          placeholder="E-mail"
          type="email"
          value={data.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <input
          id="password"
          name="password"
          placeholder="Senha"
          type="password"
          value={data.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Inscrever-se
          </button>
        </div>
      </form>
      <div className="register__signin">
        <Link to="/signin" className="register__login-link">
          Já é um membro? Faça o login aqui!
        </Link>
      </div>
    </div>
  );
};

export default Register;
