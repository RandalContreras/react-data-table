// src/components/DataTable.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Estado para la página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Estado para las filas por página

  // Función para obtener los datos desde la API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000');
      if (response.data.status === 'success') {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Llamar a fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Función para manejar el cambio de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

   // Función para manejar el cambio en la cantidad de filas por página
   const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reiniciar a la primera página
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Timestamp</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Server Name</TableCell>
              <TableCell align="center">IP</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Full Address</TableCell>
              <TableCell align="center">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mostrar solo las filas de la página actual con base en rowsPerPage */}
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center">{item.input1.timestamp}</TableCell>
                  <TableCell align="center">{item.input1.date}</TableCell>
                  <TableCell align="center">{item.input1.server_name}</TableCell>
                  <TableCell align="center">{item.input1.ip}</TableCell>
                  <TableCell align="center">{item.input1.name}</TableCell>
                  <TableCell align="center">{parseFloat(item.input1.data.replace(/[\[\]]/g, ''))}</TableCell>
                  <TableCell align="center">{item.input1.full_addr}</TableCell>
                  <TableCell align="center">{item.input1.size}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Componente para el control de paginación */}
      <TablePagination
        component="div"
        count={data.length} // Total de filas
        page={page} // Página actual
        onPageChange={handleChangePage} // Función que maneja el cambio de página
        rowsPerPage={rowsPerPage} // Número de filas por página
        onRowsPerPageChange={handleChangeRowsPerPage} // Función que maneja el cambio de filas por página
        rowsPerPageOptions={[5, 10, 25]} // Opciones para cambiar filas por página
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
};

export default DataTable;
