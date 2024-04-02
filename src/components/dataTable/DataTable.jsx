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
import { BsTrash, BsPencil, BsEye, BsSearch } from 'react-icons/bs';
import Edit from '../add/Edit'; 
import ContractCardModal from '../add/ContractDetails'; 
import './DataTable.css'

const DataTable = ({ contracts, setContracts }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterCustomerName, setFilterCustomerName] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedContractId, setSelectedContractId] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

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
        setSelectedContractId(id);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Jeste li sigurni da želite izbrisati ovaj ugovor?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/deleteContract/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Something went wrong with the deletion process');
                }
                setContracts(prevContracts => prevContracts.filter(contract => contract.id !== id));
                alert("Ugovor je uspješno izbrisan.");
            } catch (error) {
                console.error('Failed to delete the contract:', error);
                alert("Došlo je do pogreške pri brisanju ugovora.");
            }
        }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    const handleCustomerNameFilterChange = (event) => {
        setFilterCustomerName(event.target.value);
    };

    const handleView = (contract) => {
        setSelectedContract(contract);
        setIsViewModalOpen(true);
    };

    const filteredContracts = contracts.filter(contract => 
        (filterStatus === 'ALL' || (filterStatus === 'ACTIVE' && (contract.status === 'KREIRANO' || contract.status === 'NARUČENO')) ||
        (filterStatus === 'INACTIVE' && contract.status === 'ISPORUČENO')) &&
        (filterCustomerName === '' || contract.kupac.toLowerCase().includes(filterCustomerName.toLowerCase()))
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div style={{ maxWidth: '90%', margin: 'auto', borderRadius: '12px' }}>
 <div style={{ display: 'flex', justifyContent: 'space-between', margin: '40px auto', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <div>
        <Button onClick={() => handleFilterChange('ACTIVE')} variant="contained" style={{ marginRight: '10px' }}>Aktivni ugovori</Button>
        <Button onClick={() => handleFilterChange('INACTIVE')} variant="contained" style={{ marginRight: '10px' }}>Neaktivni ugovori</Button>
        <Button onClick={() => handleFilterChange('ALL')} variant="contained">Svi ugovori</Button>
    </div>
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input 
            type="text" 
            className='search-input'
            placeholder="Pretraži po imenu kupca" 
            value={filterCustomerName} 
            onChange={handleCustomerNameFilterChange} 
        />
        <BsSearch className="search-icon" />
    </div>
</div>

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
                        {filteredContracts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                    {row.status !== 'ISPORUČENO' && (
                                        <>
                                            <Button onClick={() => handleDelete(row.id)} startIcon={<BsTrash />} color="error"></Button>
                                            <Button onClick={() => handleEdit(row.id)} startIcon={<BsPencil />}></Button>
                                        </>
                                    )}
                                    <Button onClick={() => handleView(row)} startIcon={<BsEye />} color="info"></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredContracts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {isEditModalOpen && (
                <Edit 
                    setOpen={setIsEditModalOpen} 
                    setContracts={setContracts} 
                    id={selectedContractId} 
                />
            )}
            {isViewModalOpen && selectedContract && (
                <ContractCardModal 
                    contract={selectedContract} 
                    setOpen={setIsViewModalOpen} 
                />
            )}
        </div>
    );
}

export default DataTable;