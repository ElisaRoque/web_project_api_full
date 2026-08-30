import "/blocks/InfoTooltip.css";

function InfoTooltip({ isOpen, isSuccess, message, onClose }) {
  if (!isOpen) {
    return null;
  }

  const statusClass = isSuccess ? "info-tooltip_success" : "info-tooltip_error";

  return (
    <div
      className={`info-tooltip ${statusClass}`}
      role="dialog"
      aria-modal="true"
      aria-label={isSuccess ? "Cadastro realizado" : "Erro no cadastro"}
    >
      <div className="info-tooltip__container">
        <button
          type="button"
          className="info-tooltip__close"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          ×
        </button>

        <div className="info-tooltip__icon" aria-hidden="true">
          {isSuccess ? "✓" : "×"}
        </div>

        <p className="info-tooltip__message">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
