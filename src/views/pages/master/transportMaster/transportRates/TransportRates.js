import { useEffect, useState } from 'react';
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
    Checkbox,
    Button,
    Typography,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
    Paper,
    TableContainer,
    Collapse
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';

import { checkDuplicateSeasonCode, getSeasonDataById, saveSeasonData, updateSeasonData } from 'store/actions/masterActions/SeasonAction';
import { getAllChargeMethods, getAllModeofTransports } from 'store/actions/masterActions/TransportRateAction';
import CreatedUpdatedUserDetailsWithTableFormat from '../../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function TransportRates({ open, handleClose, mode, code }) {
    const initialValues = {
        chargeMethod: '',
        transportMode: '',
        code: '',
        description: '',
        status: true,
        direction: '',
        maxPax: '',
        newTransport: true,
        distances: [
            {
                fromLocation: '',
                toLocation: '',
                fromDescription: '',
                toDescription: '',
                distance: '',
                duration: ''
            }
        ],
        paxBaggages: [
            {
                paxPaggegeType: '',
                minPax: '',
                vehicleName: '',
                noOfDrivers: '',
                maxPax: '',
                defaultGuide: '',
                status: '',
                noOfAssistant: ''
            }
        ],
        locationWiseExpenses: [
            {
                location: '',
                locationDescription: '',
                expenseCode: '',
                expenseDescription: '',
                status: ''
            }
        ]
    };

    const [taxListOptions, setTaxListOptions] = useState([]);
    const [loadValues, setLoadValues] = useState(null);
    const [chargeMethodArrayList, setChargeMethodArrayList] = useState([]);
    const [modeofTransportArrayList, setModeofTransportArrayList] = useState([]);

    const [enableFeature, setEnableFeature] = useState('');
    const [openRow, setOpenRow] = useState(-1);

    //Distances
    const [enableblock1, setEnableblock1] = useState(false);
    //Pax/Baggage Vs Vehicle
    const [enableblock2, setEnableblock2] = useState(false);
    //Location wise Expenses
    const [enableblock3, setEnableblock3] = useState(false);
    //Per Km Rate
    const [enableblock4, setEnableblock4] = useState(false);
    //Per Hr Rate
    const [enableblock5, setEnableblock5] = useState(false);
    //Per Vehicle  Rate
    const [enableblock6, setEnableblock6] = useState(false);
    //Per Pax  Rate
    const [enableblock7, setEnableblock7] = useState(false);

    const featureList = [];
    useEffect(() => {
        if (enableFeature === 'BY_DISTANCE') {
            setEnableblock1(true);
            setEnableblock2(true);
            setEnableblock3(true);
            setEnableblock4(true);
        } else if (enableFeature === 'BY_TIME') {
            setEnableblock1(true);
            setEnableblock2(true);
            setEnableblock3(true);
            setEnableblock5(true);
        } else if (enableFeature === 'PER_VEHICLE') {
            setEnableblock1(true);
            setEnableblock6(true);
        } else if (enableFeature === 'PER_PAX') {
            setEnableblock1(true);
            setEnableblock7(true);
        }
    }, [enableFeature]);

    //   yup.addMethod(yup.array, "uniqueTaxOrder", function (message) {
    //     return this.test("uniqueTaxOrder", message, function (list) {
    //       const mapper = (x) => {
    //         return x.taxOrder;
    //       };
    //       const set = [...new Set(list.map(mapper))];
    //       const isUnique = list.length === set.length;
    //       if (isUnique) {
    //         return true;
    //       }

    //       const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    //       return this.createError({
    //         path: `distances[${idx}].taxOrder`,
    //         message: message,
    //       });
    //     });
    //   });

    //   yup.addMethod(yup.array, "uniqueTaxCode", function (message) {
    //     return this.test("uniqueTaxCode", message, function (list) {
    //       const mapper = (x) => {
    //         return x.tax?.taxCode;
    //       };
    //       const set = [...new Set(list.map(mapper))];
    //       const isUnique = list.length === set.length;
    //       if (isUnique) {
    //         return true;
    //       }

    //       const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    //       return this.createError({
    //         path: `distances[${idx}].tax`,
    //         message: message,
    //       });
    //     });
    //   });

    yup.addMethod(yup.string, 'checkDuplicateSeason', function (message) {
        return this.test('checkDuplicateSeason', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    await dispatch(checkDuplicateSeasonCode(value));
                    if (duplicateSeason != null && duplicateSeason.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                } catch (error) {}
            }
            return true;
        });
    });

    const validationSchema = yup.object().shape({
        mainSeason: yup.string().required('Required field'),
        //   .checkDuplicateSeason("Duplicate Code"),
        distances: yup.array().of(
            yup.object().shape({
                subSeason: yup.string().required('Required field'),
                toDate: yup.date().required('Required field'),
                fromDate: yup.date().required('Required field')
            })
        )
        //   .uniqueTaxOrder("Must be unique")
        //   .uniqueTaxCode("Must be unique"),
    });

    //get data from reducers

    const seasonToUpdate = useSelector((state) => state.seasonReducer.seasonToUpdate);
    const duplicateSeason = useSelector((state) => state.seasonReducer.duplicateSeason);
    const modeofTransportList = useSelector((state) => state.modeOfTransortReducer.modeofTransports);
    const chargeMethodList = useSelector((state) => state.chargeMethodReducer.chargeofMethods);
    console.log(chargeMethodList);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('update');
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            console.log(code);
            dispatch(getSeasonDataById(code));
        }
    }, [mode]);

    useEffect(() => {
        setModeofTransportArrayList(modeofTransportList);
        console.log(modeofTransportList);
    }, [modeofTransportList]);

    useEffect(() => {
        setChargeMethodArrayList(chargeMethodList);
    }, [chargeMethodList]);

    useEffect(() => {
        console.log(seasonToUpdate);

        if ((mode === 'VIEW_UPDATE' && seasonToUpdate != null) || (mode === 'VIEW' && seasonToUpdate != null)) {
            setLoadValues(seasonToUpdate);
        }
    }, [seasonToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(saveSeasonData(data));
        } else if (mode === 'VIEW_UPDATE') {
            console.log('yes click');
            dispatch(updateSeasonData(data));
        }
        handleClose();
    };

    useEffect(() => {
        dispatch(getAllChargeMethods());
        dispatch(getAllModeofTransports());
    }, []);

    const handleCancel = () => {
        setLoadValues(initialValues);
    };
    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}{' '}
                            Transport Rates
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
                            <div className="row">
                                <Grid container direction="row">
                                    <Grid item lg={12} md={12} xs={12}>
                                        <>
                                            <Formik
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
                                                            <Grid display="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                                <Grid item>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        select
                                                                        label="Mode of Transport"
                                                                        name="transportMode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.transportMode}
                                                                        error={Boolean(touched.transportMode && errors.transportMode)}
                                                                        helperText={
                                                                            touched.transportMode && errors.transportMode
                                                                                ? errors.transportMode
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {modeofTransportArrayList.length != 0
                                                                            ? modeofTransportArrayList.map((data, key) => {
                                                                                  return (
                                                                                      <MenuItem key={key} value={data}>
                                                                                          {data}
                                                                                      </MenuItem>
                                                                                  );
                                                                              })
                                                                            : null}
                                                                    </TextField>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid display="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                                <Grid item>
                                                                    <Typography variant="h4">Type of Transport</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid gap="10px" display="flex">
                                                                <Grid
                                                                    item
                                                                    display="flex"
                                                                    style={{
                                                                        alignItems: 'center',
                                                                        //   marginTop: "10px",
                                                                        marginBottom: '10px'
                                                                    }}
                                                                >
                                                                    <Typography variant="" component="p" style={{ marginRight: '10px' }}>
                                                                        Create New Type of Transport
                                                                    </Typography>

                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="newTransport"
                                                                                    onChange={handleChange}
                                                                                    checked={values.newTransport}
                                                                                    value={values.newTransport}
                                                                                />
                                                                            }
                                                                        />
                                                                    </FormGroup>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid gap="10px" display="flex" style={{ marginBottom: '10px' }}>
                                                                <Grid item>
                                                                    {/* <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        select
                                                                        label="Code"
                                                                        name="transportCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxGroupType}
                                                                        error={Boolean(touched.taxGroupType && errors.taxGroupType)}
                                                                        helperText={
                                                                            touched.taxGroupType && errors.taxGroupType
                                                                                ? errors.taxGroupType
                                                                                : ''
                                                                        }
                                                                    >
                                                                        <MenuItem dense={true} value={'Sell'}>
                                                                            Sell
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'Buy'}>
                                                                            Buy
                                                                        </MenuItem>
                                                                    </TextField> */}
                                                                    <TextField
                                                                        label="Code"
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE'}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        name="code"
                                                                        value={values.code}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.code && errors.code)}
                                                                        helperText={touched.code && errors.code ? errors.code : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid item>
                                                                    <TextField
                                                                        label="Description"
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE'}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        name="description"
                                                                        value={values.description}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.description && errors.description)}
                                                                        helperText={
                                                                            touched.description && errors.description
                                                                                ? errors.description
                                                                                : ''
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        select
                                                                        label="Change Method"
                                                                        name="chargeMethod"
                                                                        onChange={(value) => {
                                                                            handleChange;
                                                                            setEnableFeature(value.target.value);
                                                                        }}
                                                                        onBlur={handleBlur}
                                                                        value={values.chargeMethod}
                                                                        error={Boolean(touched.chargeMethod && errors.chargeMethod)}
                                                                        helperText={
                                                                            touched.chargeMethod && errors.chargeMethod
                                                                                ? errors.chargeMethod
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {chargeMethodArrayList.length != 0
                                                                            ? chargeMethodArrayList.map((data, key) => {
                                                                                  return (
                                                                                      <MenuItem key={key} value={data}>
                                                                                          {data}
                                                                                      </MenuItem>
                                                                                  );
                                                                              })
                                                                            : null}
                                                                    </TextField>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid gap="10px" display="flex">
                                                                <Grid item>
                                                                    {' '}
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        select
                                                                        label="Direction"
                                                                        name="direction"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.direction}
                                                                        error={Boolean(touched.direction && errors.direction)}
                                                                        helperText={
                                                                            touched.direction && errors.direction ? errors.direction : ''
                                                                        }
                                                                    >
                                                                        <MenuItem dense={true} value={'One Way'}>
                                                                            One Way
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'Return'}>
                                                                            Return
                                                                        </MenuItem>
                                                                    </TextField>
                                                                </Grid>
                                                                <Grid item>
                                                                    <TextField
                                                                        label="Max Pax"
                                                                        sx={{
                                                                            width: { sm: 200, md: 300 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE'}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        name="maxPax"
                                                                        value={values.maxPax}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.maxPax && errors.maxPax)}
                                                                        helperText={touched.maxPax && errors.maxPax ? errors.maxPax : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid>
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            name="status"
                                                                            onChange={handleChange}
                                                                            value={values.status}
                                                                            control={<Switch color="success" />}
                                                                            label="Status"
                                                                            checked={values.status}
                                                                            disabled={mode == 'VIEW'}
                                                                        />
                                                                    </FormGroup>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid display="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                                <Grid item>
                                                                    <Typography variant="h4">Distances</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                display={enableblock1 ? 'flex' : 'none'}
                                                                gap="10px"
                                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                            >
                                                                <Grid item>
                                                                    <FieldArray name="distances">
                                                                        {({ insert, remove, push }) => (
                                                                            <Paper>
                                                                                {mode != 'VIEW' ? (
                                                                                    <Box display="flex" flexDirection="row-reverse">
                                                                                        <IconButton
                                                                                            aria-label="delete"
                                                                                            onClick={() => {
                                                                                                push({
                                                                                                    fromLocation: '',
                                                                                                    toLocation: '',
                                                                                                    fromDescription: '',
                                                                                                    toDescription: true,
                                                                                                    distance: '',
                                                                                                    duration: ''
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
                                                                                                <TableCell>From Location</TableCell>
                                                                                                <TableCell>Description</TableCell>
                                                                                                {/* <TableCell>Free</TableCell> */}
                                                                                                <TableCell>To Location</TableCell>
                                                                                                <TableCell>Description</TableCell>
                                                                                                <TableCell>Distances(KM)</TableCell>
                                                                                                <TableCell>Duration(Hours)</TableCell>
                                                                                                <TableCell>Status</TableCell>
                                                                                                <TableCell>Action</TableCell>
                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            {values.distances.map((record, idx) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <TableRow key={idx} hover>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.fromLocation`}
                                                                                                                    disabled={
                                                                                                                        mode ==
                                                                                                                        'VIEW_UPDATE'
                                                                                                                    }
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].fromLocation
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .fromLocation &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].fromLocation
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].fromLocation &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].fromLocation
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ].fromLocation
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.fromDescription`}
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].fromDescription
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .fromDescription &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .fromDescription
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].fromDescription &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].fromDescription
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ]
                                                                                                                                  .fromDescription
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>

                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.toLocation`}
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].toLocation
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].toLocation &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].toLocation
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].toLocation &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].toLocation
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ].toLocation
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>

                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.toDescription`}
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].toDescription
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .toDescription &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].toDescription
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].toDescription &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].toDescription
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ]
                                                                                                                                  .toDescription
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.distance`}
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].distance
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].distance &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].distance
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].distance &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].distance
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ].distance
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`distances.${idx}.duration`}
                                                                                                                    value={
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.distances[
                                                                                                                            idx
                                                                                                                        ].duration
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.distances &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].duration &&
                                                                                                                            errors.distances &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ].duration
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.distances &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.distances[
                                                                                                                            idx
                                                                                                                        ].duration &&
                                                                                                                        errors.distances &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.distances[
                                                                                                                            idx
                                                                                                                        ].duration
                                                                                                                            ? errors
                                                                                                                                  .distances[
                                                                                                                                  idx
                                                                                                                              ].duration
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <FormGroup>
                                                                                                                    <FormControlLabel
                                                                                                                        control={
                                                                                                                            <Checkbox
                                                                                                                                name={`distances.${idx}.status`}
                                                                                                                                onChange={
                                                                                                                                    handleChange
                                                                                                                                }
                                                                                                                                checked={
                                                                                                                                    values
                                                                                                                                        .distances[
                                                                                                                                        idx
                                                                                                                                    ].status
                                                                                                                                }
                                                                                                                                value={
                                                                                                                                    values
                                                                                                                                        .distances[
                                                                                                                                        idx
                                                                                                                                    ] &&
                                                                                                                                    values
                                                                                                                                        .distances[
                                                                                                                                        idx
                                                                                                                                    ].status
                                                                                                                                }
                                                                                                                            />
                                                                                                                        }
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
                                                                                                    </>
                                                                                                );
                                                                                            })}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </TableContainer>
                                                                            </Paper>
                                                                        )}
                                                                    </FieldArray>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid display="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                                <Grid item>
                                                                    <Typography variant="h4">Pax/Baggage Vs Vehicle</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                display={enableblock1 ? 'flex' : 'none'}
                                                                gap="10px"
                                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                            >
                                                                <Grid item>
                                                                    <FieldArray name="paxBaggages">
                                                                        {({ insert, remove, push }) => (
                                                                            <Paper>
                                                                                {mode != 'VIEW' ? (
                                                                                    <Box display="flex" flexDirection="row-reverse">
                                                                                        <IconButton
                                                                                            aria-label="delete"
                                                                                            onClick={() => {
                                                                                                push({
                                                                                                    paxPaggegeType: '',
                                                                                                    minPax: '',
                                                                                                    vehicleName: '',
                                                                                                    noOfDrivers: '',
                                                                                                    maxPax: '',
                                                                                                    defaultGuide: '',
                                                                                                    status: '',
                                                                                                    noOfAssistant: ''
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
                                                                                                <TableCell>Collapsed?</TableCell>
                                                                                                <TableCell>Pax/Baggage Type</TableCell>
                                                                                                <TableCell>Min Pax</TableCell>
                                                                                                <TableCell>Vehicle Name</TableCell>
                                                                                                {/* <TableCell>Free</TableCell> */}
                                                                                                <TableCell>No of Drivers</TableCell>
                                                                                                <TableCell>Max Pax</TableCell>
                                                                                                <TableCell>Default Guide</TableCell>
                                                                                                <TableCell>No of Assistant</TableCell>
                                                                                                <TableCell>Status</TableCell>
                                                                                                <TableCell>Action</TableCell>
                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            {values.paxBaggages.map((record, idx) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <TableRow key={idx} hover>
                                                                                                            <TableCell>
                                                                                                                <IconButton
                                                                                                                    aria-label="expand row"
                                                                                                                    size="small"
                                                                                                                    onClick={() =>
                                                                                                                        setOpenRow(
                                                                                                                            openRow === idx
                                                                                                                                ? -1
                                                                                                                                : idx
                                                                                                                        )
                                                                                                                    }
                                                                                                                >
                                                                                                                    {openRow === idx ? (
                                                                                                                        <KeyboardArrowUpIcon />
                                                                                                                    ) : (
                                                                                                                        <KeyboardArrowDownIcon />
                                                                                                                    )}
                                                                                                                </IconButton>
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    select
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.paxPaggegeType`}
                                                                                                                    disabled={
                                                                                                                        mode ==
                                                                                                                        'VIEW_UPDATE'
                                                                                                                    }
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].paxPaggegeType
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .paxPaggegeType &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].paxPaggegeType
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].paxPaggegeType &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].paxPaggegeType
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ]
                                                                                                                                  .paxPaggegeType
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                >
                                                                                                                    <MenuItem
                                                                                                                        dense={true}
                                                                                                                        value={'Client'}
                                                                                                                    >
                                                                                                                        Client
                                                                                                                    </MenuItem>
                                                                                                                    <MenuItem
                                                                                                                        dense={true}
                                                                                                                        value={'Baggage'}
                                                                                                                    >
                                                                                                                        Baggage
                                                                                                                    </MenuItem>
                                                                                                                </TextField>
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.minPax`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].minPax
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .distances[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].minPax &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].minPax
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].minPax &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].minPax
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ].minPax
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>

                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.vehicleName`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].vehicleName
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].vehicleName &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].vehicleName
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].vehicleName &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].vehicleName
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ].vehicleName
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>

                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.noOfDrivers`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfDrivers
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].noOfDrivers &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].noOfDrivers
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfDrivers &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfDrivers
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ].noOfDrivers
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.maxPax`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].maxPax
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].maxPax &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].maxPax
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].maxPax &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].maxPax
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ].maxPax
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.defaultGuide`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].defaultGuide
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .defaultGuide &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].defaultGuide
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].defaultGuide &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].defaultGuide
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ].defaultGuide
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <TextField
                                                                                                                    // label="taxOrder"
                                                                                                                    sx={{
                                                                                                                        width: { sm: 200 },
                                                                                                                        '& .MuiInputBase-root':
                                                                                                                            {
                                                                                                                                height: 40
                                                                                                                            }
                                                                                                                    }}
                                                                                                                    type="text"
                                                                                                                    variant="outlined"
                                                                                                                    name={`paxBaggages.${idx}.noOfAssistant`}
                                                                                                                    value={
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        values.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfAssistant
                                                                                                                    }
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    error={Boolean(
                                                                                                                        touched.paxBaggages &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .noOfAssistant &&
                                                                                                                            errors.paxBaggages &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .paxBaggages[
                                                                                                                                idx
                                                                                                                            ].noOfAssistant
                                                                                                                    )}
                                                                                                                    helperText={
                                                                                                                        touched.paxBaggages &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        touched.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfAssistant &&
                                                                                                                        errors.paxBaggages &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ] &&
                                                                                                                        errors.paxBaggages[
                                                                                                                            idx
                                                                                                                        ].noOfAssistant
                                                                                                                            ? errors
                                                                                                                                  .paxBaggages[
                                                                                                                                  idx
                                                                                                                              ]
                                                                                                                                  .noOfAssistant
                                                                                                                            : ''
                                                                                                                    }
                                                                                                                />
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                <FormGroup>
                                                                                                                    <FormControlLabel
                                                                                                                        control={
                                                                                                                            <Checkbox
                                                                                                                                name={`distances.${idx}.status`}
                                                                                                                                onChange={
                                                                                                                                    handleChange
                                                                                                                                }
                                                                                                                                checked={
                                                                                                                                    values
                                                                                                                                        .paxBaggages[
                                                                                                                                        idx
                                                                                                                                    ].status
                                                                                                                                }
                                                                                                                                value={
                                                                                                                                    values
                                                                                                                                        .paxBaggages[
                                                                                                                                        idx
                                                                                                                                    ] &&
                                                                                                                                    values
                                                                                                                                        .paxBaggages[
                                                                                                                                        idx
                                                                                                                                    ].status
                                                                                                                                }
                                                                                                                            />
                                                                                                                        }
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
                                                                                                        <TableRow>
                                                                                                            <TableCell
                                                                                                                colSpan={5}
                                                                                                                sx={{
                                                                                                                    paddingBottom: 0,
                                                                                                                    paddingTop: 0,
                                                                                                                    border: '0px'
                                                                                                                }}
                                                                                                            >
                                                                                                                <Collapse
                                                                                                                    in={openRow === idx}
                                                                                                                    timeout="auto"
                                                                                                                    unmountOnExit
                                                                                                                >
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                <LocalizationProvider
                                                                                                                                    dateAdapter={
                                                                                                                                        AdapterDayjs
                                                                                                                                    }
                                                                                                                                    // adapterLocale={locale}
                                                                                                                                >
                                                                                                                                    <DatePicker
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW_UPDATE'
                                                                                                                                        }
                                                                                                                                        onChange={(
                                                                                                                                            value
                                                                                                                                        ) => {
                                                                                                                                            console.log(
                                                                                                                                                value
                                                                                                                                            );
                                                                                                                                            console.log(
                                                                                                                                                ref.current
                                                                                                                                            );
                                                                                                                                            setFieldValue(
                                                                                                                                                `distances.${idx}.fromDate`,
                                                                                                                                                value
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                                                        value={
                                                                                                                                            values
                                                                                                                                                .distances[
                                                                                                                                                idx
                                                                                                                                            ] &&
                                                                                                                                            values
                                                                                                                                                .distances[
                                                                                                                                                idx
                                                                                                                                            ]
                                                                                                                                                .fromDate
                                                                                                                                        }
                                                                                                                                        renderInput={(
                                                                                                                                            params
                                                                                                                                        ) => (
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
                                                                                                                                                name={`distances.${idx}.fromDate`}
                                                                                                                                                onBlur={
                                                                                                                                                    handleBlur
                                                                                                                                                }
                                                                                                                                                error={Boolean(
                                                                                                                                                    touched.distances &&
                                                                                                                                                        touched
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ] &&
                                                                                                                                                        touched
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ]
                                                                                                                                                            .fromDate &&
                                                                                                                                                        errors.distances &&
                                                                                                                                                        errors
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ] &&
                                                                                                                                                        errors
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ]
                                                                                                                                                            .fromDate
                                                                                                                                                )}
                                                                                                                                                helperText={
                                                                                                                                                    touched.distances &&
                                                                                                                                                    touched
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ] &&
                                                                                                                                                    touched
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ]
                                                                                                                                                        .fromDate &&
                                                                                                                                                    errors.distances &&
                                                                                                                                                    errors
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ] &&
                                                                                                                                                    errors
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ]
                                                                                                                                                        .fromDate
                                                                                                                                                        ? errors
                                                                                                                                                              .distances[
                                                                                                                                                              idx
                                                                                                                                                          ]
                                                                                                                                                              .fromDate
                                                                                                                                                        : ''
                                                                                                                                                }
                                                                                                                                            />
                                                                                                                                        )}
                                                                                                                                    />
                                                                                                                                </LocalizationProvider>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <LocalizationProvider
                                                                                                                                    dateAdapter={
                                                                                                                                        AdapterDayjs
                                                                                                                                    }
                                                                                                                                    // adapterLocale={locale}
                                                                                                                                >
                                                                                                                                    <DatePicker
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW_UPDATE'
                                                                                                                                        }
                                                                                                                                        onChange={(
                                                                                                                                            value
                                                                                                                                        ) => {
                                                                                                                                            console.log(
                                                                                                                                                value
                                                                                                                                            );
                                                                                                                                            console.log(
                                                                                                                                                ref.current
                                                                                                                                            );
                                                                                                                                            setFieldValue(
                                                                                                                                                `distances.${idx}.fromDate`,
                                                                                                                                                value
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                                                        value={
                                                                                                                                            values
                                                                                                                                                .distances[
                                                                                                                                                idx
                                                                                                                                            ] &&
                                                                                                                                            values
                                                                                                                                                .distances[
                                                                                                                                                idx
                                                                                                                                            ]
                                                                                                                                                .fromDate
                                                                                                                                        }
                                                                                                                                        renderInput={(
                                                                                                                                            params
                                                                                                                                        ) => (
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
                                                                                                                                                name={`distances.${idx}.fromDate`}
                                                                                                                                                onBlur={
                                                                                                                                                    handleBlur
                                                                                                                                                }
                                                                                                                                                error={Boolean(
                                                                                                                                                    touched.distances &&
                                                                                                                                                        touched
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ] &&
                                                                                                                                                        touched
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ]
                                                                                                                                                            .fromDate &&
                                                                                                                                                        errors.distances &&
                                                                                                                                                        errors
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ] &&
                                                                                                                                                        errors
                                                                                                                                                            .distances[
                                                                                                                                                            idx
                                                                                                                                                        ]
                                                                                                                                                            .fromDate
                                                                                                                                                )}
                                                                                                                                                helperText={
                                                                                                                                                    touched.distances &&
                                                                                                                                                    touched
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ] &&
                                                                                                                                                    touched
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ]
                                                                                                                                                        .fromDate &&
                                                                                                                                                    errors.distances &&
                                                                                                                                                    errors
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ] &&
                                                                                                                                                    errors
                                                                                                                                                        .distances[
                                                                                                                                                        idx
                                                                                                                                                    ]
                                                                                                                                                        .fromDate
                                                                                                                                                        ? errors
                                                                                                                                                              .distances[
                                                                                                                                                              idx
                                                                                                                                                          ]
                                                                                                                                                              .fromDate
                                                                                                                                                        : ''
                                                                                                                                                }
                                                                                                                                            />
                                                                                                                                        )}
                                                                                                                                    />
                                                                                                                                </LocalizationProvider>
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                    <Grid
                                                                                                                        display="flex"
                                                                                                                        style={{
                                                                                                                            marginBottom:
                                                                                                                                '10px',
                                                                                                                            marginTop:
                                                                                                                                '10px'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Grid item>
                                                                                                                            <Typography variant="h5">
                                                                                                                                Per Km Rate
                                                                                                                            </Typography>
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                {' '}
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <FormGroup>
                                                                                                                                    <FormControlLabel
                                                                                                                                        name="status"
                                                                                                                                        // onChange={handleInputChange}
                                                                                                                                        value={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        control={
                                                                                                                                            <Switch color="success" />
                                                                                                                                        }
                                                                                                                                        label="Status"
                                                                                                                                        checked={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW'
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </FormGroup>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                    <Grid
                                                                                                                        display="flex"
                                                                                                                        style={{
                                                                                                                            marginBottom:
                                                                                                                                '10px',
                                                                                                                            marginTop:
                                                                                                                                '10px'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Grid item>
                                                                                                                            <Typography variant="h5">
                                                                                                                                Driver Rate
                                                                                                                            </Typography>
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                {' '}
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <FormGroup>
                                                                                                                                    <FormControlLabel
                                                                                                                                        name="status"
                                                                                                                                        // onChange={handleInputChange}
                                                                                                                                        value={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        control={
                                                                                                                                            <Switch color="success" />
                                                                                                                                        }
                                                                                                                                        label="Status"
                                                                                                                                        checked={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW'
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </FormGroup>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <FormGroup>
                                                                                                                                    <FormControlLabel
                                                                                                                                        name="status"
                                                                                                                                        // onChange={handleInputChange}
                                                                                                                                        value={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        control={
                                                                                                                                            <Switch color="success" />
                                                                                                                                        }
                                                                                                                                        label="Status"
                                                                                                                                        checked={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW'
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </FormGroup>
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <FormGroup>
                                                                                                                                    <FormControlLabel
                                                                                                                                        name="status"
                                                                                                                                        // onChange={handleInputChange}
                                                                                                                                        value={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        control={
                                                                                                                                            <Switch color="success" />
                                                                                                                                        }
                                                                                                                                        label="Status"
                                                                                                                                        checked={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW'
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </FormGroup>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                    <Grid
                                                                                                                        display="flex"
                                                                                                                        style={{
                                                                                                                            marginBottom:
                                                                                                                                '10px',
                                                                                                                            marginTop:
                                                                                                                                '10px'
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        <Grid item>
                                                                                                                            <Typography variant="h5">
                                                                                                                                Assistant
                                                                                                                                Rate
                                                                                                                            </Typography>
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                {' '}
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <FormGroup>
                                                                                                                                    <FormControlLabel
                                                                                                                                        name="status"
                                                                                                                                        // onChange={handleInputChange}
                                                                                                                                        value={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        control={
                                                                                                                                            <Switch color="success" />
                                                                                                                                        }
                                                                                                                                        label="Status"
                                                                                                                                        checked={
                                                                                                                                            values.status
                                                                                                                                        }
                                                                                                                                        disabled={
                                                                                                                                            mode ==
                                                                                                                                            'VIEW'
                                                                                                                                        }
                                                                                                                                    />
                                                                                                                                </FormGroup>
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                    <Box
                                                                                                                        sx={{
                                                                                                                            width: '100%',
                                                                                                                            // backgroundColor:
                                                                                                                            //     'rgba(50,50,50,0.4)',
                                                                                                                            minHeight: 36,
                                                                                                                            textAlign:
                                                                                                                                'center',
                                                                                                                            alignItems:
                                                                                                                                'center',
                                                                                                                            fontSize: 18,
                                                                                                                            marginLeft: 10,
                                                                                                                            marginTop: 1,
                                                                                                                            marginBottom: 1
                                                                                                                        }}
                                                                                                                    >
                                                                                                                        {/* It's me! Index:{' '}
                                                                                                                        {idx}. */}
                                                                                                                        <Grid
                                                                                                                            gap="10px"
                                                                                                                            display="flex"
                                                                                                                        >
                                                                                                                            <Grid item>
                                                                                                                                {' '}
                                                                                                                                <TextField
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    id="standard-select-currency"
                                                                                                                                    select
                                                                                                                                    label="Direction"
                                                                                                                                    name="direction"
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values.taxGroupType
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                            errors.taxGroupType
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupType &&
                                                                                                                                        errors.taxGroupType
                                                                                                                                            ? errors.taxGroupType
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                >
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'One Way'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        One
                                                                                                                                        Way
                                                                                                                                    </MenuItem>
                                                                                                                                    <MenuItem
                                                                                                                                        dense={
                                                                                                                                            true
                                                                                                                                        }
                                                                                                                                        value={
                                                                                                                                            'Return'
                                                                                                                                        }
                                                                                                                                    >
                                                                                                                                        Return
                                                                                                                                    </MenuItem>
                                                                                                                                </TextField>
                                                                                                                            </Grid>
                                                                                                                            <Grid item>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                            <Grid>
                                                                                                                                <TextField
                                                                                                                                    label="Max Pax"
                                                                                                                                    sx={{
                                                                                                                                        width: {
                                                                                                                                            sm: 200,
                                                                                                                                            md: 300
                                                                                                                                        },
                                                                                                                                        '& .MuiInputBase-root':
                                                                                                                                            {
                                                                                                                                                height: 40
                                                                                                                                            }
                                                                                                                                    }}
                                                                                                                                    disabled={
                                                                                                                                        mode ==
                                                                                                                                        'VIEW_UPDATE'
                                                                                                                                    }
                                                                                                                                    type="text"
                                                                                                                                    variant="outlined"
                                                                                                                                    name="maxPax"
                                                                                                                                    value={
                                                                                                                                        values.taxGroupCode
                                                                                                                                    }
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    onBlur={
                                                                                                                                        handleBlur
                                                                                                                                    }
                                                                                                                                    error={Boolean(
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                            errors.taxGroupCode
                                                                                                                                    )}
                                                                                                                                    helperText={
                                                                                                                                        touched.taxGroupCode &&
                                                                                                                                        errors.taxGroupCode
                                                                                                                                            ? errors.taxGroupCode
                                                                                                                                            : ''
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            </Grid>
                                                                                                                        </Grid>
                                                                                                                    </Box>
                                                                                                                </Collapse>
                                                                                                            </TableCell>
                                                                                                        </TableRow>
                                                                                                    </>
                                                                                                );
                                                                                            })}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </TableContainer>
                                                                            </Paper>
                                                                        )}
                                                                    </FieldArray>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid display="flex" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                                                <Grid item>
                                                                    <Typography variant="h4">Location Wise Expenses</Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid
                                                                display={enableblock1 ? 'flex' : 'none'}
                                                                gap="10px"
                                                                style={{ marginBottom: '10px', marginTop: '10px' }}
                                                            >
                                                                <Grid item>
                                                                    <FieldArray name="locationWiseExpenses">
                                                                        {({ insert, remove, push }) => (
                                                                            <Paper>
                                                                                {mode != 'VIEW' ? (
                                                                                    <Box display="flex" flexDirection="row-reverse">
                                                                                        <IconButton
                                                                                            aria-label="delete"
                                                                                            onClick={() => {
                                                                                                push({
                                                                                                    location: '',
                                                                                                    locationDescription: '',
                                                                                                    expenseCode: '',
                                                                                                    expenseDescription: '',
                                                                                                    status: ''
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
                                                                                                <TableCell>Location</TableCell>
                                                                                                <TableCell>Location Description</TableCell>
                                                                                                <TableCell>Expense Code</TableCell>
                                                                                                <TableCell>Expense Description</TableCell>
                                                                                                <TableCell>Status</TableCell>
                                                                                                <TableCell>Action</TableCell>
                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            {values.locationWiseExpenses.map(
                                                                                                (record, idx) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <TableRow key={idx} hover>
                                                                                                                <TableCell>
                                                                                                                    <TextField
                                                                                                                        // label="taxOrder"
                                                                                                                        sx={{
                                                                                                                            width: {
                                                                                                                                sm: 200
                                                                                                                            },
                                                                                                                            '& .MuiInputBase-root':
                                                                                                                                {
                                                                                                                                    height: 40
                                                                                                                                }
                                                                                                                        }}
                                                                                                                        type="text"
                                                                                                                        variant="outlined"
                                                                                                                        name={`locationWiseExpenses.${idx}.location`}
                                                                                                                        disabled={
                                                                                                                            mode ==
                                                                                                                            'VIEW_UPDATE'
                                                                                                                        }
                                                                                                                        value={
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].location
                                                                                                                        }
                                                                                                                        onChange={
                                                                                                                            handleChange
                                                                                                                        }
                                                                                                                        onBlur={handleBlur}
                                                                                                                        error={Boolean(
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .location &&
                                                                                                                                errors.locationWiseExpenses &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ].location
                                                                                                                        )}
                                                                                                                        helperText={
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].location &&
                                                                                                                            errors.locationWiseExpenses &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].location
                                                                                                                                ? errors
                                                                                                                                      .locationWiseExpenses[
                                                                                                                                      idx
                                                                                                                                  ].location
                                                                                                                                : ''
                                                                                                                        }
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell>
                                                                                                                    <TextField
                                                                                                                        // label="taxOrder"
                                                                                                                        sx={{
                                                                                                                            width: {
                                                                                                                                sm: 200
                                                                                                                            },
                                                                                                                            '& .MuiInputBase-root':
                                                                                                                                {
                                                                                                                                    height: 40
                                                                                                                                }
                                                                                                                        }}
                                                                                                                        type="text"
                                                                                                                        variant="outlined"
                                                                                                                        name={`locationWiseExpenses.${idx}.locationDescription`}
                                                                                                                        value={
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .locationDescription
                                                                                                                        }
                                                                                                                        onChange={
                                                                                                                            handleChange
                                                                                                                        }
                                                                                                                        onBlur={handleBlur}
                                                                                                                        error={Boolean(
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .locationDescription &&
                                                                                                                                errors.locationWiseExpenses &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .locationDescription
                                                                                                                        )}
                                                                                                                        helperText={
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .locationDescription &&
                                                                                                                            errors.locationWiseExpenses &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .locationDescription
                                                                                                                                ? errors
                                                                                                                                      .locationWiseExpenses[
                                                                                                                                      idx
                                                                                                                                  ]
                                                                                                                                      .locationDescription
                                                                                                                                : ''
                                                                                                                        }
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell>
                                                                                                                    <TextField
                                                                                                                        // label="taxOrder"
                                                                                                                        sx={{
                                                                                                                            width: {
                                                                                                                                sm: 200
                                                                                                                            },
                                                                                                                            '& .MuiInputBase-root':
                                                                                                                                {
                                                                                                                                    height: 40
                                                                                                                                }
                                                                                                                        }}
                                                                                                                        type="text"
                                                                                                                        variant="outlined"
                                                                                                                        name={`locationWiseExpenses.${idx}.expenseCode`}
                                                                                                                        value={
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].expenseCode
                                                                                                                        }
                                                                                                                        onChange={
                                                                                                                            handleChange
                                                                                                                        }
                                                                                                                        onBlur={handleBlur}
                                                                                                                        error={Boolean(
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .expenseCode &&
                                                                                                                                errors.locationWiseExpenses &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .expenseCode
                                                                                                                        )}
                                                                                                                        helperText={
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].expenseCode &&
                                                                                                                            errors.locationWiseExpenses &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ].expenseCode
                                                                                                                                ? errors
                                                                                                                                      .locationWiseExpenses[
                                                                                                                                      idx
                                                                                                                                  ]
                                                                                                                                      .expenseCode
                                                                                                                                : ''
                                                                                                                        }
                                                                                                                    />
                                                                                                                </TableCell>
                                                                                                                <TableCell>
                                                                                                                    <TextField
                                                                                                                        // label="taxOrder"
                                                                                                                        sx={{
                                                                                                                            width: {
                                                                                                                                sm: 200
                                                                                                                            },
                                                                                                                            '& .MuiInputBase-root':
                                                                                                                                {
                                                                                                                                    height: 40
                                                                                                                                }
                                                                                                                        }}
                                                                                                                        type="text"
                                                                                                                        variant="outlined"
                                                                                                                        name={`locationWiseExpenses.${idx}.expenseDescription`}
                                                                                                                        value={
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            values
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .expenseDescription
                                                                                                                        }
                                                                                                                        onChange={
                                                                                                                            handleChange
                                                                                                                        }
                                                                                                                        onBlur={handleBlur}
                                                                                                                        error={Boolean(
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                touched
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .expenseDescription &&
                                                                                                                                errors.locationWiseExpenses &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ] &&
                                                                                                                                errors
                                                                                                                                    .locationWiseExpenses[
                                                                                                                                    idx
                                                                                                                                ]
                                                                                                                                    .expenseDescription
                                                                                                                        )}
                                                                                                                        helperText={
                                                                                                                            touched.locationWiseExpenses &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            touched
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .expenseDescription &&
                                                                                                                            errors.locationWiseExpenses &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ] &&
                                                                                                                            errors
                                                                                                                                .locationWiseExpenses[
                                                                                                                                idx
                                                                                                                            ]
                                                                                                                                .expenseDescription
                                                                                                                                ? errors
                                                                                                                                      .locationWiseExpenses[
                                                                                                                                      idx
                                                                                                                                  ]
                                                                                                                                      .expenseDescription
                                                                                                                                : ''
                                                                                                                        }
                                                                                                                    />
                                                                                                                </TableCell>

                                                                                                                <TableCell>
                                                                                                                    <FormGroup>
                                                                                                                        <FormControlLabel
                                                                                                                            control={
                                                                                                                                <Checkbox
                                                                                                                                    name={`locationWiseExpenses.${idx}.status`}
                                                                                                                                    onChange={
                                                                                                                                        handleChange
                                                                                                                                    }
                                                                                                                                    checked={
                                                                                                                                        values
                                                                                                                                            .locationWiseExpenses[
                                                                                                                                            idx
                                                                                                                                        ]
                                                                                                                                            .status
                                                                                                                                    }
                                                                                                                                    value={
                                                                                                                                        values
                                                                                                                                            .locationWiseExpenses[
                                                                                                                                            idx
                                                                                                                                        ] &&
                                                                                                                                        values
                                                                                                                                            .locationWiseExpenses[
                                                                                                                                            idx
                                                                                                                                        ]
                                                                                                                                            .status
                                                                                                                                    }
                                                                                                                                />
                                                                                                                            }
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
                                                                                                        </>
                                                                                                    );
                                                                                                }
                                                                                            )}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </TableContainer>
                                                                            </Paper>
                                                                        )}
                                                                    </FieldArray>
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </>
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

export default TransportRates;
