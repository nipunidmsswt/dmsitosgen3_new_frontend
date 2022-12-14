import { useEffect, forwardRef, useState, Fragment, useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
    Autocomplete,
    Button
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, FieldArray } from 'formik';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import * as yup from 'yup';
import {
    saveExChangeRateData,
    updateExChangeRateData,
    getExChangeRateDataById
} from 'store/actions/masterActions/exchangeRateActions/ExchangeRateActions';
import { currencies } from './Currency';
import { gridSpacing } from 'store/constant';
import { getAllTaxData } from 'store/actions/masterActions/TaxActions/TaxAction';
import { getAllCurrencyListData } from 'store/actions/masterActions/ExpenseTypeAction';
import CreatedUpdatedUserDetailsWithTableFormat from '../../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ExpenseTypes({ open, handleClose, mode, code }) {
    const initialValues = {
        expenseCode: '',
        description: '',
        status: true,
        expenseTypeDetails: [
            {
                fromDate: '',
                toDate: '',
                currencyList: null,
                tax: null,
                expenseRate: '',
                rateWithoutTax: '',
                rateWithTax: '',
                status: true
            }
        ]
    };

    const [loadValues, setLoadValues] = useState(null);
    const [currencyListArray, setCurrecyListArray] = useState([]);

    const ref = useRef(null);

    // yup.addMethod(yup.array, "uniqueTaxOrder", function (message) {
    //   return this.test("uniqueTaxOrder", message, function (list) {
    //     const mapper = (x) => {
    //       return x.taxOrder;
    //     };
    //     const set = [...new Set(list.map(mapper))];
    //     const isUnique = list.length === set.length;
    //     if (isUnique) {
    //       return true;
    //     }

    //     const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    //     return this.createError({
    //       path: `expenseTypeDetails[${idx}].taxOrder`,
    //       message: message,
    //     });
    //   });
    // });

    // yup.addMethod(yup.array, "uniqueTaxCode", function (message) {
    //   return this.test("uniqueTaxCode", message, function (list) {
    //     const mapper = (x) => {
    //       return x.tax?.taxCode;
    //     };
    //     const set = [...new Set(list.map(mapper))];
    //     const isUnique = list.length === set.length;
    //     if (isUnique) {
    //       return true;
    //     }

    //     const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    //     return this.createError({
    //       path: `exchangeRates[${idx}].tax`,
    //       message: message,
    //     });
    //   });
    // });

    // yup.addMethod(yup.string, "checkDuplicateTaxGroup", function (message) {
    //   return this.test(
    //     "checkDuplicateTaxGroup",
    //     "Duplicate Tax group",
    //     async function validateValue(value) {
    //       try {
    //         dispatch(checkDuplicateTaxGroupCode(value));

    //         if (
    //           duplicateTaxGroup != null &&
    //           duplicateTaxGroup.errorMessages.length != 0
    //         ) {
    //           return false;
    //         } else {
    //           return true;
    //         }
    //         return false; // or true as you see fit
    //       } catch (error) {}
    //     }
    //   );
    // });

    const validationSchema = yup.object().shape({
        expenseCode: yup.string().required('Required field'),
        description: yup.string().required('Required field'),
        // currencyISOCode: yup.string().required('Required field'),

        // baseCurrencyCode: yup
        //   .string()
        //   .required("Required field")
        //   .checkDuplicateTaxGroup("ggg"),
        // description: yup.string().required("Required field"),
        // exchangeRates: yup.array().of(
        //   yup.object().shape({
        //     // tax: yup.object().typeError("Required field"),
        //     // taxOrder: yup.string(),
        //     // onOriginal: yup.string().required("Required field"),
        //     // fromDate: yup.date().required('Required').nullable(),
        //     // toDate: ,
        //     rate: yup.string().required("Required")
        //   })
        // ),
        //   .uniqueTaxOrder("Must be unique")
        //   .uniqueTaxCode("Must be unique"),
        expenseTypeDetails: yup.array().of(
            yup.object().shape({
                // tax: yup.object().typeError("Required field"),
                fromDate: yup.date().required('Required field'),
                rate: yup.string().required('Required field')
            })
        )
    });

    // const exchnageRateTypeToUpdate = useSelector((state) => state.exchangeRateTypesReducer.exchnageRateTypeToUpdate);
    // console.log(exchnageRateTypeToUpdate);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (currencies.length != 0) {
    //         let array = [];

    //         for (let [key, value] of Object.entries(currencies.currencies)) {
    //             array.push({ name: key, value: value });
    //         }

    //         setCurrecyListArray(array);
    //     }
    // }, [currencies]);
    // useEffect(() => {
    //     if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
    //         dispatch(getExChangeRateDataById(code));
    //     }
    // }, [mode]);

    // useEffect(() => {
    //     if ((mode === 'VIEW_UPDATE' && exchnageRateTypeToUpdate != null) || (mode === 'VIEW' && exchnageRateTypeToUpdate != null)) {
    //         setLoadValues(exchnageRateTypeToUpdate);
    //     }
    // }, [exchnageRateTypeToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(saveExpenseTypesData(data));
        } else if (mode === 'VIEW_UPDATE') {
            // dispatch(updateExChangeRateData(data));
        }
        handleClose();
    };
    useEffect(() => {
        console.log(ref.current);
    }, [ref]);

    const taxListData = useSelector((state) => state.taxReducer.taxes);
    const currencyListData = useSelector((state) => state.expenseTypesReducer.currencyList);

    const [taxListOptions, setTaxListOptions] = useState([]);
    const [currencyListOptions, setCurrencyListOptions] = useState([]);

    useEffect(() => {
        dispatch(getAllTaxData());
        dispatch(getAllCurrencyListData());
    }, []);

    useEffect(() => {
        console.log(currencyListData);
        if (currencyListData != null) {
            setCurrencyListOptions(currencyListData);
        }
    }, [currencyListData]);

    useEffect(() => {
        console.log(taxListData);
        if (taxListData != null) {
            setTaxListOptions(taxListData);
        }
    }, [taxListData]);

    return (
        <div>
            <Dialog
                maxWidth="100px"
                // width="100px"
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            Expense Types
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <>
                    <DialogContent>
                        <div>
                            <div>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Formik
                                            innerRef={ref}
                                            enableReinitialize={true}
                                            initialValues={loadValues || initialValues}
                                            onSubmit={(values) => {
                                                handleSubmitForm(values);
                                            }}
                                            validationSchema={validationSchema}
                                        >
                                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => {
                                                return (
                                                    <Form>
                                                        <div style={{ marginTop: '6px', margin: '10px' }}>
                                                            <Grid container spacing={gridSpacing}>
                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        name="expenseCode"
                                                                        label="Expense Code"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.expenseCode}
                                                                        error={Boolean(touched.expenseCode && errors.expenseCode)}
                                                                        helperText={
                                                                            touched.expenseCode && errors.expenseCode
                                                                                ? errors.expenseCode
                                                                                : ''
                                                                        }
                                                                    ></TextField>
                                                                </Grid>
                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        name="description"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        label="Description"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.description}
                                                                        error={Boolean(touched.description && errors.description)}
                                                                        helperText={
                                                                            touched.description && errors.description
                                                                                ? errors.description
                                                                                : ''
                                                                        }
                                                                    ></TextField>
                                                                </Grid>
                                                                <Grid item>
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
                                                            </Grid>
                                                        </div>
                                                        <FieldArray name="expenseTypeDetails">
                                                            {({ insert, remove, push }) => (
                                                                <Paper>
                                                                    {mode != 'VIEW' ? (
                                                                        <Box display="flex" flexDirection="row-reverse">
                                                                            <IconButton
                                                                                aria-label="delete"
                                                                                onClick={() => {
                                                                                    // setFieldValue(
                                                                                    //   `taxGroupDetails.${ref.current.values.taxGroupDetails.length}.taxOrder`,
                                                                                    //   ref.current.values.taxGroupDetails.length+1
                                                                                    // );
                                                                                    push({
                                                                                        fromDate: '',
                                                                                        toDate: '',
                                                                                        currency: '',
                                                                                        tax: null,
                                                                                        expenseRate: '',
                                                                                        rateWithoutTax: '',
                                                                                        rateWithTax: '',
                                                                                        status: true
                                                                                    });
                                                                                }}
                                                                            >
                                                                                <AddBoxIcon />
                                                                            </IconButton>
                                                                        </Box>
                                                                    ) : (
                                                                        ''
                                                                    )}

                                                                    <TableContainer>
                                                                        <Table stickyHeader size="small">
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>From Date</TableCell>
                                                                                    <TableCell>To Date</TableCell>
                                                                                    <TableCell>Currency</TableCell>
                                                                                    <TableCell>Tax Code</TableCell>
                                                                                    <TableCell>Tax %</TableCell>
                                                                                    <TableCell>Expense Rate</TableCell>
                                                                                    <TableCell>Rate Without Tax</TableCell>
                                                                                    <TableCell>Rate With Tax</TableCell>
                                                                                    <TableCell>Status</TableCell>
                                                                                    <TableCell>Actions</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {values.expenseTypeDetails.map((record, idx) => {
                                                                                    return (
                                                                                        <TableRow key={idx} hover>
                                                                                            {/* <TableCell>
                                                    {idx + 1}
                                                  </TableCell> */}
                                                                                            <TableCell>
                                                                                                <LocalizationProvider
                                                                                                    dateAdapter={AdapterDayjs}
                                                                                                    // adapterLocale={locale}
                                                                                                >
                                                                                                    <DatePicker
                                                                                                        onChange={(value) => {
                                                                                                            setFieldValue(
                                                                                                                `expenseTypeDetails.${idx}.fromDate`,
                                                                                                                value
                                                                                                            );
                                                                                                        }}
                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                        value={
                                                                                                            values.expenseTypeDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.expenseTypeDetails[idx]
                                                                                                                .fromDate
                                                                                                        }
                                                                                                        renderInput={(params) => (
                                                                                                            <TextField
                                                                                                                {...params}
                                                                                                                sx={{
                                                                                                                    width: {
                                                                                                                        sm: 200
                                                                                                                    },
                                                                                                                    '& .MuiInputBase-root':
                                                                                                                        {
                                                                                                                            height: 40
                                                                                                                        }
                                                                                                                }}
                                                                                                                variant="outlined"
                                                                                                                name={`expenseTypeDetails.${idx}.fromDate`}
                                                                                                                onBlur={handleBlur}
                                                                                                                error={Boolean(
                                                                                                                    touched.expenseTypeDetails &&
                                                                                                                        touched
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ].fromDate &&
                                                                                                                        errors.expenseTypeDetails &&
                                                                                                                        errors
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ].fromDate
                                                                                                                )}
                                                                                                                helperText={
                                                                                                                    touched.expenseTypeDetails &&
                                                                                                                    touched
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    touched
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].fromDate &&
                                                                                                                    errors.expenseTypeDetails &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].fromDate
                                                                                                                        ? errors
                                                                                                                              .expenseTypeDetails[
                                                                                                                              idx
                                                                                                                          ].fromDate
                                                                                                                        : ''
                                                                                                                }
                                                                                                            />
                                                                                                        )}
                                                                                                    />
                                                                                                </LocalizationProvider>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <LocalizationProvider
                                                                                                    dateAdapter={AdapterDayjs}
                                                                                                >
                                                                                                    <DatePicker
                                                                                                        onChange={(value) => {
                                                                                                            console.log(value);
                                                                                                            setFieldValue(
                                                                                                                `expenseTypeDetails.${idx}.toDate`,
                                                                                                                value
                                                                                                            );
                                                                                                        }}
                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                        value={
                                                                                                            values.expenseTypeDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.expenseTypeDetails[idx]
                                                                                                                .toDate
                                                                                                        }
                                                                                                        renderInput={(params) => (
                                                                                                            <TextField
                                                                                                                {...params}
                                                                                                                sx={{
                                                                                                                    width: {
                                                                                                                        sm: 200
                                                                                                                    },
                                                                                                                    '& .MuiInputBase-root':
                                                                                                                        {
                                                                                                                            height: 40
                                                                                                                        }
                                                                                                                }}
                                                                                                                variant="outlined"
                                                                                                                name={`expenseTypeDetails.${idx}.toDate`}
                                                                                                                onBlur={handleBlur}
                                                                                                                helperText={
                                                                                                                    touched.expenseTypeDetails &&
                                                                                                                    touched
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    touched
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].toDate &&
                                                                                                                    errors.expenseTypeDetails &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].toDate
                                                                                                                        ? errors
                                                                                                                              .expenseTypeDetails[
                                                                                                                              idx
                                                                                                                          ].toDate
                                                                                                                        : ''
                                                                                                                }
                                                                                                                error={Boolean(
                                                                                                                    touched.expenseTypeDetails &&
                                                                                                                        touched
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ].toDate &&
                                                                                                                        errors.expenseTypeDetails &&
                                                                                                                        errors
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors
                                                                                                                            .expenseTypeDetails[
                                                                                                                            idx
                                                                                                                        ].toDate
                                                                                                                )}
                                                                                                            />
                                                                                                        )}
                                                                                                    />
                                                                                                </LocalizationProvider>
                                                                                            </TableCell>

                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    value={
                                                                                                        values.expenseTypeDetails[idx]
                                                                                                            ? values.expenseTypeDetails[idx]
                                                                                                                  .currencyList
                                                                                                            : null
                                                                                                    }
                                                                                                    name={`expenseTypeDetails.${idx}.currencyList`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `expenseTypeDetails.${idx}.currencyList`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={currencyListOptions}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.currencyCode} - (${option.currencyDescription})`
                                                                                                    }
                                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                                        option.currencyListId ===
                                                                                                        value.currencyListId
                                                                                                    }
                                                                                                    renderInput={(params) => (
                                                                                                        <TextField
                                                                                                            {...params}
                                                                                                            // label="tax"
                                                                                                            sx={{
                                                                                                                width: { sm: 200 },
                                                                                                                '& .MuiInputBase-root': {
                                                                                                                    height: 40
                                                                                                                }
                                                                                                            }}
                                                                                                            placeholder="--Select a Currency Code --"
                                                                                                            variant="outlined"
                                                                                                            name={`expenseTypeDetails.${idx}.currencyList`}
                                                                                                            onBlur={handleBlur}
                                                                                                            // helperText={
                                                                                                            //     touched.expenseTypeDetails &&
                                                                                                            //     touched.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ] &&
                                                                                                            //     touched.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ].tax &&
                                                                                                            //     errors.expenseTypeDetails &&
                                                                                                            //     errors.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ] &&
                                                                                                            //     errors.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ].tax
                                                                                                            //         ? errors
                                                                                                            //               .expenseTypeDetails[
                                                                                                            //               idx
                                                                                                            //           ].tax
                                                                                                            //         : ''
                                                                                                            // }
                                                                                                            // error={Boolean(
                                                                                                            //     touched.expenseTypeDetails &&
                                                                                                            //         touched
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ] &&
                                                                                                            //         touched
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ].tax &&
                                                                                                            //         errors.expenseTypeDetails &&
                                                                                                            //         errors
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ] &&
                                                                                                            //         errors
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ].tax
                                                                                                            // )}
                                                                                                        />
                                                                                                    )}
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    value={
                                                                                                        values.expenseTypeDetails[idx]
                                                                                                            ? values.expenseTypeDetails[idx]
                                                                                                                  .tax
                                                                                                            : null
                                                                                                    }
                                                                                                    name={`expenseTypeDetails.${idx}.tax`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `expenseTypeDetails.${idx}.tax`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={taxListOptions}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.taxCode} - (${option.taxDescription})`
                                                                                                    }
                                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                                        option.taxId === value.taxId
                                                                                                    }
                                                                                                    renderInput={(params) => (
                                                                                                        <TextField
                                                                                                            {...params}
                                                                                                            // label="tax"
                                                                                                            sx={{
                                                                                                                width: { sm: 200 },
                                                                                                                '& .MuiInputBase-root': {
                                                                                                                    height: 40
                                                                                                                }
                                                                                                            }}
                                                                                                            placeholder="--Select a Tax Code --"
                                                                                                            variant="outlined"
                                                                                                            name={`expenseTypeDetails.${idx}.tax`}
                                                                                                            onBlur={handleBlur}
                                                                                                            // helperText={
                                                                                                            //     touched.expenseTypeDetails &&
                                                                                                            //     touched.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ] &&
                                                                                                            //     touched.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ].tax &&
                                                                                                            //     errors.expenseTypeDetails &&
                                                                                                            //     errors.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ] &&
                                                                                                            //     errors.expenseTypeDetails[
                                                                                                            //         idx
                                                                                                            //     ].tax
                                                                                                            //         ? errors
                                                                                                            //               .expenseTypeDetails[
                                                                                                            //               idx
                                                                                                            //           ].tax
                                                                                                            //         : ''
                                                                                                            // }
                                                                                                            // error={Boolean(
                                                                                                            //     touched.expenseTypeDetails &&
                                                                                                            //         touched
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ] &&
                                                                                                            //         touched
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ].tax &&
                                                                                                            //         errors.expenseTypeDetails &&
                                                                                                            //         errors
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ] &&
                                                                                                            //         errors
                                                                                                            //             .expenseTypeDetails[
                                                                                                            //             idx
                                                                                                            //         ].tax
                                                                                                            // )}
                                                                                                        />
                                                                                                    )}
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {values.expenseTypeDetails[idx] &&
                                                                                                values.expenseTypeDetails[idx].tax
                                                                                                    ? values.expenseTypeDetails[idx].tax
                                                                                                          .percentage
                                                                                                    : 0}
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <TextField
                                                                                                    sx={{
                                                                                                        width: { sm: 200 },
                                                                                                        '& .MuiInputBase-root': {
                                                                                                            height: 40
                                                                                                        }
                                                                                                    }}
                                                                                                    // label="Additional Price"
                                                                                                    type="number"
                                                                                                    variant="outlined"
                                                                                                    placeholder="0"
                                                                                                    name={`expenseTypeDetails.${idx}.expenseRate`}
                                                                                                    value={
                                                                                                        values.expenseTypeDetails[idx] &&
                                                                                                        values.expenseTypeDetails[idx]
                                                                                                            .expenseRate
                                                                                                    }
                                                                                                    onChange={handleChange}
                                                                                                    // onChange={(e) =>
                                                                                                    //     setRateWithTax(e.target.value)
                                                                                                    // }
                                                                                                    onBlur={handleBlur}
                                                                                                    // error={Boolean(
                                                                                                    //     touched.expenseTypeDetails &&
                                                                                                    //         touched.expenseTypeDetails[
                                                                                                    //             idx
                                                                                                    //         ] &&
                                                                                                    //         touched.expenseTypeDetails[idx]
                                                                                                    //             .rate &&
                                                                                                    //         errors.expenseTypeDetails &&
                                                                                                    //         errors.expenseTypeDetails[
                                                                                                    //             idx
                                                                                                    //         ] &&
                                                                                                    //         errors.expenseTypeDetails[idx]
                                                                                                    //             .rate
                                                                                                    // )}
                                                                                                    // helperText={
                                                                                                    //     touched.expenseTypeDetails &&
                                                                                                    //     touched.expenseTypeDetails[idx] &&
                                                                                                    //     touched.expenseTypeDetails[idx]
                                                                                                    //         .rate &&
                                                                                                    //     errors.expenseTypeDetails &&
                                                                                                    //     errors.expenseTypeDetails[idx] &&
                                                                                                    //     errors.expenseTypeDetails[idx].rate
                                                                                                    //         ? errors.expenseTypeDetails[idx]
                                                                                                    //               .rate
                                                                                                    //         : ''
                                                                                                    // }
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {values.expenseTypeDetails[idx] &&
                                                                                                values.expenseTypeDetails[idx].expenseRate
                                                                                                    ? values.expenseTypeDetails[idx]
                                                                                                          .expenseRate
                                                                                                    : 0}
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                {values.expenseTypeDetails[idx] &&
                                                                                                values.expenseTypeDetails[idx].expenseRate
                                                                                                    ? values.expenseTypeDetails[idx]
                                                                                                          .expenseRate *
                                                                                                          (values.expenseTypeDetails[idx]
                                                                                                              .tax.percentage /
                                                                                                              100) +
                                                                                                      values.expenseTypeDetails[idx]
                                                                                                          .expenseRate
                                                                                                    : 0}
                                                                                                {/* <TextField
                                                                                                    sx={{
                                                                                                        width: { sm: 200 },
                                                                                                        '& .MuiInputBase-root': {
                                                                                                            height: 40
                                                                                                        }
                                                                                                    }}
                                                                                                    // label="Additional Price"
                                                                                                    type="number"
                                                                                                    variant="outlined"
                                                                                                    placeholder="0"
                                                                                                    // name={`expenseTypeDetails.${idx}.rate`}
                                                                                                    // value={
                                                                                                    //     values.expenseTypeDetails[idx] &&
                                                                                                    //     values.expenseTypeDetails[idx].rate
                                                                                                    // }
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    // error={Boolean(
                                                                                                    //     touched.expenseTypeDetails &&
                                                                                                    //         touched.expenseTypeDetails[
                                                                                                    //             idx
                                                                                                    //         ] &&
                                                                                                    //         touched.expenseTypeDetails[idx]
                                                                                                    //             .rate &&
                                                                                                    //         errors.expenseTypeDetails &&
                                                                                                    //         errors.expenseTypeDetails[
                                                                                                    //             idx
                                                                                                    //         ] &&
                                                                                                    //         errors.expenseTypeDetails[idx]
                                                                                                    //             .rate
                                                                                                    // )}
                                                                                                    // helperText={
                                                                                                    //     touched.expenseTypeDetails &&
                                                                                                    //     touched.expenseTypeDetails[idx] &&
                                                                                                    //     touched.expenseTypeDetails[idx]
                                                                                                    //         .rate &&
                                                                                                    //     errors.expenseTypeDetails &&
                                                                                                    //     errors.expenseTypeDetails[idx] &&
                                                                                                    //     errors.expenseTypeDetails[idx].rate
                                                                                                    //         ? errors.expenseTypeDetails[idx]
                                                                                                    //               .rate
                                                                                                    //         : ''
                                                                                                    // }
                                                                                                /> */}
                                                                                            </TableCell>

                                                                                            <TableCell>
                                                                                                <FormGroup>
                                                                                                    <FormControlLabel
                                                                                                        name={`expenseTypeDetails.${idx}.status`}
                                                                                                        onChange={handleChange}
                                                                                                        // value={formValues.status}
                                                                                                        control={<Switch color="success" />}
                                                                                                        // label="Status"
                                                                                                        checked={
                                                                                                            values.expenseTypeDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.expenseTypeDetails[idx]
                                                                                                                .status
                                                                                                        }
                                                                                                        disabled={mode == 'VIEW'}
                                                                                                    />
                                                                                                </FormGroup>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <IconButton
                                                                                                    aria-label="delete"
                                                                                                    onClick={() => {
                                                                                                        remove(idx);
                                                                                                    }}
                                                                                                >
                                                                                                    <HighlightOffIcon />
                                                                                                </IconButton>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    );
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </Paper>
                                                            )}
                                                        </FieldArray>

                                                        <br />
                                                        <Box>
                                                            <Grid item>
                                                                {mode === 'VIEW' ? (
                                                                    <CreatedUpdatedUserDetailsWithTableFormat formValues={values} />
                                                                ) : null}
                                                            </Grid>
                                                        </Box>
                                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                            {mode != 'VIEW' ? (
                                                                <Button
                                                                    variant="outlined"
                                                                    type="button"
                                                                    style={{
                                                                        marginLeft: '10px'
                                                                    }}
                                                                    // onClick={handleCancel}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            ) : (
                                                                ''
                                                            )}

                                                            {mode != 'VIEW' ? (
                                                                <Button variant="contained" type="submit" className="btnSave">
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
                        </div>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
}

export default ExpenseTypes;
