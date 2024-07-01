import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="cart cart--empty">
      <h2>ERROR 😕</h2>

      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
