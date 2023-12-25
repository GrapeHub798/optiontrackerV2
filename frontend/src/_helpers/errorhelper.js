import React from "react";

export const displayError = (errorMessages) => {
  if (!errorMessages) {
    return;
  }

  if (Array.isArray(errorMessages) && errorMessages.length > 0) {
    return (
      <ul className="form-errors">
        {errorMessages.map((singleMessage, idx) => (
          <li key={idx}>{singleMessage}</li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="form-errors">
      <li>{errorMessages}</li>
    </ul>
  );
};
