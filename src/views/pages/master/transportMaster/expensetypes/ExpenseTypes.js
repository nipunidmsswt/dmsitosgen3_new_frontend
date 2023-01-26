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
import { gridSpacing } from 'store/constant';
import { getAllTaxData, getTaxDataById, getTaxDataByUniqueId } from 'store/actions/masterActions/TaxActions/TaxAction';
import {
    checkDuplicateExpenseRateCode,
    getAllCurrencyListData,
    getExpenseTypesById,
    saveExpenseTypesData,
    updateExpenseTypesData
} from 'store/actions/masterActions/ExpenseTypeAction';
import CreatedUpdatedUserDetailsWithTableFormat from '../../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import axios from 'axios';
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
    // const [Data, setData] = useState({
    //     expenseCode: '',
    //     description: '',
    //     status: true,
    //     expenseTypeDetails: [
    //         {
    //             fromDate: '',
    //             toDate: '',
    //             currencyList: '',
    //             tax: '',
    //             expenseRate: '',
    //             rateWithoutTax: '',
    //             rateWithTax: '',
    //             status: true
    //         }
    //     ]
    // });

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

    yup.addMethod(yup.string, 'checkDuplicateExpenseCode', function (message) {
        return this.test('checkDuplicateExpenseCode', 'Duplicate Expense Code', async function validateValue(value) {
            try {
                console.log(value);
                dispatch(checkDuplicateExpenseRateCode(value));
                console.log(duplicateCode);
                if (duplicateCode != null && duplicateCode.errorMessages.length != 0) {
                    return false;
                } else {
                    return true;
                }
            } catch (error) {}
            return true;
        });
    });

    const validationSchema = yup.object().shape({
        expenseCode: yup.string().required('Required field').checkDuplicateExpenseCode('ggg'),
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
                tax: yup.object().typeError('Required field'),
                fromDate: yup.date().required('Required field'),
                toDate: yup.date().required('Required field'),
                currencyList: yup.object().typeError('Required field'),
                expenseRate: yup.string().required('Required field')
            })
        )
    });

    const expenseTypeToUpdate = useSelector((state) => state.expenseTypesReducer.expenseTypeToUpdate);

    const dispatch = useDispatch();
    const [taxIdValues, setTaxIdValues] = useState(null);
    const [taxValues, setTaxValues] = useState(null);

    // useEffect(() => {
    //     if (currencies.length != 0) {
    //         let array = [];

    //         for (let [key, value] of Object.entries(currencies.currencies)) {
    //             array.push({ name: key, value: value });
    //         }

    //         setCurrecyListArray(array);
    //     }
    // }, [currencies]);
    useEffect(() => {
        console.log('192');
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getExpenseTypesById(code));
        }
    }, [mode]);

    const taxToUpdate = useSelector((state) => state.taxReducer.taxToUpdate);
    const taxToEdit = useSelector((state) => state.taxReducer.taxToEdit);
    console.log(taxToEdit);

    // useEffect(() => {
    //     if ((mode === 'VIEW_UPDATE' && taxToEdit != null) || (mode === 'VIEW' && taxToEdit != null)) {
    //         console.log('tax to edit:' + taxToEdit.taxCode);
    //         setTaxValues(taxToEdit);
    //     }
    // }, [taxToEdit != null]);

    // useEffect(() => {
    //     (async () => {
    //         if ((mode === 'VIEW_UPDATE' && taxToEdit != null) || (mode === 'VIEW' && taxToEdit != null)) {
    //             console.log('taxToEdit:' + taxToEdit);
    //             setTaxValues(taxToEdit);
    //         }
    //     })();
    // }, [taxToEdit]);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    //             const json = await response.json();
    //             setPosts(json.data.children.map((it) => it.data));
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //     fetchData();
    // }, [expenseTypeToUpdate]);

    const [taxData, setData] = useState(null);
    // async function getData(userId) {
    //     console.log(userId);
    //     // const realData1 = null;
    //     const data = await axios
    //         .get(`${process.env.REACT_APP_FINANCE_URL}/taxDetails/${userId}`)
    //         .then((result) => {
    //             console.log(result.json);
    //             console.log(result.data.payload[0]);
    //             const realData1 = result.data.payload[0];
    //             return realData1;
    //         })
    //         .catch((e) => {
    //             console.error(e);
    //         });
    //     console.log(data);

    //     // // const realData = data.data.payload[0];
    //     // // setData(realData);
    //     return data;
    // }

    // useEffect(() => {
    //     console.log(taxData);

    //     //   return () => {
    //     //     second
    //     //   }
    // }, [taxData]);

    async function getData(userId) {
        const data = await getTaxDetails(userId);
        const value = data.data.payload[0];
        console.log(value);
        return value;
    }

    const getTaxDetails = async (userId) => {
        const response = axios.get(`${process.env.REACT_APP_FINANCE_URL}/taxDetails/${userId}`);
        return response;
    };
    // getTaxDetails(item.tax);
    async function getTaxDetailsn(value) {
        try {
            await dispatch(getTaxDataByUniqueId(value));
            console.log(taxToEdit);
            // if (duplicateCode != null && duplicateCode.errorMessages.length != 0) {
            //     return false;
            // } else {
            //     return true;
            // }
        } catch (error) {}
        return taxToEdit;
    }

    useEffect(() => {
        // fetchData();
        // declare the data fetching function
        // const fetchData = () => {
        if (expenseTypeToUpdate != null) {
            const dataArray = [];
            if ((mode === 'VIEW_UPDATE' && expenseTypeToUpdate != null) || (mode === 'VIEW' && expenseTypeToUpdate != null)) {
                console.log(expenseTypeToUpdate.expenseTypeDetails.length);
                if (expenseTypeToUpdate.expenseTypeDetails.length > 0) {
                    expenseTypeToUpdate.expenseTypeDetails.map((item) => {
                        console.log(item.tax);

                        const taxDe = getTaxDetailsn(item.tax);
                        console.log(taxDe);
                        // setTaxIdValues(item.Tax);
                        // console.log('inside');
                        // dispatch(getTaxDataByUniqueId(item.tax));

                        // dispatch(addUser(values))
                        // .then(data=>{
                        //     console.log(data)
                        // })
                        // const getList = async () => {
                        //     console.log('fetch:' + item.tax);
                        //     //await has no effect
                        //     await dispatch(getTaxDataByUniqueId(item.tax));
                        //     console.log(taxValues);
                        // };
                        // getList();
                        // const fetchData = async () => {
                        //     try {
                        //         const list = await dispatch(getTaxDataByUniqueId(item.tax));
                        //         // if (list) {
                        //         console.log('data567:' + list); //
                        //         console.log('return90:' + taxToEdit.taxCode);
                        //         const expenseTypeDetails = {
                        //             fromDate: item.fromDate,
                        //             toDate: item.toDate,
                        //             // currencyList: item.currencyList,

                        //             // tax: taxToEdit,
                        //             expenseRate: item.expenseRate,
                        //             rateWithoutTax: '',
                        //             rateWithTax: '',
                        //             status: item.status
                        //         };
                        //         dataArray.push(expenseTypeDetails);
                        //         console.log(expenseTypeDetails);
                        //         // }

                        //         //
                        //         // });

                        //         // const json = await response.json();
                        //         // setPosts(json.data.children.map((it) => it.data));
                        //     } catch (e) {
                        //         console.error(e);
                        //     }
                        // };
                        // fetchData();
                        const data = getData(item.tax);
                        // // setData(getData(item.tax));
                        console.log(data);
                        const taxDes = data;
                        // console.log(taxDes);
                        // let allPromises = null;
                        // allPromises == data;
                        // console.log(allPromises);
                        // async () => {
                        //     const value = dispatch(getTaxDataByUniqueId(item.tax)).then;
                        //     if (value) {
                        //         // setTaxIdValues(...taxToEdit);
                        //         console.log('dfdfdfdf');
                        //     }
                        // };
                        // axios.get(`${process.env.REACT_APP_FINANCE_URL}/taxDetails/${item.tax}`).then(() => {
                        //     // dispatch(functionToDispatch())
                        //     console.log('dfdfdfdf' + taxToEdit);
                        // });

                        // here i'm using the location from the first function
                        // await getInfo(location);
                        // })();
                        // const fetchData = async () => {
                        //     const data = await fetch('https://yourapi.com');
                        //   }
                        // console.log(taxData);

                        const expenseTypeDetails = {
                            fromDate: item.fromDate,
                            toDate: item.toDate,
                            currencyList: item.currencyList,

                            tax: taxDes,
                            expenseRate: item.expenseRate,
                            rateWithoutTax: '',
                            rateWithTax: '',
                            status: item.status
                        };
                        dataArray.push(expenseTypeDetails);
                    });

                    const saveValues = {
                        expenseCode: expenseTypeToUpdate.expenseCode,
                        description: expenseTypeToUpdate.description,
                        status: expenseTypeToUpdate.status,
                        expenseTypeDetails: dataArray

                        // expenseTypeDetails: [
                        //     {
                        //         fromDate: item.fromDate,
                        //         toDate: item.toDate,
                        //         currencyList: item.currencyList.currencyListId,
                        //         tax: item.tax.taxId,
                        //         expenseRate: item.expenseRate,
                        //         rateWithoutTax: '',
                        //         rateWithTax: '',
                        //         status:item.status,
                        //     }
                        // ]
                    };
                    console.log(saveValues);
                    setLoadValues(saveValues);
                }
                // dispatch(saveExpenseTypesData(saveValues));
            }
        }
        // };

        // call the function
        // getList()
        // make sure to catch any error
        // .catch(console.error);
    }, [expenseTypeToUpdate]);

    // useEffect(() => {
    //     console.log(taxIdValues);
    //     const value = dispatch(getTaxDataByUniqueId(taxIdValues));

    //     return () => {
    //         console.log(taxToEdit);
    //     };
    // }, [taxIdValues]);

    // useEffect(() => {
    //     console.log(expenseTypeToUpdate);
    //     const dataArray = [];
    //     if ((mode === 'VIEW_UPDATE' && expenseTypeToUpdate != null) || (mode === 'VIEW' && expenseTypeToUpdate != null)) {
    //         if (expenseTypeToUpdate.expenseTypeDetails.length > 0) {
    //             expenseTypeToUpdate.expenseTypeDetails.map((item) => {
    //                 dispatch(await getTaxDataByUniqueId(item.tax));
    //                 const fetchData = async () => {
    //                     const data = await fetch('https://yourapi.com');
    //                   }
    //                 console.log(taxToEdit);
    //                 const expenseTypeDetails = {
    //                     fromDate: item.fromDate,
    //                     toDate: item.toDate,
    //                     currencyList: item.currencyList,

    //                     tax: taxToEdit,
    //                     expenseRate: item.expenseRate,
    //                     rateWithoutTax: '',
    //                     rateWithTax: '',
    //                     status: item.status
    //                 };
    //                 dataArray.push(expenseTypeDetails);
    //             });

    //             const saveValues = {
    //                 expenseCode: expenseTypeToUpdate.expenseCode,
    //                 description: expenseTypeToUpdate.description,
    //                 status: expenseTypeToUpdate.status,
    //                 expenseTypeDetails: dataArray

    //                 // expenseTypeDetails: [
    //                 //     {
    //                 //         fromDate: item.fromDate,
    //                 //         toDate: item.toDate,
    //                 //         currencyList: item.currencyList.currencyListId,
    //                 //         tax: item.tax.taxId,
    //                 //         expenseRate: item.expenseRate,
    //                 //         rateWithoutTax: '',
    //                 //         rateWithTax: '',
    //                 //         status:item.status,
    //                 //     }
    //                 // ]
    //             };
    //             console.log(saveValues);
    //             setLoadValues(saveValues);
    //         }
    //         // dispatch(saveExpenseTypesData(saveValues));
    //     }
    //     // di
    // }, [expenseTypeToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            const dataArray = [];

            console.log(data.expenseTypeDetails.length);
            console.log(data.expenseTypeDetails.size);
            if (data.expenseTypeDetails.length > 0) {
                data.expenseTypeDetails.map((item) => {
                    const expenseTypeDetails = {
                        fromDate: item.fromDate,
                        toDate: item.toDate,
                        currencyList: item.currencyList.currencyListId,
                        tax: item.tax.taxId,
                        expenseRate: item.expenseRate,
                        rateWithoutTax: '',
                        rateWithTax: '',
                        status: item.status
                    };
                    dataArray.push(expenseTypeDetails);
                });

                const saveValues = {
                    expenseCode: data.expenseCode,
                    description: data.description,
                    status: data.status,
                    expenseTypeDetails: dataArray

                    // expenseTypeDetails: [
                    //     {
                    //         fromDate: item.fromDate,
                    //         toDate: item.toDate,
                    //         currencyList: item.currencyList.currencyListId,
                    //         tax: item.tax.taxId,
                    //         expenseRate: item.expenseRate,
                    //         rateWithoutTax: '',
                    //         rateWithTax: '',
                    //         status:item.status,
                    //     }
                    // ]
                };
                console.log(saveValues);
                dispatch(saveExpenseTypesData(saveValues));
            }
            // dispatch(saveExpenseTypesData(data));
            // setTableData(dataArray);
        } else if (mode === 'VIEW_UPDATE') {
            const dataArray = [];

            console.log(data.expenseTypeDetails.length);
            console.log(data.expenseTypeDetails.size);
            if (data.expenseTypeDetails.length > 0) {
                data.expenseTypeDetails.map((item) => {
                    const expenseTypeDetails = {
                        fromDate: item.fromDate,
                        toDate: item.toDate,
                        currencyList: item.currencyList.currencyListId,
                        tax: item.tax.taxId,
                        expenseRate: item.expenseRate,
                        rateWithoutTax: '',
                        rateWithTax: '',
                        status: item.status
                    };
                    dataArray.push(expenseTypeDetails);
                });

                const saveValues = {
                    expenseCode: data.expenseCode,
                    description: data.description,
                    status: data.status,
                    expenseTypeDetails: dataArray

                    // expenseTypeDetails: [
                    //     {
                    //         fromDate: item.fromDate,
                    //         toDate: item.toDate,
                    //         currencyList: item.currencyList.currencyListId,
                    //         tax: item.tax.taxId,
                    //         expenseRate: item.expenseRate,
                    //         rateWithoutTax: '',
                    //         rateWithTax: '',
                    //         status:item.status,
                    //     }
                    // ]
                };
                console.log(saveValues);
                dispatch(updateExpenseTypesData(saveValues));
            }
        }
        handleClose();
    };

    useEffect(() => {
        console.log(ref.current);
    }, [ref]);

    const taxListData = useSelector((state) => state.taxReducer.taxes);
    const currencyListData = useSelector((state) => state.expenseTypesReducer.currencyList);
    const duplicateCode = useSelector((state) => state.expenseTypesReducer.duplicateExpenseType);
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
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
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
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
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
                                                                            disabled={mode == 'VIEW'}
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
                                                                                                        disabled={
                                                                                                            mode == 'VIEW_UPDATE' ||
                                                                                                            mode == 'VIEW'
                                                                                                        }
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
                                                                                                                        sm: 150
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
                                                                                                        disabled={
                                                                                                            mode == 'VIEW_UPDATE' ||
                                                                                                            mode == 'VIEW'
                                                                                                        }
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
                                                                                                                        sm: 150
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
                                                                                                    // value={
                                                                                                    //     values.expenseTypeDetails[idx]
                                                                                                    //         ? values.expenseTypeDetails[idx]
                                                                                                    //               .currencyList
                                                                                                    //         : null
                                                                                                    // }
                                                                                                    name={`expenseTypeDetails.${idx}.currencyList`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value.currencyListId);
                                                                                                        setFieldValue(
                                                                                                            `expenseTypeDetails.${idx}.currencyList`,
                                                                                                            value
                                                                                                        );
                                                                                                        setFieldValue(
                                                                                                            `expenseTypeDetails.${idx}.currencyList`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    disabled={
                                                                                                        mode == 'VIEW_UPDATE' ||
                                                                                                        mode == 'VIEW'
                                                                                                    }
                                                                                                    options={currencyListOptions}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.currencyCode} - ${option.currencyDescription}`
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
                                                                                                            helperText={
                                                                                                                touched.expenseTypeDetails &&
                                                                                                                touched.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                touched.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ].currencyList &&
                                                                                                                errors.expenseTypeDetails &&
                                                                                                                errors.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                errors.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ].currencyList
                                                                                                                    ? errors
                                                                                                                          .expenseTypeDetails[
                                                                                                                          idx
                                                                                                                      ].currencyList
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
                                                                                                                    ].currencyList &&
                                                                                                                    errors.expenseTypeDetails &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].currencyList
                                                                                                            )}
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
                                                                                                    // disabled={
                                                                                                    //     mode == 'VIEW_UPDATE' ||
                                                                                                    //     mode == 'VIEW'
                                                                                                    // }
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
                                                                                                            helperText={
                                                                                                                touched.expenseTypeDetails &&
                                                                                                                touched.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                touched.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ].tax &&
                                                                                                                errors.expenseTypeDetails &&
                                                                                                                errors.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                errors.expenseTypeDetails[
                                                                                                                    idx
                                                                                                                ].tax
                                                                                                                    ? errors
                                                                                                                          .expenseTypeDetails[
                                                                                                                          idx
                                                                                                                      ].tax
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
                                                                                                                    ].tax &&
                                                                                                                    errors.expenseTypeDetails &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ] &&
                                                                                                                    errors
                                                                                                                        .expenseTypeDetails[
                                                                                                                        idx
                                                                                                                    ].tax
                                                                                                            )}
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
                                                                                                        width: { sm: 100 },
                                                                                                        '& .MuiInputBase-root': {
                                                                                                            height: 40
                                                                                                        }
                                                                                                    }}
                                                                                                    min="0.00"
                                                                                                    step="0.001"
                                                                                                    max="1.00"
                                                                                                    presicion={2}
                                                                                                    // label="Additional Price"
                                                                                                    type="number"
                                                                                                    variant="outlined"
                                                                                                    disabled={
                                                                                                        mode == 'VIEW_UPDATE' ||
                                                                                                        mode == 'VIEW'
                                                                                                    }
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
                                                                                                    error={Boolean(
                                                                                                        touched.expenseTypeDetails &&
                                                                                                            touched.expenseTypeDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            touched.expenseTypeDetails[idx]
                                                                                                                .expenseRate &&
                                                                                                            errors.expenseTypeDetails &&
                                                                                                            errors.expenseTypeDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            errors.expenseTypeDetails[idx]
                                                                                                                .expenseRate
                                                                                                    )}
                                                                                                    helperText={
                                                                                                        touched.expenseTypeDetails &&
                                                                                                        touched.expenseTypeDetails[idx] &&
                                                                                                        touched.expenseTypeDetails[idx]
                                                                                                            .expenseRate &&
                                                                                                        errors.expenseTypeDetails &&
                                                                                                        errors.expenseTypeDetails[idx] &&
                                                                                                        errors.expenseTypeDetails[idx]
                                                                                                            .expenseRate
                                                                                                            ? errors.expenseTypeDetails[idx]
                                                                                                                  .expenseRate
                                                                                                            : ''
                                                                                                    }
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
                                                                                                    // name={`expenseTypeDetails.${idx}.expenseRate`}
                                                                                                    // value={
                                                                                                    //     values.expenseTypeDetails[idx] &&
                                                                                                    //     values.expenseTypeDetails[idx].expenseRate
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
