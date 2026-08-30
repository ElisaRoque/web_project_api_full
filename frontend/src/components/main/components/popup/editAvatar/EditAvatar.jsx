import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="edit-photo-profile-form"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input popup__input_type_url"
        id="link"
        name="link"
        placeholder="Link de Imagem"
        type="url"
        required
      />
      <span className="link-input-error popup__input-error">
        Este campo é obrigatório.
      </span>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
