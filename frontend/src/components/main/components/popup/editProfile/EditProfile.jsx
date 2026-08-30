import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name"
        name="name"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        type="text"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="name-input-error popup__input-error">
        Este campo é obrigatório.
      </span>
      <input
        className="popup__input popup__input_type_description"
        id="description"
        name="description"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="description-input-error popup__input-error">
        Este campo é obrigatório.
      </span>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
