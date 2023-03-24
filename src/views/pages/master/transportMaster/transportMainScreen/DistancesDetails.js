import React from 'react';
//main screen
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gridSpacing } from 'store/constant';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Autocomplete,
    Button,
    Grid,
    TextField,
    FormGroup,
    FormControlLabel,
    Switch,
    IconButton,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination
} from '@mui/material';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles';
import AlertItemDelete from 'messages/AlertItemDelete';
import AlertItemExist from 'messages/AlertItemExist';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getCodeAndNameDataByType } from 'store/actions/masterActions/CodeAndNameAction';

const useStyles = makeStyles({
    content: {
        justifyContent: 'center'
    }
});

function DistancesDetails({ mode }) {
    const headerInitialValues = {
        category: '',
        code: '',
        description: '',
        status: true
    };
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        console.log(mode);
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    }, [mode]);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [initialValues, setInitial] = useState(headerInitialValues);
    const [openModal, setOpenModal] = useState(false);
    const [existOpenModal, setExistOpenModal] = useState(false);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const [loadValues, setLoadValues] = useState({
        category: '',
        code: '',
        description: '',
        status: true,
        codeAndNameDetails: [{ category: '', code: '', description: '', status: true }]
    });
    yup.addMethod(yup.array, 'uniqueCode', function (message) {
        return this.test('uniqueCode', message, function (list) {
            const mapper = (x) => {
                return x.code;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `codeAndNameDetails[${idx}].code`,
                message: message
            });
        });
    });

    const validationSchema = yup.object().shape({
        codeAndNameDetails: yup.array().of(
            yup.object().shape({
                category: yup.string().required('Required field'),
                code: yup.string().required('Required field'),
                description: yup.string().required('Required field')
            })
        )
        // .uniqueCodeAndNameCode("Must be unique"),
        // .uniqueCode('Code Already Exist')
    });

    const validationSchema1 = yup.object().shape({
        category: yup.string().required('Required field'),
        code: yup.string().required('Required field'),
        description: yup.string().required('Required field')
    });

    //get data from reducers
    const detailsType = useSelector((state) => state.codeAndNameReducer.detailsType);
    const dispatch = useDispatch();

    const [categoryType, setCategoryType] = useState(null);

    const handleModalClose = (status) => {
        setOpenModal(false);

        if (status) {
            dispatch(getCodeAndNameDataByType(categoryType));
        }
    };
    const handleExistModalClose = (status) => {
        if (status) {
            setExistOpenModal(false);
        }
    };

    useEffect(() => {
        if (categoryType !== null) {
            loadValues.codeAndNameDetails?.map((s) =>
                s.category === ''
                    ? dispatch(getCodeAndNameDataByType(categoryType))
                    : detailsType.codeAndNameDetails.length != loadValues.codeAndNameDetails.length
                    ? setOpenModal(true)
                    : dispatch(getCodeAndNameDataByType(categoryType))
            );
        }
    }, [categoryType]);

    useEffect(() => {
        if (categoryType !== null) {
            if (detailsType !== null && detailsType.length != 0) {
                setLoadValues(detailsType);
            }
        }
    }, [detailsType]);

    const handleSubmitForm = async (data) => {
        console.log(data);
        // if (mode === 'INSERT') {
        //     dispatch(saveCodeAndNameData(data));
        // } else if (mode === 'VIEW_UPDATE') {
        //     dispatch(updateCodeAndNameData(data));
        // }
        // handleClose();
    };

    const loadCodeAndNameDetails = (event) => {
        const selectedType = event.currentTarget.dataset.value;
        if (loadValues.length != 0) {
        }
        setCategoryType(selectedType);
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const initialValuesNew = {
            category: values.category,
            code: values.category,
            description: '',
            status: true,
            codeAndNameDetails: [
                { category: values.category, code: values.code, description: values.description, status: values.status, id: '' }
            ]
        };

        loadValues.codeAndNameDetails?.map((s) =>
            s.code === values.code && s.category == values.category ? setExistOpenModal(true) : initialValuesNew.codeAndNameDetails.push(s)
        );

        setLoadValues(initialValuesNew);
    };

    return (
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
                                                        helperText={touched.description && errors.description ? errors.description : ''}
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
                                                        helperText={touched.description && errors.description ? errors.description : ''}
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
                                                        helperText={touched.description && errors.description ? errors.description : ''}
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
                        validationSchema={validationSchema}
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
                                                                                        touched.codeAndNameDetails[idx].description &&
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
                                                                                        touched.codeAndNameDetails[idx].description &&
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
                                                                                        touched.codeAndNameDetails[idx].description &&
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
                                    <Box>
                                        <Grid item>
                                            {mode === 'VIEW' ? <CreatedUpdatedUserDetailsWithTableFormat formValues={values} /> : null}
                                        </Grid>
                                    </Box>
                                    <Box>
                                        <Grid item>
                                            {openModal ? (
                                                <AlertItemDelete title="dev" open={openModal} handleClose={handleModalClose} />
                                            ) : null}
                                        </Grid>

                                        <Grid item>
                                            {existOpenModal ? (
                                                <AlertItemExist
                                                    title="Already Exist"
                                                    open={existOpenModal}
                                                    handleClose={handleExistModalClose}
                                                />
                                            ) : null}
                                        </Grid>
                                    </Box>
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
    );
}

export default DistancesDetails;
