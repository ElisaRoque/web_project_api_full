import { Link, useLocation } from "react-router-dom";
import logo from "/images/logo.svg";
import "/blocks/header.css";

function Header({ email, loggedIn, onLogout }) {
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />

      {loggedIn ? (
        <div className="header__user">
          <span>{email}</span>

          <button type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      ) : (
        <div className="header__auth">
          {location.pathname === "/signup" ? (
            <Link to="/signin" className="header__auth-link">
              Faça o login
            </Link>
          ) : (
            <span className="header__auth-current">Entrar</span>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
