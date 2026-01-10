import React from "react";

function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
