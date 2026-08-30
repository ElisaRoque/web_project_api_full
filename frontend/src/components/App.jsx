import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import { api } from "../utils/api";

import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "",
  );
  const [infoTooltip, setInfoTooltip] = useState(null);

  const navigate = useNavigate();

  function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then(() => {
        setInfoTooltip({
          isSuccess: true,
          message: "Vitória! Você precisa se registrar.",
        });
      })
      .catch(() => {
        setInfoTooltip({
          isSuccess: false,
          message: "Ops, algo saiu deu errado! Por favor, tente novamente.",
        });
      });
  }

  function handleCloseInfoTooltip() {
    if (infoTooltip?.isSuccess) {
      setInfoTooltip(null);
      navigate("/signin");
      return;
    }
    setInfoTooltip(null);
  }

  function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then((data) => {
        setToken(data.token);
        setUserEmail(email);
        localStorage.setItem("userEmail", email);

        return auth.checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data ?? userData);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  }

  function handleLogout() {
    removeToken();
    localStorage.removeItem("userEmail");
    setLoggedIn(false);
    setCurrentUser(null);
    setUserEmail("");
    setCards([]);
    navigate("/signin");
  }

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((data) => {
        setCurrentUser(data.data ?? data);

        setLoggedIn(true);
      })
      .catch(() => {
        removeToken();
        localStorage.removeItem("userEmail");
        setLoggedIn(false);
        setUserEmail("");
      });
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    api.getInitialData().then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    });
  }, [loggedIn]);

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  function handleCardLike(card) {
    const request = card.isLiked
      ? api.removeLike(card._id)
      : api.addLike(card._id);

    request
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch(console.error);
  }

  function handleNewCardSubmit(data) {
    api
      .setNewCard(data.name, data.link)
      .then((newCard) => {
        setCards((cards) => [newCard, ...cards]);
        handleClosePopup();
      })
      .catch(console.error);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        userEmail,
        isLoggedIn: loggedIn,
        handleUpdateUser,
        handleUpdateAvatar,
        handleNewCardSubmit,
        handleLogout,
      }}
    >
      <div className="page__content">
        <Header email={userEmail} loggedIn={loggedIn} onLogout={handleLogout} />
        <InfoTooltip
          isOpen={Boolean(infoTooltip)}
          isSuccess={infoTooltip?.isSuccess}
          message={infoTooltip?.message}
          onClose={handleCloseInfoTooltip}
        />

        <Routes>
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register onRegister={handleRegister} />
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
