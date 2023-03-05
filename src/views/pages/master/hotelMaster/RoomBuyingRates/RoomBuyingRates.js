import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import {
    Grid,
    FormGroup,
    FormControlLabel,
    Switch,
    Autocomplete,
    TextField,
    Box,
    Button,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination
} from '@mui/material';
import { getAllSeasonData, getLatestModifiedDetails } from 'store/actions/masterActions/SeasonAction';
import MainCard from 'ui-component/cards/MainCard';
import { Formik, Form, FieldArray } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import AddBoxIcon from '@mui/icons-material/AddBox';

function RoomBuyingRates() {
    const headerInitialValues = {
        category: '',
        code: '',
        description: '',
        status: true
    };
    const [loadValues, setLoadValues] = useState({
        category: '',
        code: '',
        description: '',
        status: true,
        codeAndNameDetails: [{ category: '', code: '', description: '', status: true }]
    });
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [initialValues, setInitial] = useState(headerInitialValues);
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const dispatch = useDispatch();
    const error = useSelector((state) => state.seasonReducer.errorMsg);

    const seasonListData = useSelector((state) => state.seasonReducer.seasons);
    const seasonData = useSelector((state) => state.seasonReducer.season);
    const lastModifiedDate = useSelector((state) => state.seasonReducer.lastModifiedDateTime);
    console.log(seasonData);
    const [marketListOptions, setMarketListOptions] = useState([]);
    useEffect(() => {
        if (seasonListData?.payload?.length > 0) {
            setTableData(seasonListData?.payload[0]);
        }
    }, [seasonListData]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        console.log(seasonData);
        if (seasonData) {
            console.log('sucessToast');
            setHandleToast(true);
            dispatch(getAllSeasonData());
            dispatch(getLatestModifiedDetails());
        }
    }, [seasonData]);

    useEffect(() => {
        setLastModifiedTimeDate(
            lastModifiedDate === ''
                ? ''
                : new Date(lastModifiedDate).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                  })
        );
    }, [lastModifiedDate]);

    useEffect(() => {
        dispatch(getAllSeasonData());
        dispatch(getLatestModifiedDetails());
    }, []);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setCode(data.mainSeason);
        } else if (type === 'INSERT') {
            setCode('');
            setMode(type);
        } else {
            setMode(type);
            setCode(data.mainSeason);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
            <MainCard title="Season">
                <div className="row">
                    <Grid container direction="row">
                        <Grid item lg={12} md={12} xs={12}>
                            <>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={headerInitialValues || loadValues}
                                    onSubmit={(values, { resetForm }) => {
                                        handleSubmit(values);
                                        resetForm('');
                                    }}
                                    // validationSchema={validationSchema1}
                                >
                                    {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                        return (
                                            <Form>
                                                <div style={{ marginTop: '6px', margin: '10px' }}>
                                                    <Grid gap="10px" display="flex">
                                                        <Grid item>
                                                            {' '}
                                                            <Autocomplete
                                                                value={values.marketList}
                                                                name="category"
                                                                disabled={mode == 'VIEW'}
                                                                onChange={(_, value) => {
                                                                    setFieldValue(`marketList`, value);
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                options={marketListOptions}
                                                                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                                                                isOptionEqualToValue={(option, value) => option.marketId === value.marketId}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Markets"
                                                                        sx={{
                                                                            width: { xs: 120 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 41
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        error={Boolean(touched.marketList && errors.marketList)}
                                                                        helperText={
                                                                            touched.marketList && errors.marketList ? errors.marketList : ''
                                                                        }
                                                                        // placeholder="--Select a Manager Code --"
                                                                        variant="outlined"
                                                                        name="marketList"
                                                                        onBlur={handleBlur}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item>
                                                            <TextField
                                                                label="Type Code"
                                                                sx={{
                                                                    width: { xs: 120 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="code"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.code}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.code && errors.code)}
                                                                helperText={touched.code && errors.code ? errors.code : ''}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            {' '}
                                                            <Autocomplete
                                                                value={values.marketList}
                                                                name="category"
                                                                disabled={mode == 'VIEW'}
                                                                onChange={(_, value) => {
                                                                    setFieldValue(`marketList`, value);
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                options={marketListOptions}
                                                                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                                                                isOptionEqualToValue={(option, value) => option.marketId === value.marketId}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Markets"
                                                                        sx={{
                                                                            width: { xs: 120 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 41
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        error={Boolean(touched.marketList && errors.marketList)}
                                                                        helperText={
                                                                            touched.marketList && errors.marketList ? errors.marketList : ''
                                                                        }
                                                                        // placeholder="--Select a Manager Code --"
                                                                        variant="outlined"
                                                                        name="marketList"
                                                                        onBlur={handleBlur}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                                label="Description"
                                                                sx={{
                                                                    width: { xs: 120 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="description"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.description && errors.description)}
                                                                helperText={
                                                                    touched.description && errors.description ? errors.description : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                                label="Description"
                                                                sx={{
                                                                    width: { xs: 120 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="description"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.description && errors.description)}
                                                                helperText={
                                                                    touched.description && errors.description ? errors.description : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <TextField
                                                                label="Description"
                                                                sx={{
                                                                    width: { xs: 120 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="description"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.description && errors.description)}
                                                                helperText={
                                                                    touched.description && errors.description ? errors.description : ''
                                                                }
                                                            />
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    name="status"
                                                                    onChange={handleChange}
                                                                    value={values.status}
                                                                    control={<Switch color="success" />}
                                                                    label="Status"
                                                                    checked={values.status}
                                                                    // disabled={mode == 'VIEW'}
                                                                />
                                                            </FormGroup>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                aria-label="delete"
                                                                type="submit"

                                                                // onClick={() => {
                                                                //     addDataToTable(values);
                                                                //     // resetForm();
                                                                // }}
                                                            >
                                                                {mode === 'INSERT' ? <AddBoxIcon /> : null}
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <br />
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </>

                            <Formik
                                enableReinitialize={true}
                                initialValues={loadValues || initialValues}
                                onSubmit={(values, resetForm) => {
                                    handleSubmitForm(values);
                                    resetForm('');
                                }}
                                // validationSchema={validationSchema}
                            >
                                {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                    return (
                                        <Form>
                                            <FieldArray name="codeAndNameDetails">
                                                {({ insert, remove, push }) => (
                                                    <Paper>
                                                        <TableContainer>
                                                            <Table stickyHeader size="small">
                                                                <TableHead alignItems="center">
                                                                    <TableRow>
                                                                        {/* <TableCell>Sequence</TableCell> */}
                                                                        <TableCell>Category</TableCell>
                                                                        <TableCell>Code </TableCell>
                                                                        <TableCell>Description</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                        <TableCell>Actions</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                        <TableCell>Actions</TableCell>
                                                                        <TableCell>Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {/* {tableBodyData ? ( */}
                                                                <TableBody>
                                                                    {(rowsPerPage > 0
                                                                        ? values.codeAndNameDetails.slice(
                                                                              page * rowsPerPage,
                                                                              page * rowsPerPage + rowsPerPage
                                                                          )
                                                                        : values.codeAndNameDetails
                                                                    ).map((record, idx) => {
                                                                        // {values.codeAndNameDetails.map((record, idx) => {
                                                                        return (
                                                                            <TableRow key={idx} hover>
                                                                                {/* <TableCell>{idx + 1}</TableCell> */}

                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 120 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        disabled
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        name={`codeAndNameDetails.${idx}.category`}
                                                                                        value={
                                                                                            values.codeAndNameDetails[idx] &&
                                                                                            values.codeAndNameDetails[idx].category
                                                                                        }
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.codeAndNameDetails &&
                                                                                                touched.codeAndNameDetails[idx] &&
                                                                                                touched.codeAndNameDetails[idx].category &&
                                                                                                errors.codeAndNameDetails &&
                                                                                                errors.codeAndNameDetails[idx] &&
                                                                                                errors.codeAndNameDetails[idx].category
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.codeAndNameDetails &&
                                                                                            touched.codeAndNameDetails[idx] &&
                                                                                            touched.codeAndNameDetails[idx].category &&
                                                                                            errors.codeAndNameDetails &&
                                                                                            errors.codeAndNameDetails[idx] &&
                                                                                            errors.codeAndNameDetails[idx].category
                                                                                                ? errors.codeAndNameDetails[idx].category
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 120 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        disabled
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="code"
                                                                                        // validate={checkDuplicateCodeForCodeAndName}

                                                                                        name={`codeAndNameDetails.${idx}.code`}
                                                                                        value={
                                                                                            values.codeAndNameDetails[idx] &&
                                                                                            values.codeAndNameDetails[idx].code
                                                                                        }
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.codeAndNameDetails &&
                                                                                                touched.codeAndNameDetails[idx] &&
                                                                                                touched.codeAndNameDetails[idx].code &&
                                                                                                errors.codeAndNameDetails &&
                                                                                                errors.codeAndNameDetails[idx] &&
                                                                                                errors.codeAndNameDetails[idx].code
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.codeAndNameDetails &&
                                                                                            touched.codeAndNameDetails[idx] &&
                                                                                            touched.codeAndNameDetails[idx].code &&
                                                                                            errors.codeAndNameDetails &&
                                                                                            errors.codeAndNameDetails[idx] &&
                                                                                            errors.codeAndNameDetails[idx].code
                                                                                                ? errors.codeAndNameDetails[idx].code
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 120 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`codeAndNameDetails.${idx}.description`}
                                                                                        value={
                                                                                            values.codeAndNameDetails[idx] &&
                                                                                            values.codeAndNameDetails[idx].description
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.codeAndNameDetails &&
                                                                                                touched.codeAndNameDetails[idx] &&
                                                                                                touched.codeAndNameDetails[idx]
                                                                                                    .description &&
                                                                                                errors.codeAndNameDetails &&
                                                                                                errors.codeAndNameDetails[idx] &&
                                                                                                errors.codeAndNameDetails[idx].description
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.codeAndNameDetails &&
                                                                                            touched.codeAndNameDetails[idx] &&
                                                                                            touched.codeAndNameDetails[idx].description &&
                                                                                            errors.codeAndNameDetails &&
                                                                                            errors.codeAndNameDetails[idx] &&
                                                                                            errors.codeAndNameDetails[idx].description
                                                                                                ? errors.codeAndNameDetails[idx].description
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 120 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`codeAndNameDetails.${idx}.description`}
                                                                                        value={
                                                                                            values.codeAndNameDetails[idx] &&
                                                                                            values.codeAndNameDetails[idx].description
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.codeAndNameDetails &&
                                                                                                touched.codeAndNameDetails[idx] &&
                                                                                                touched.codeAndNameDetails[idx]
                                                                                                    .description &&
                                                                                                errors.codeAndNameDetails &&
                                                                                                errors.codeAndNameDetails[idx] &&
                                                                                                errors.codeAndNameDetails[idx].description
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.codeAndNameDetails &&
                                                                                            touched.codeAndNameDetails[idx] &&
                                                                                            touched.codeAndNameDetails[idx].description &&
                                                                                            errors.codeAndNameDetails &&
                                                                                            errors.codeAndNameDetails[idx] &&
                                                                                            errors.codeAndNameDetails[idx].description
                                                                                                ? errors.codeAndNameDetails[idx].description
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 120 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`codeAndNameDetails.${idx}.description`}
                                                                                        value={
                                                                                            values.codeAndNameDetails[idx] &&
                                                                                            values.codeAndNameDetails[idx].description
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.codeAndNameDetails &&
                                                                                                touched.codeAndNameDetails[idx] &&
                                                                                                touched.codeAndNameDetails[idx]
                                                                                                    .description &&
                                                                                                errors.codeAndNameDetails &&
                                                                                                errors.codeAndNameDetails[idx] &&
                                                                                                errors.codeAndNameDetails[idx].description
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.codeAndNameDetails &&
                                                                                            touched.codeAndNameDetails[idx] &&
                                                                                            touched.codeAndNameDetails[idx].description &&
                                                                                            errors.codeAndNameDetails &&
                                                                                            errors.codeAndNameDetails[idx] &&
                                                                                            errors.codeAndNameDetails[idx].description
                                                                                                ? errors.codeAndNameDetails[idx].description
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <FormGroup>
                                                                                        <FormControlLabel
                                                                                            name={`codeAndNameDetails.${idx}.status`}
                                                                                            onChange={handleChange}
                                                                                            value={
                                                                                                values.codeAndNameDetails[idx] &&
                                                                                                values.codeAndNameDetails[idx].status
                                                                                            }
                                                                                            control={<Switch color="success" />}
                                                                                            // label="Status"
                                                                                            checked={values.codeAndNameDetails[idx].status}
                                                                                            disabled
                                                                                            // disabled={mode == 'VIEW'}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    {(values.codeAndNameDetails[idx] &&
                                                                                        values.codeAndNameDetails[idx].id) === '' ? (
                                                                                        <IconButton
                                                                                            aria-label="delete"
                                                                                            onClick={() => {
                                                                                                remove(idx);
                                                                                            }}
                                                                                        >
                                                                                            <HighlightOffIcon />
                                                                                        </IconButton>
                                                                                    ) : null}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })}
                                                                    {/* {emptyRows > 0 && (
                                                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                                                        <TableCell colSpan={6} />
                                                                                    </TableRow>
                                                                                )} */}
                                                                </TableBody>
                                                                <TableFooter>
                                                                    <TableRow>
                                                                        <TablePagination
                                                                            rowsPerPageOptions={[
                                                                                5, 10, 25
                                                                                // { label: 'All', value: -1 }
                                                                            ]}
                                                                            count={values.codeAndNameDetails.length}
                                                                            rowsPerPage={rowsPerPage}
                                                                            page={page}
                                                                            SelectProps={{
                                                                                inputProps: {
                                                                                    'aria-label': 'rows per page'
                                                                                },
                                                                                native: true
                                                                            }}
                                                                            onPageChange={handleChangePage}
                                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                                            //   ActionsComponent={TablePaginationActions}
                                                                        />
                                                                    </TableRow>
                                                                </TableFooter>
                                                                {/* ) : null} */}
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                )}
                                            </FieldArray>

                                            <br />

                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                {mode != 'VIEW' ? (
                                                    <Button
                                                        variant="outlined"
                                                        type="button"
                                                        // onClick={handleClose}
                                                        style={{
                                                            // backgroundColor: '#B22222',
                                                            marginLeft: '10px'
                                                        }}
                                                        onClick={(e) => resetForm()}
                                                    >
                                                        CLEAR
                                                    </Button>
                                                ) : (
                                                    ''
                                                )}

                                                {mode != 'VIEW' ? (
                                                    <Button className="btnSave" variant="contained" type="submit">
                                                        {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                    </Button>
                                                ) : (
                                                    ''
                                                )}
                                            </Box>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Grid>
                    </Grid>
                </div>
            </MainCard>
        </div>
    );
}

export default RoomBuyingRates;
