import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { BsTrash, BsPencil } from 'react-icons/bs'; // Importanje ikona

const DataTable = () => {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/ugovori')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setContracts(data); // Assuming the response data is an array of contracts
            })
            .catch(error => {
                console.error('There was a problem fetching the contracts:', error);
            });
    }, []);

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

    return (
        <TableContainer component={Paper} style={{ maxWidth: '90%', margin: 'auto', borderRadius: '12px', backgroundColor: '#192841' }}> {/* Stilizirani kontejner tablice */}
            <Table aria-label="caption table">
                <caption style={{ color: 'white' }}>Popis ugovora</caption>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>Kupac</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Broj ugovora</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Datum akontacije</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Rok isporuke</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Status</TableCell>
                        <TableCell align="center" style={{ color: 'white' }}>Akcije</TableCell> {/* Dodani stupac za akcije */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contracts.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" style={{ color: 'white' }}>
                                {row.kupac}
                            </TableCell>
                            <TableCell align="right" style={{ color: 'white' }}>{row.brojUgovora}</TableCell> {/* Promijenjeno */}
                            <TableCell align="right" style={{ color: 'white' }}>{row.datumAkontacije}</TableCell> {/* Promijenjeno */}
                            <TableCell align="right" style={{ color: 'white' }}>{row.rokIsporuke}</TableCell> {/* Promijenjeno */}
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
        </TableContainer>
    );
}

export default DataTable;
