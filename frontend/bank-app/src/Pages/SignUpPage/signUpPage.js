import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../Router/coordinator";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../Constants/base_URL";
import axios from "axios";
import { Container, InputsContainer } from "./styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function SignUpPage() {
  const { form, onChange, cleanFields } = useForm({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const SubmitSignUp = () => {
    const url = `${BASE_URL}/user/signup`;

    const body = {
      username: form.username,
      password: form.password,
    };

    axios
      .post(url, body)
      .then((res) => {
        alert("Cadastro realizado com sucesso.");
        goToLogin(navigate);
      })
      .catch((err) => {
        alert("Erro ao cadastrar usuário.");
        console.log(err.message);
      });
  };
  const submit = (event) => {
    event.preventDefault();
    cleanFields();
  };

  return (
    <Container>
      <br/>
      <br/>
      <img width= "100vh" alt="Logo da NG.Cash" src="https://ngcash.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F811701d4-7239-4286-bab8-a8bc585aaaff%2Flogo_ng.png?table=block&id=223de32e-1ed0-47f2-aa90-cc0da84754ee&spaceId=6f9b2303-1422-45c0-a306-a5a53110fd01&width=250&userId=&cache=v2"/>
      <p>Cadastro</p>
      <form onSubmit={submit}>
        <InputsContainer>
          <TextField
            name={"username"}
            value={form.username}
            onChange={onChange}
            placeholder="username"
            type="text"
            fullWidth
            id="outlined-required"
            label="username"
            pattern="^{3,35}$"
            title="O nome de usuário deve conter no mínimo 3 letras."
            required
          />
          <TextField
            name={"password"}
            value={form.password}
            onChange={onChange}
            placeholder="Mínimo 8 caracteres."
            type="password"
            fullWidth
            margin={"normal"}
            label="Senha"
            required
            pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,35}$"
            title="A senha deve conter no mínimo 8 dígitos, uma letra maiúscula e um numero. "
          />
        </InputsContainer>
        <Button
          onClick={SubmitSignUp}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Criar
        </Button>
      </form>
    </Container>
  );
}

export default SignUpPage;
