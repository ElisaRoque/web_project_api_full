import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/newCard/NewCard";
import EditAvatar from "./components/Popup/editAvatar/EditAvatar";
import EditProfile from "./components/Popup/editProfile/EditProfile";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editAvatarPopup = {
    title: "Editar a foto do perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <img
          className="profile__image"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <button
          aria-label="Editar foto"
          className="profile__image-edit-button"
          type="button"
          onClick={() => onOpenPopup(editAvatarPopup)}
        ></button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
