import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Constants/base_URL";
//import HeaderUsuario from "../Components/HeaderUsuario";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProtectedPage } from "../../hooks/useProtectedPage";

function AccountPage() {
    useProtectedPage();
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /* const getBalance = () => {
    setIsLoading(true);
    const url = `${BASE_URL}/user/balance`;

    axios
      .get(url)
      .then((res) => {
        //setPage(res.data);
        console.log(res.data)
        //setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Nao foi possível finalizar a ação");
        console.log(err.message)
      });
  }; */
  const url = `${BASE_URL}/user/balance`;
  axios
    .get(url)
    .then((res) => {
      //setPage(res.data);
      console.log(res.data);
      //setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      alert("Nao foi possível finalizar a ação");
      console.log(err.message);
    });

  /* return (
    <div>
      
      {isLoading && <p>Carregando..</p>}
    
      {page.map((viagem) => {
        return (
          <div key={viagem.id}>
            <Card sx={{ minWidth: 275, padding: 5, margin: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Nome: {viagem.name}
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Planeta: {viagem.planet}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Duração: {viagem.durationInDays}
                </Typography>
                <Typography variant="body2">
                  Descrição: {viagem.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Data: {viagem.date}</Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  ); */
}

export default AccountPage;
