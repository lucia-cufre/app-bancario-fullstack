import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authorization = localStorage.getItem("authorization");

    if (authorization === null) {
      navigate("/user/login");
    }
  }, [navigate]);
};