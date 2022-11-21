import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosConfig, BASE_URL } from "../../Constants/base_URL";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../Router/coordinator";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import { useForm } from "../../hooks/useForm";
import { Box, Container } from "@mui/system";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ButtonContainer, InputsContainer } from "./styles";
import FilterTransactions from "../../Components/filterTransactions";

function AccountPage() {
  useProtectedPage();
  const [balance, setBalance] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { form, onChange, cleanFields } = useForm({
    username: "",
    value: "",
  });
  
 
  useEffect(() => {
    getBalance();
    getTransactions();
    // eslint-disable-next-line
  }, []);

  const getBalance = () => {
    setIsLoading(true);
    const url = `${BASE_URL}/user/balance`;

    axios
      .get(url, axiosConfig)
      .then((res) => {
        setBalance(res.data.balance);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Nao foi possível acceder as informações.");
        goToLogin(navigate);
        console.log(err.message);
      });
  };

  const getTransactions = () => {
    setIsLoading(true);
    const url = `${BASE_URL}/transactions`;

    axios
      .get(url, axiosConfig)
      .then((res) => {
        console.log(res.data.transactions);
        setTransactions(res.data.transactions);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Nao foi possível acceder as informações.");
        goToLogin(navigate);
        console.log(err.message);
      });
  };

  const makeTransaction = () => {
    const url = `${BASE_URL}/transactions`;
    const body = {
      username: form.username,
      value: form.value,
    };

    axios
      .post(url, body, axiosConfig)
      .then((res) => {
        alert("Transação feita.");
        cleanFields();
      })
      .catch((err) => {
        alert("Nao foi possível realizar a transação.");
        console.log(err.message);
        cleanFields();
      });
  };

  const changeFilter = (event) => {
    setFilter(event.target.value);
  };

  const Logout = () => {
    localStorage.clear();
    goToLogin(navigate);
  };

  return (
    <Container>
      {isLoading && <p>Carregando..</p>}
      {
        <div>
          <p onClick={Logout}>Logout</p>
          <br />
          <h2>Saldo da conta</h2>
          <h3>R$ {balance.balance}</h3>
          <br />
          <form>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "20ch",
                  padding: "10px",
                  margin: "0px",
                },
              }}
              validate
              autoComplete="off"
            >
              <p>REALIZAR TRANSAÇÃO</p>
              <InputsContainer>
                <TextField
                  name={"username"}
                  value={form.username}
                  onChange={onChange}
                  placeholder="username"
                  required
                  pattern={"^.{3,}"}
                />
                <TextField
                  type="number"
                  name={"value"}
                  value={form.value}
                  onChange={onChange}
                  placeholder="Valor a depositar"
                  required
                />
              </InputsContainer>
              <ButtonContainer>
                <Button color="secondary" onClick={makeTransaction}>
                  Depositar
                </Button>
              </ButtonContainer>
            </Box>
          </form>
          <div>
          <form>
            <select value={filter} onChange={changeFilter}>
              <option value="">Nenhum</option>
              <option value="debit">Saldo debitado</option>
              <option value="credit">Saldo recebido</option>
            </select>
          </form>
          </div>
          {filter ? (
            <FilterTransactions filterType={filter} />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Historial de Transações
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Valor</TableCell>
                    <TableCell align="center">Data</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell align="center">R$ {t.value}</TableCell>
                      <TableCell align="center">{t.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      }
    </Container>
  );
}

export default AccountPage;
