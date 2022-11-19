import { useNavigate } from "react-router-dom";
import { goToAccountPage } from "../../Router/coordinator";
import { useForm } from "../../hooks/useForm";
import { BASE_URL } from "../../Constants/base_URL";
import axios from "axios";
import { Container, InputsContainer } from "./styles";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const SignUpPage = () => {
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
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        alert("Cadastro realizado com sucesso.");
        goToAccountPage(navigate);
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
      <h1>NG-Cash</h1>

      <p>Cadastrar</p>

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
};

export default SignUpPage;
