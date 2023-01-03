import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    EnhancedTableHead,
    getComparator,
    HeadCell,
    Order,
    stableSort
} from "../../../../components/table/EnhancedTableHead";
import terminalData from "../../../../data/result_w_address.json";
import './searchBox.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    InputLabel,
    MenuItem, OutlinedInput, Select, SelectChangeEvent,
    Typography
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface Terminal {
    terminal: string,
    address_info: {
        country:string
    }
}

const headCells: HeadCell[] = [
    {
        id: 'terminal',
        numeric: false,
        disablePadding: true,
        label: 'Terminal',
    }
];

const ActiveMerch = (props: any) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [countryName, setCountryName] = React.useState<string>();
    const [terminal, setTerminal] = useState<Terminal[]>([]);
    const [response, setResponse] = useState<Terminal[]>([]);
    const { selectPosition, setSelectPosition } = props;

    useEffect(() => {
        setResponse(terminalData);
        setTerminal(terminalData);
    },[]);

    const arrayTerminal = [];
    const terminalCountry: any[] = [];

    for (let i = 0; i < terminal.length; i++) {
        arrayTerminal.push(terminal[i])
    }

    const rows: any = arrayTerminal;

    for (const terminalDataKey in terminalData) {
        if(!terminalCountry.includes(terminalData[terminalDataKey].address_info.country)) {
            terminalCountry.push(terminalData[terminalDataKey].address_info.country);
        }
    }

    terminalCountry.sort((a, b) => a.localeCompare(b));

    const handleChangeSelectCountry = (event: SelectChangeEvent<typeof countryName>) => {
        setCountryName(event.target.value);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: React.MouseEvent<unknown>, terminal: []) => {
        setSelectPosition(terminal);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const setCountry = (filter: string) => {
        // setto il codice paese che è stato scelto
        if (filter.length) {
            setTerminal(response.filter(cast => cast.address_info.country.toLowerCase().includes(filter.toLowerCase())))
            setPage(0);
        } else {
            setTerminal(response)
        }
    }

    return (
        <div style={{justifyContent: 'center', alignItems: 'center'}}>
            <div className="title">
                <span>Terminal</span>
            </div>

            <div style={{ marginLeft: '60px' }}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={countryName}
                        onChange={handleChangeSelectCountry}
                        input={<OutlinedInput label="Name" />}
                        MenuProps={MenuProps}
                    >
                        {terminalCountry.map((country) => (
                            <MenuItem
                                key={country}
                                value={country}
                                onClick={() => setCountry(country)}
                            >
                                {country}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2, backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                headCells={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row: any, index: any) => {
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row)}
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.terminal}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <TableCell>
                                                    <div/>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Accordion>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel"
                                                            id="panel"
                                                        >
                                                            <Typography>{row.terminal}</Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography>
                                                                Address: {row.Address}
                                                            </Typography>
                                                            <Typography>
                                                                Web: {row.Address}
                                                            </Typography>
                                                            <Typography>
                                                                Phone: {row.Phone}
                                                            </Typography>
                                                            <Typography>
                                                                Web: {row.Web}
                                                            </Typography>
                                                            <Typography>
                                                                Zip Code: {row.address_info.zipcode}
                                                            </Typography>
                                                            <Typography>
                                                                Country: {row.address_info.country}
                                                            </Typography>
                                                            <Typography>
                                                                Region: {row.address_info.region}
                                                            </Typography>
                                                            <Typography>
                                                                City: {row.address_info.city}
                                                            </Typography>
                                                            <Typography>
                                                                State: {row.address_info.state}
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>

        </div>
    );
}

export default ActiveMerch
