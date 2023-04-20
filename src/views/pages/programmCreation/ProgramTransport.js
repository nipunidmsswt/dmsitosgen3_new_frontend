import { useEffect, forwardRef, useState } from 'react';

import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Button,
    Grid,
    Switch
} from '@mui/material';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { common } from '@material-ui/core/colors';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import 'assets/scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ProgramTransport({ open, handleClose, mode }) {
    const initialValues = {
        paxBaggage: '',
        transportType: null,
        chargeMethod: '',
        vehicleType: null,
        vehicleCategory: null,
        location1: null,
        location2: null,
        location3: null,
        location4: null,
        location5: null,
        location6: null,
        location7: null,
        location8: null,
        location9: null,
        location10: null,
        kms: 0,
        hours: 0
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [loadValues, setLoadValues] = useState(null);
    const [activeTransportTypeList, setActiveTransportTypeList] = useState([]);
    const [activeVehicleTypeList, setActiveVehicleTypeList] = useState([]);
    const [activeVehicleCategoryList, setActiveVehicleCategoryList] = useState([]);
    const [activeLocationList, setActiveLocationList] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [location1, setLocation1] = useState({});
    const [location2, setLocation2] = useState({});
    const [location3, setLocation3] = useState({});
    const [location4, setLocation4] = useState({});
    const [location5, setLocation5] = useState({});
    const [location6, setLocation6] = useState({});
    const [location7, setLocation7] = useState({});
    const [location8, setLocation8] = useState({});
    const [location9, setLocation9] = useState({});
    const [location10, setLocation10] = useState({});

    // const [location2Check, setLocation2Check] = useState(true);
    const dispatch = useDispatch();

    //data from reducers
    const activeTransportTypeListData = useSelector((state) => state.mainTransportCategoryReducer.activeCategoryDetails);
    const activeVehicleTypeListData = useSelector((state) => state.mainTransportCategoryReducer.vehicleTypes);
    const activeVehicleCategoriesListData = useSelector((state) => state.mainTransportCategoryReducer.vehicleCategories);
    const activeLocationListData = useSelector((state) => state.locationReducer.activeLocations);

    const validationSchema = yup.object().shape({
        paxBaggage: yup.string().required('Required field'),
        transportType: yup.object().nullable().required('Required field'),
        chargeMethod: yup.string().required('Required field'),
        vehicleType: yup.object().nullable().required('Required field'),
        vehicleCategory: yup.object().nullable().required('Required field'),
        location1: yup.object().nullable().required('Required field'),
        location2: yup.object().nullable().required('Required field')
    });

    const handleSubmitForm = (data) => {
        handleClose();
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [name]: checked }));
    };

    const handleLocation1 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation1(value);
        }
    };

    const handleLocation2 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation2(value);
        }
    };

    const handleLocation3 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation3(value);
        }
    };

    const handleLocation4 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation4(value);
        }
    };

    const handleLocation5 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation5(value);
        }
    };

    const handleLocation6 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation6(value);
        }
    };

    const handleLocation7 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation7(value);
        }
    };

    const handleLocation8 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation8(value);
        }
    };

    const handleLocation9 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation9(value);
        }
    };

    const handleLocation10 = (value) => {
        if (value === null) {
            console.log('Empty location');
        } else {
            setLocation10(value);
        }
    };

    useEffect(() => {
        console.log(location1.shortDescription);
        console.log(location2.shortDescription);
        console.log(location3.shortDescription);
        console.log(location4.shortDescription);
        console.log(location5.shortDescription);
        console.log(location6.shortDescription);
        console.log(location7.shortDescription);
        console.log(location8.shortDescription);
        console.log(location9.shortDescription);
        console.log(location10.shortDescription);
    }, [location1, location2, location3, location4, location5, location6, location7, location8, location9, location10]);

    useEffect(() => {
        if (activeTransportTypeListData.length != 0) {
            setActiveTransportTypeList(activeTransportTypeListData);
        }
    }, [activeTransportTypeListData]);

    useEffect(() => {
        if (activeVehicleTypeListData.length != 0) {
            setActiveVehicleTypeList(activeVehicleTypeListData);
        }
    }, [activeVehicleTypeListData]);

    useEffect(() => {
        if (activeVehicleCategoriesListData.length != 0) {
            setActiveVehicleCategoryList(activeVehicleCategoriesListData);
        }
    }, [activeVehicleCategoriesListData]);

    useEffect(() => {
        if (activeLocationListData.length != 0) {
            setActiveLocationList(activeLocationListData);
        }
    }, [activeLocationListData]);

    console.log('Transport Popup');
    // useEffect(() => {
    //     dispatch(getAllActiveTransportMainCategoryDataByType('Transport Type'));
    //     dispatch(getAllActiveVehicleTypeDataByType('Vehicle Type'));
    //     dispatch(getAllActiveVehicleCategoryDataByType('Vehicle Category'));
    // }, []);

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: { borderRadius: 15, maxWidth: '120%', height: '80%' }
                }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} Transport
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={loadValues || initialValues}
                            onSubmit={(values) => {
                                console.log(values);
                                handleSubmitForm(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                return (
                                    <Form>
                                        <div style={{ marginTop: '6px', margin: '10px' }}>
                                            <Grid gap="30px" display="flex">
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 180 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="paxBaggage"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Pag/Baggage"
                                                        name="paxBaggage"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.paxBaggage}
                                                        error={Boolean(touched.paxBaggage && errors.paxBaggage)}
                                                        helperText={touched.paxBaggage && errors.paxBaggage ? errors.paxBaggage : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Pax'}>
                                                            Pax
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Baggage'}>
                                                            Baggage
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.transportType}
                                                        name="transportType"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`transportType`, value);
                                                        }}
                                                        fullWidth
                                                        options={activeTransportTypeList}
                                                        getOptionLabel={(option) => `${option.description}`}
                                                        isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Transport Type"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                fullWidth
                                                                sx={{
                                                                    width: { sm: 75, md: 180 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                // disabled={mode == 'VIEW'}
                                                                variant="outlined"
                                                                name="transportType"
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.transportType && errors.transportType)}
                                                                helperText={
                                                                    touched.transportType && errors.transportType
                                                                        ? errors.transportType
                                                                        : ''
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 180 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="chargeMethod"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Charge Method"
                                                        name="chargeMethod"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.chargeMethod}
                                                        error={Boolean(touched.chargeMethod && errors.chargeMethod)}
                                                        helperText={touched.chargeMethod && errors.chargeMethod ? errors.chargeMethod : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Distance'}>
                                                            Distance
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Hours'}>
                                                            Hours
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.vehicleType}
                                                        name="vehicleType"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`vehicleType`, value);
                                                        }}
                                                        fullWidth
                                                        options={activeVehicleTypeList}
                                                        getOptionLabel={(option) => `${option.description}`}
                                                        isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Vehicle Type"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                fullWidth
                                                                sx={{
                                                                    width: { sm: 75, md: 180 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                // disabled={mode == 'VIEW'}
                                                                variant="outlined"
                                                                name="vehicleType"
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.vehicleType && errors.vehicleType)}
                                                                helperText={
                                                                    touched.vehicleType && errors.vehicleType ? errors.vehicleType : ''
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.vehicleCategory}
                                                        name="vehicleCategory"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`vehicleCategory`, value);
                                                        }}
                                                        fullWidth
                                                        options={activeVehicleCategoryList}
                                                        getOptionLabel={(option) => `${option.description}`}
                                                        isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Vehicle Category"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                fullWidth
                                                                sx={{
                                                                    width: { sm: 75, md: 180 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                // disabled={mode == 'VIEW'}
                                                                variant="outlined"
                                                                name="vehicleCategory"
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.vehicleCategory && errors.vehicleCategory)}
                                                                helperText={
                                                                    touched.vehicleCategory && errors.vehicleCategory
                                                                        ? errors.vehicleCategory
                                                                        : ''
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid gap="5px" display="flex" style={{ marginTop: '50px' }}>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location1}
                                                        name="location1"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location1`, value);
                                                            handleLocation1(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 01"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location1 && errors.location1)}
                                                                helperText={touched.location1 && errors.location1 ? errors.location1 : ''}
                                                                variant="outlined"
                                                                name="location1"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox1 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox1"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location2}
                                                        name="location2"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location2`, value);
                                                            handleLocation2(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location1 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 02"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                // InputProps={{
                                                                //     readOnly: location2Check
                                                                // }}
                                                                error={Boolean(touched.location2 && errors.location2)}
                                                                helperText={touched.location2 && errors.location2 ? errors.location2 : ''}
                                                                variant="outlined"
                                                                name="location2"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox2 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox2"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location3}
                                                        name="location3"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location3`, value);
                                                            handleLocation3(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location2 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 03"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location3 && errors.location3)}
                                                                helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                                variant="outlined"
                                                                name="location3"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox3 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox3"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location4}
                                                        name="location4"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location4`, value);
                                                            handleLocation4(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location3 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code} - ${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 04"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location4 && errors.location4)}
                                                                helperText={touched.location4 && errors.location4 ? errors.location4 : ''}
                                                                variant="outlined"
                                                                name="location4"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox4 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox4"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location5}
                                                        name="location5"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location5`, value);
                                                            handleLocation5(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location4 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 05"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location5 && errors.location5)}
                                                                helperText={touched.location5 && errors.location5 ? errors.location5 : ''}
                                                                variant="outlined"
                                                                name="location5"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox5 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox5"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid gap="5px" display="flex" style={{ marginTop: '50px' }}>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location6}
                                                        name="location6"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location6`, value);
                                                            handleLocation6(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location5 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 06"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location6 && errors.location6)}
                                                                helperText={touched.location6 && errors.location6 ? errors.location6 : ''}
                                                                variant="outlined"
                                                                name="location6"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox6 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox6"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location7}
                                                        name="location7"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location7`, value);
                                                            handleLocation7(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location6 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 07"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location7 && errors.location7)}
                                                                helperText={touched.location7 && errors.location7 ? errors.location7 : ''}
                                                                variant="outlined"
                                                                name="location7"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox7 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox7"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location8}
                                                        name="location8"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location8`, value);
                                                            handleLocation8(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location7 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 08"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location8 && errors.location8)}
                                                                helperText={touched.location8 && errors.location8 ? errors.location8 : ''}
                                                                variant="outlined"
                                                                name="location8"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox8 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox8"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location9}
                                                        name="location9"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location9`, value);
                                                            handleLocation9(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location8 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code} - ${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 09"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location9 && errors.location9)}
                                                                helperText={touched.location9 && errors.location9 ? errors.location9 : ''}
                                                                variant="outlined"
                                                                name="location9"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox9 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox9"
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '8px' }}>
                                                    <Autocomplete
                                                        value={values.location10}
                                                        name="location10"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location10`, value);
                                                            handleLocation10(value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={!values.location9 ? [] : activeLocationList}
                                                        getOptionLabel={(option) => `${option.code}-${option.shortDescription}`}
                                                        isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 10"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 150 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location10 && errors.location10)}
                                                                helperText={
                                                                    touched.location10 && errors.location10 ? errors.location10 : ''
                                                                }
                                                                variant="outlined"
                                                                name="location10"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Checkbox
                                                        checked={checkedItems.checkbox10 || false} // set to true for a checked checkbox
                                                        icon={<CheckBoxOutlineBlankIcon style={{ color: common.black }} />} // customize the icon with the desired color
                                                        checkedIcon={<CheckBoxIcon style={{ color: green[500] }} />} // customize the checked icon with the desired color
                                                        onChange={handleCheckboxChange}
                                                        name="checkbox10"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid gap="60px" display="flex" style={{ marginTop: '50px' }}>
                                                <Grid item>
                                                    <TextField
                                                        label="Distance (km)"
                                                        sx={{
                                                            alignItems: 'center',
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        // error={Boolean(touched.location3 && errors.location3)}
                                                        // helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                        variant="outlined"
                                                        name="distance"
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid>
                                                    <TextField
                                                        label="Duration (hr)"
                                                        sx={{
                                                            alignItems: 'center',
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        // error={Boolean(touched.location3 && errors.location3)}
                                                        // helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                        variant="outlined"
                                                        name="hours"
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '60px' }}>
                                            <Button className="btnSave" variant="contained" type="submit">
                                                {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                type="button"
                                                style={{
                                                    // backgroundColor: '#B22222',
                                                    marginRight: '10px'
                                                }}
                                                onClick={(e) => resetForm()}
                                            >
                                                CLEAR
                                            </Button>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProgramTransport;
