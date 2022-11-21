import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosConfig, BASE_URL } from "../Constants/base_URL";


function FilterTransactions(props) {
  const [filterType, setFilterType] = useState([]);

  useEffect(() => {
    getFilterTransactions(props.filterType);
     // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filterType !== props.filterType) {
      getFilterTransactions(props.filterType);
    }
     // eslint-disable-next-line
  }, [filterType]);

  const getFilterTransactions = (data) => {
    const url = `${BASE_URL}/transactions/filter/?sort=${data}`;

    axios
      .get(url, axiosConfig)
      .then((res) => {
        setFilterType(res.data.transactions);
        console.log(res.data.transactions);
      })
      .catch((err) => {
        alert("Nao foi possível filtrar.");
        console.log(err.message);
      });
  };

  return (
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
          {filterType.map((t) => (
            <TableRow key={t.id}>
              <TableCell align="center">R$ {t.value}</TableCell>
              <TableCell align="center">{t.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FilterTransactions;
