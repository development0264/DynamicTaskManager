import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Button, Typography } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'Task Title',
    },
    {
        id: 'body',
        numeric: true,
        disablePadding: false,
        label: 'Task Description',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Due Date',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Task Status',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        // onRequestSort(event, property);
        if (property === 'date') {
            onRequestSort(event, property);
        }
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'left' : 'left'}
                        align={headCell.label === 'Actions' ? 'center' : headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontWeight: 'bold' }}
                    >
                        {/* give condition for only sorting on due date */}
                        {headCell.label === 'Due Date' ? (
                            // sorting on all fiels
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                            // sorting on all fiels
                        ) : (
                            headCell.label
                        )}
                        {/* give condition for only sorting on due date */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function PostTable({ posts, handleEdit, handleDelete, handleToggle }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = posts.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(posts, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, posts],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={posts.length}
                        />
                        <TableBody>
                            {visibleRows.map((posts, index) => {
                                return (
                                    <TableRow>
                                        <TableCell align="left"
                                            component="th"
                                            id={posts.id}
                                            scope="posts"
                                            padding="none"
                                        >
                                            {posts.id}
                                        </TableCell>
                                        <TableCell align="left">{posts.title}</TableCell>
                                        <TableCell align="left">{posts.body}</TableCell>
                                        <TableCell align="left">{posts.date}</TableCell>
                                        <TableCell align="left">
                                            <Button style={{ backgroundColor: posts.completed ? "red" : "green", color: "white", margin: "2px 2px 2px 2px" }} onClick={() => handleToggle(posts.id)}>
                                                {posts.completed ? 'Incomplete' : 'Completed'}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button style={{ backgroundColor: "green", color: "white", margin: "2px 2px 2px 2px" }} onClick={() => handleEdit(posts.id)}>Edit</Button>
                                            <Button style={{ backgroundColor: "red", color: "white", margin: "2px 2px 2px 2px" }} onClick={() => handleDelete(posts.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}