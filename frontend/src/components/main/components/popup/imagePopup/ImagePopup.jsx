export default function ImagePopup(props) {
  return (
    <>
      <img
        alt={props.card.name}
        className="popup__image"
        src={props.card.link}
      />
      <p className="popup__caption">{props.card.name}</p>
    </>
  );
}
