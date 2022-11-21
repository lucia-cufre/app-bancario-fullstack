import React from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../Router/coordinator";


function Error() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>ErrorPage</h1>
      <button onClick={() => goToLogin(navigate)}> Voltar a Home </button>
    </div>
  );
}

export default Error;
