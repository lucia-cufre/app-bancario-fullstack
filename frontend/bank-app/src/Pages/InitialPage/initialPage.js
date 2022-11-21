import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../Router/coordinator";
import { useEffect } from "react";

function InitialPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      goToLogin(navigate);
    }, 2000);
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <h1>NG.CASH</h1>
    </Container>
  );
}

export default InitialPage;
