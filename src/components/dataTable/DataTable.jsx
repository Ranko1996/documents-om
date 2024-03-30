import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import { BsTrash, BsPencil } from 'react-icons/bs'; // Importanje ikona

const DataTable = ({ contracts }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getStatusClass = (status) => {
        switch (status) {
            case "KREIRANO":
                return { backgroundColor: 'green', color: 'white', border: '5px solid green', fontWeight: 'bold' };
            case "NARUČENO":
                return { backgroundColor: 'rgb(255, 204, 0)', color: 'white', border: '5px solid rgb(255, 204, 0)', fontWeight: 'bold' };
            case "ISPORUČENO":
                return { backgroundColor: 'gray', color: 'white', border: '5px solid gray', fontWeight: 'bold' };
            default:
                return {};
        }
    };

    const handleEdit = (id) => {
        // Implementacija funkcije za uređivanje
    };

    const handleDelete = (id) => {
        // Implementacija funkcije za brisanje
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <TableContainer component={Paper} style={{ maxWidth: '90%', margin: 'auto', borderRadius: '12px' }}>
            <Table aria-label="caption table">
                <caption>Popis ugovora</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Kupac</TableCell>
                        <TableCell align="right">Broj ugovora</TableCell>
                        <TableCell align="right">Rok isporuke</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="center">Akcije</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.kupac}
                            </TableCell>
                            <TableCell align="right">{row.brojUgovora}</TableCell>
                            <TableCell align="right">{row.rokIsporuke}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    style={{
                                        borderRadius: '30px',
                                        ...getStatusClass(row.status)
                                    }}
                                >
                                    {row.status}
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDelete(row.id)} startIcon={<BsTrash />} color="error"></Button>
                                <Button onClick={() => handleEdit(row.id)} startIcon={<BsPencil />}></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={contracts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default DataTable;
