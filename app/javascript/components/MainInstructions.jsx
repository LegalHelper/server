import React from "react";
import { Link } from "react-router-dom";

const AuthPage = () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">LegalHelper</h1>
        <p className="lead">
          Тестовая версия админки LegalHelper.
        </p>
        <hr className="my-4" />
        <Link
          to="/instructions"
          className="btn btn-lg custom-button"
          role="button"
        >
          К списку Инструкций.
        </Link>
      </div>
    </div>
  </div>
)
export default AuthPage
