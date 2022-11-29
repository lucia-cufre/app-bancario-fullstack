import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../Constants/base_URL";
import axios from "axios";
import { ButtonContainer, Container, InputsContainer } from "./styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { goToAccountPage, goToSignUp } from "../../Router/coordinator";

function LoginPage() {
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
        localStorage.setItem("jwt", res.data.access_token);
        goToAccountPage(navigate)
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
      <img width= "100vh" alt="Logo da NG.Cash" src="https://ngcash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F811701d4-7239-4286-bab8-a8bc585aaaff%2Flogo_ng.png?table=block&id=223de32e-1ed0-47f2-aa90-cc0da84754ee&spaceId=6f9b2303-1422-45c0-a306-a5a53110fd01&width=250&userId=&cache=v2"/>
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
}

export default LoginPage;
