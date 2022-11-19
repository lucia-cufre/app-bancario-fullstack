import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../Constants/base_URL";
import axios from "axios";
import { ButtonContainer, Container, InputsContainer } from "./styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { goToAccountPage, goToSignUp } from "../../Router/coordinator";

const LoginPage = () => {
  const navigate = useNavigate();

  const { form, onChange, cleanFields } = useForm({
    username: "",
    password: "",
  });

  const submitLogin = () => {
    const url = `${BASE_URL}/user/login`;
    const body = {
      username: form.username,
      password: form.password,
    };

    axios
      .post(url, body)
      .then((res) => {
        localStorage.setItem("authorization", res.data.access_token);
        console.log(res)
        goToAccountPage(navigate);
      })
      .catch((err) => {
        alert("Credencias invalidas.");
        console.log(err.message);
      });
  };

  const submit = (event) => {
    event.preventDefault();
    cleanFields();
  };

  return (
    <Container>
      <h1>NG-Cash</h1>
      <p>Entrar</p>
      <form onSubmit={submit}>
        <InputsContainer>
          <TextField
            name={"username"}
            value={form.username}
            onChange={onChange}
            placeholder="@username"
            type="name"
            fullWidth
            margin={"normal"}
            id="outlined-required"
            label="Username"
            required
          />
          <TextField
            name={"password"}
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            type="password"
            margin={"normal"}
            fullWidth
            id="outlined-required-password"
            label="Senha"
            pattern={"^.{8,}"}
            required
          />
        </InputsContainer>
        <ButtonContainer>
          <Button
            onClick={submitLogin}
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>
          <Button
            onClick={() => goToSignUp(navigate)}
            size="small"
            color={"inherit"}
          >
            Não possui cadastro? Clique aqui.
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default LoginPage;
