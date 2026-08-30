import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleNewCardSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    handleNewCardSubmit({
      name,
      link,
    });
  }

  return (
    <form className="popup__form" id="new-card-form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_card-name"
        id="placeName"
        name="place-name"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="placeName-input-error popup__input-error">
        Este campo é obrigatório.
      </span>
      <input
        className="popup__input popup__input_type_url"
        id="link"
        name="link"
        placeholder="Link de Imagem"
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <span className="link-input-error popup__input-error">
        Este campo é obrigatório.
      </span>
      <button className="button popup__button" type="submit">
        Criar
      </button>
    </form>
  );
}
