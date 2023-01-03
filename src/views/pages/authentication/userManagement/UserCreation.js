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
    Checkbox,
    Button,
    Typography,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Autocomplete,
    Switch
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';

import provinceDistricts from 'srilankan-provinces-districts';
import { getAllLocationDetails, getLocationDataById } from 'store/actions/masterActions/LocationAction';
import { Close } from '@mui/icons-material';

import { getUserDataById, saveUserData, updateUserData } from 'store/actions/authenticationActions/UserAction';
import CreatedUpdatedUserDetailsWithTableFormat from 'views/pages/master/userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';
import { getAllClusterData } from 'store/actions/masterActions/CodeAndNameAction';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function User({ open, handleClose, mode, userCode }) {
    const initialValues = {
        company: null,
        title: '',
        firstName: '',
        middleName: '',
        status: true,
        lastName: '',
        nic: '',
        email: '',
        mobileNo: '',
        designation: null,
        department: null,
        cluster: null,
        market: null,
        userRole: null,
        userName: '',
        password: ''
        // files: undefined,
        // previewImages: [],
        // progressInfos: [],
        // message: []
    };

    const [provinceList, setProvnceList] = useState([]);
    const [districtList, setDistricList] = useState([]);
    const [loadValues, setLoadValues] = useState('');
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [previewImages, setPreviewImages] = useState([]);
    const [updatePreviewImages, setupdatePreviewImages] = useState([]);
    const ref = useRef(null);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);

    // yup.addMethod(yup.string, 'checkDuplicateLocationCode', function (message) {
    //     return this.test('checkDuplicateLocationCode', 'Duplicate Tax group', async function validateValue(value) {
    //         if (mode === 'INSERT') {
    //             try {
    //                 // dispatch(checkDuplicateTaxGroupCode(value));

    //                 if (duplicateLoction != null && duplicateLoction.errorMessages.length != 0) {
    //                     return false;
    //                 } else {
    //                     return true;
    //                 }
    //                 return false; // or true as you see fit
    //             } catch (error) {}
    //         }
    //         return true;
    //     });
    // });
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        // company: yup.string().required('Required field'),
        company: yup.object().typeError('Required field'),
        title: yup.string().required('Required field'),
        firstName: yup.string().required('Required field'),
        // status: true,
        lastName: yup.string().required('Required field'),
        nic: yup.string().required('Required field'),
        email: yup.string().email().required('Required field'),
        mobileNo: yup
            .string()
            .required('Required field')
            .matches(phoneRegExp, 'Not valid')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be 10 digits'),
        designation: yup.object().typeError('Required field'),
        department: yup.object().typeError('Required field'),
        cluster: yup.object().typeError('Required field'),
        market: yup.object().typeError('Required field'),
        userRole: yup.object().typeError('Required field'),
        userName: yup.string().required('Requied field'),
        password: yup.string().required('Requied field')
    });

    //get data from reducers
    const duplicateUser = useSelector((state) => state.userReducer.duplicateUser);
    const userToUpdate = useSelector((state) => state.userReducer.userToUpdate);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const clusterListData = useSelector((state) => state.codeAndNameReducer.cluterTypesDetails);
    const [clusterListOptions, setClusterListOptions] = useState([]);
    const [titleListOptions, setTitleListOptions] = useState([]);
    const dispatch = useDispatch();
    const [inputMarketValue, setMarketInputValue] = useState(initialValues.market);
    const titleItems = [
        {
            id: 1,
            title: 'Mr.'
        },
        {
            id: 2,
            title: 'Mrs.'
        },
        {
            id: 3,
            title: 'Miss.'
        },
        {
            id: 4,
            title: 'Ms.'
        },
        {
            id: 5,
            title: 'Prof.'
        },
        {
            id: 6,
            title: 'Dr.'
        },
        {
            id: 7,
            title: 'Ven.'
        }
    ];
    useEffect(() => {
        if (clusterListData != null) {
            setClusterListOptions(clusterListData);
        }
    }, [clusterListData]);

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            console.log(userCode);
            setDisableDistrict(false);
            dispatch(getUserDataById(userCode));

            // setTitleListOptions(ti)
        }
    }, [mode]);

    useEffect(() => {
        setMarketListOptions(marketListData);
    }, [marketListData]);

    // useEffect(() => {
    //     console.log(userToUpdate);

    //     if (
    //         (mode === 'VIEW_UPDATE' && userToUpdate?.LocationDetails != null) ||
    //         (mode === 'VIEW' && locationToUpdate?.LocationDetails != null)
    //     ) {
    //         console.log(locationToUpdate.LocationDetails);

    //         if (locationToUpdate?.LocationDetails.province) {
    //             handleDistricts(locationToUpdate?.LocationDetails.province);
    //         }
    //         setLoadValues(locationToUpdate?.LocationDetails);
    //         // images.push(URL.createObjectURL(event.target.files[i]));
    //         let images = [];

    //         setupdatePreviewImages(locationToUpdate?.LocationDetails.docPath);
    //     }
    // }, [locationToUpdate]);
    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(saveUserData(data));
        } else if (mode === 'VIEW_UPDATE') {
            // console.log("yes click");
            dispatch(updateUserData(data));
        }
        handleClose();
    };

    useEffect(() => {
        dispatch(getAllActiveMarketData());
        dispatch(getAllClusterData());
        setTitleListOptions(titleItems);
        // console.log('provinces');
        // let provinces = provinceDistricts.getProvinces();

        // let provinceArray = [];
        // for (let province in provinces) {
        //     provinceArray.push({ name: provinces[province] });
        // }
        // console.log(provinceArray);
        // setProvnceList(provinceArray);
        // console.log(provinces);
    }, []);

    // const handleDistricts = (data) => {
    //     let districts = provinceDistricts.getDistricts(data);
    //     console.log(districts);

    //     let districtArray = [];
    //     for (let i in districts) {
    //         districtArray.push({ name: districts[i] });
    //     }

    //     setDistricList(districtArray);
    // };
    // const showImages = (event) => {
    //     let images = [];
    //     console.log(event);
    //     for (let i = 0; i < event.target.files.length; i++) {
    //         // console.log(event.target.files[i])
    //         images.push(URL.createObjectURL(event.target.files[i]));
    //     }

    //     setPreviewImages(images);
    // };

    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" alignItems="center" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            User Creation
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
                                                                <Grid display="flex" gap="10px" style={{ marginTop: '20px' }}>
                                                                    <Grid item sm={4}>
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
                                                                    <Grid item sm={4}>
                                                                        {/* <Typography variant="" component="p">
                                                                            5 Licenses Used Out Of 10
                                                                        </Typography> */}
                                                                    </Grid>
                                                                    <Grid item sm={4}>
                                                                        <Typography variant="" component="p">
                                                                            5 Licenses Used Out Of 10
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    {/* <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            disabled
                                                                            label="System Generated User ID"
                                                                            name="generatedCode"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.generatedCode}
                                                                            // error={Boolean(touched.code && errors.code)}
                                                                            // helperText={touched.code && errors.code ? errors.code : ''}
                                                                        ></TextField>
                                                                    </Grid> */}
                                                                    <Grid item>
                                                                        <Autocomplete
                                                                            // multiple={true}
                                                                            // value={values.company}
                                                                            name="company"
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}
                                                                            // options={taxListOptions}
                                                                            // getOptionLabel={(option) =>
                                                                            //     `${option.taxCode} - (${option.taxDescription})`
                                                                            // }
                                                                            // isOptionEqualToValue={(
                                                                            //     option,
                                                                            //     value
                                                                            // ) => option.taxId === value.taxId}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Company"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    name="company"
                                                                                    onBlur={handleBlur}
                                                                                    error={Boolean(touched.company && errors.company)}
                                                                                    helperText={
                                                                                        touched.company && errors.company
                                                                                            ? errors.company
                                                                                            : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />

                                                                        {/* <TextField
                                                                            label="Location Name"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="name"
                                                                            // value={values.name}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // error={Boolean(touched.name && errors.name)}
                                                                            // helperText={touched.name && errors.name ? errors.name : ''}
                                                                        /> */}
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Autocomplete
                                                                            // value={
                                                                            //     values.taxGroupDetails[idx]
                                                                            //         ? values.taxGroupDetails[
                                                                            //               idx
                                                                            //           ].tax
                                                                            //         : null
                                                                            // }
                                                                            // name={`taxGroupDetails.${idx}.tax`}
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}
                                                                            options={titleListOptions}
                                                                            getOptionLabel={(option) => `${option.title}`}
                                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Title"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    name="title"
                                                                                    onBlur={handleBlur}
                                                                                    error={Boolean(touched.title && errors.title)}
                                                                                    helperText={
                                                                                        touched.title && errors.title ? errors.title : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />

                                                                        {/* <TextField
                                                                            label="Location Name"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="name"
                                                                            // value={values.name}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // error={Boolean(touched.name && errors.name)}
                                                                            // helperText={touched.name && errors.name ? errors.name : ''}
                                                                        /> */}
                                                                    </Grid>
                                                                    {/* <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="First Name"
                                                                            name="shortDescription"
                                                                            onChange={handleChange}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // onBlur={handleBlur}
                                                                            // value={values.shortDescription}
                                                                            // error={Boolean(
                                                                            //     touched.shortDescription && errors.shortDescription
                                                                            // )}
                                                                            // helperText={
                                                                            //     touched.shortDescription && errors.shortDescription
                                                                            //         ? errors.shortDescription
                                                                            //         : ''
                                                                            // }
                                                                        />
                                                                    </Grid> */}
                                                                </Grid>

                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="First Name"
                                                                            name="firstName"
                                                                            onChange={handleChange}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // onBlur={handleBlur}
                                                                            // value={values.shortDescription}
                                                                            error={Boolean(touched.firstName && errors.firstName)}
                                                                            helperText={
                                                                                touched.firstName && errors.firstName
                                                                                    ? errors.firstName
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="standard-select-currency"
                                                                            label="Middle Name"
                                                                            name="middleName"
                                                                            onChange={(event) => {
                                                                                console.log(event);
                                                                                // handleDistricts(event.target.value);
                                                                                // setFieldValue('province', event.target.value);
                                                                                // setFieldValue('district', '');
                                                                                // setDisableDistrict(false);
                                                                            }}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                            // value={values.province}
                                                                            error={Boolean(touched.middleName && errors.middleName)}
                                                                            helperText={
                                                                                touched.middleName && errors.middleName
                                                                                    ? errors.middleName
                                                                                    : ''
                                                                            }
                                                                        >
                                                                            {/* {provinceList.length != 0
                                                                                ? provinceList.map((data, key) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={key}
                                                                                              dense={true}
                                                                                              value={data.name}
                                                                                          >
                                                                                              {data.name}
                                                                                          </MenuItem>
                                                                                      );
                                                                                  })
                                                                                : ''} */}
                                                                        </TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            /// disabled={disableDistrict}
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Last Name"
                                                                            name="lastName"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // value={values.district}
                                                                            error={Boolean(touched.lastName && errors.lastName)}
                                                                            helperText={
                                                                                touched.lastName && errors.lastName ? errors.lastName : ''
                                                                            }
                                                                        >
                                                                            {/* {districtList.length != 0
                                                                                ? districtList.map((data, key) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={key}
                                                                                              dense={true}
                                                                                              value={data.name}
                                                                                          >
                                                                                              {data.name}
                                                                                          </MenuItem>
                                                                                      );
                                                                                  })
                                                                                : ''} */}
                                                                        </TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="NIC"
                                                                            name="nic"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // value={values.geoName}
                                                                            error={Boolean(touched.nic && errors.nic)}
                                                                            helperText={touched.nic && errors.nic ? errors.nic : ''}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="Email"
                                                                            type="email"
                                                                            name="email"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            // value={values.geoName}
                                                                            error={Boolean(touched.email && errors.email)}
                                                                            helperText={touched.email && errors.email ? errors.email : ''}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Mobile No"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            name="mobileNo"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // value={values.website}
                                                                            // error={Boolean(touched.mobileNo && errors.mobileNo)}
                                                                            // helperText={
                                                                            //     touched.mobileNo && errors.mobileNo ? errors.mobileNo : ''
                                                                            // }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <Autocomplete
                                                                            // value={
                                                                            //     values.taxGroupDetails[idx]
                                                                            //         ? values.taxGroupDetails[
                                                                            //               idx
                                                                            //           ].tax
                                                                            //         : null
                                                                            // }
                                                                            // name={`taxGroupDetails.${idx}.tax`}
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}
                                                                            // options={taxListOptions}
                                                                            // getOptionLabel={(option) =>
                                                                            //     `${option.taxCode} - (${option.taxDescription})`
                                                                            // }
                                                                            // isOptionEqualToValue={(
                                                                            //     option,
                                                                            //     value
                                                                            // ) => option.taxId === value.taxId}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Designation"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    name="designation"
                                                                                    onBlur={handleBlur}
                                                                                    // error={Boolean(
                                                                                    //     touched.designation && errors.designation
                                                                                    // )}
                                                                                    // helperText={
                                                                                    //     touched.designation && errors.designation
                                                                                    //         ? errors.designation
                                                                                    //         : ''
                                                                                    // }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            // value={
                                                                            //     values.taxGroupDetails[idx]
                                                                            //         ? values.taxGroupDetails[
                                                                            //               idx
                                                                            //           ].tax
                                                                            //         : null
                                                                            // }
                                                                            // name={`taxGroupDetails.${idx}.tax`}
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}
                                                                            // options={taxListOptions}
                                                                            // getOptionLabel={(option) =>
                                                                            //     `${option.taxCode} - (${option.taxDescription})`
                                                                            // }
                                                                            // isOptionEqualToValue={(
                                                                            //     option,
                                                                            //     value
                                                                            // ) => option.taxId === value.taxId}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Department"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    variant="outlined"
                                                                                    name="department"
                                                                                    onBlur={handleBlur}
                                                                                    // error={Boolean(touched.department && errors.department)}
                                                                                    // helperText={
                                                                                    //     touched.department && errors.department
                                                                                    //         ? errors.department
                                                                                    //         : ''
                                                                                    // }
                                                                                    // helperText={
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax &&
                                                                                    //     errors.taxGroupDetails &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax
                                                                                    //         ? errors
                                                                                    //               .taxGroupDetails[
                                                                                    //               idx
                                                                                    //           ].tax
                                                                                    //         : ''
                                                                                    // }
                                                                                    // error={Boolean(
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax &&
                                                                                    //         errors.taxGroupDetails &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax
                                                                                    // )}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            // value={
                                                                            //     values.taxGroupDetails[idx]
                                                                            //         ? values.taxGroupDetails[
                                                                            //               idx
                                                                            //           ].tax
                                                                            //         : null
                                                                            // }
                                                                            name="cluster"
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}

                                                                            options={clusterListOptions.codeAndNameDetails}
                                                                            getOptionLabel={(option) => `${option.code} - ${option.name}`}
                                                                            // isOptionEqualToValue={(
                                                                            //     option,
                                                                            //     value
                                                                            // ) => option.taxId === value.taxId}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Cluster"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    // placeholder="--Select a Company Code --"
                                                                                    variant="outlined"
                                                                                    name="cluster"
                                                                                    onBlur={handleBlur}
                                                                                    // error={Boolean(touched.cluster && errors.cluster)}
                                                                                    // helperText={
                                                                                    //     touched.cluster && errors.cluster
                                                                                    //         ? errors.cluster
                                                                                    //         : ''
                                                                                    // }
                                                                                    // helperText={
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax &&
                                                                                    //     errors.taxGroupDetails &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax
                                                                                    //         ? errors
                                                                                    //               .taxGroupDetails[
                                                                                    //               idx
                                                                                    //           ].tax
                                                                                    //         : ''
                                                                                    // }
                                                                                    // error={Boolean(
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax &&
                                                                                    //         errors.taxGroupDetails &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax
                                                                                    // )}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    {/* <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Narration"
                                                                            name="narration"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // value={values.narration}
                                                                            // error={Boolean(touched.narration && errors.narration)}
                                                                            // helperText={
                                                                            //     touched.narration && errors.narration
                                                                            //         ? errors.narration
                                                                            //         : ''
                                                                            // }
                                                                        ></TextField>
                                                                    </Grid> */}
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            fullWidth
                                                                            multiple={true}
                                                                            // value={inputMarketValue}
                                                                            // name={`taxGroupDetails.${idx}.tax`}
                                                                            onChange={(_, value) => {
                                                                                // console.log(value);
                                                                                // setMarketInputValue(value.code);
                                                                                setFieldValue(value);
                                                                            }}
                                                                            // inputValue={inputValue}
                                                                            // onInputChange={(event: any, newInputValue: string) => {
                                                                            //     console.log('newInputValue', newInputValue);
                                                                            //     setInputValue(newInputValue);
                                                                            // }}
                                                                            options={marketListOptions}
                                                                            getOptionLabel={(option) => `${option.code} - (${option.name})`}
                                                                            isOptionEqualToValue={(option, value) =>
                                                                                option.marketId === value.marketId
                                                                            }
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="Market"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 620 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    // placeholder="--Select a Market Code --"
                                                                                    variant="outlined"
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    name="market"
                                                                                    onBlur={handleBlur}
                                                                                    // error={Boolean(touched.market && errors.market)}
                                                                                    // helperText={
                                                                                    //     touched.market && errors.market ? errors.market : ''
                                                                                    // }
                                                                                    // helperText={
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax &&
                                                                                    //     errors.taxGroupDetails &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax
                                                                                    //         ? errors
                                                                                    //               .taxGroupDetails[
                                                                                    //               idx
                                                                                    //           ].tax
                                                                                    //         : ''
                                                                                    // }
                                                                                    // error={Boolean(
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax &&
                                                                                    //         errors.taxGroupDetails &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax
                                                                                    // )}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>

                                                                    {/* <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Narration"
                                                                            name="narration"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // value={values.narration}
                                                                            // error={Boolean(touched.narration && errors.narration)}
                                                                            // helperText={
                                                                            //     touched.narration && errors.narration
                                                                            //         ? errors.narration
                                                                            //         : ''
                                                                            // }
                                                                        ></TextField>
                                                                    </Grid> */}

                                                                    {/* <Grid item display="flex">
                                                                        <Grid item style={{ paddingTop: '10px' }}>
                                                                            Active
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <FormGroup>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            name="status"
                                                                                            onChange={handleChange}
                                                                                            // checked={values.status}
                                                                                            // value={values.status}
                                                                                        />
                                                                         g           }
                                                                                />
                                                                            </FormGroup>
                                                                        </Grid>
                                                                    </Grid> */}
                                                                </Grid>

                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item xs={6} sm={4}>
                                                                        <Autocomplete
                                                                            // value={
                                                                            //     values.taxGroupDetails[idx]
                                                                            //         ? values.taxGroupDetails[
                                                                            //               idx
                                                                            //           ].tax
                                                                            //         : null
                                                                            // }
                                                                            // name={`taxGroupDetails.${idx}.tax`}
                                                                            // onChange={(_, value) => {
                                                                            //     console.log(value);
                                                                            //     setFieldValue(`taxGroupDetails.${idx}.tax`, value);
                                                                            // }}
                                                                            // options={taxListOptions}
                                                                            // getOptionLabel={(option) =>
                                                                            //     `${option.taxCode} - (${option.taxDescription})`
                                                                            // }
                                                                            // isOptionEqualToValue={(
                                                                            //     option,
                                                                            //     value
                                                                            // ) => option.taxId === value.taxId}
                                                                            renderInput={(params) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    label="User Role"
                                                                                    sx={{
                                                                                        width: { sm: 200, md: 200 },
                                                                                        '& .MuiInputBase-root': {
                                                                                            height: 40
                                                                                        }
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    // placeholder="--Select a User Role --"
                                                                                    variant="outlined"
                                                                                    name="userRole"
                                                                                    onBlur={handleBlur}
                                                                                    // error={Boolean(touched.userRole && errors.userRole)}
                                                                                    // helperText={
                                                                                    //     touched.userRole && errors.userRole
                                                                                    //         ? errors.userRole
                                                                                    //         : ''
                                                                                    // }
                                                                                    // helperText={
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     touched.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax &&
                                                                                    //     errors.taxGroupDetails &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ] &&
                                                                                    //     errors.taxGroupDetails[
                                                                                    //         idx
                                                                                    //     ].tax
                                                                                    //         ? errors
                                                                                    //               .taxGroupDetails[
                                                                                    //               idx
                                                                                    //           ].tax
                                                                                    //         : ''
                                                                                    // }
                                                                                    // error={Boolean(
                                                                                    //     touched.taxGroupDetails &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         touched
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax &&
                                                                                    //         errors.taxGroupDetails &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ] &&
                                                                                    //         errors
                                                                                    //             .taxGroupDetails[
                                                                                    //             idx
                                                                                    //         ].tax
                                                                                    // )}
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="User Name"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            name="userName"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // value={values.website}
                                                                            error={Boolean(touched.userName && errors.userName)}
                                                                            helperText={
                                                                                touched.userName && errors.userName ? errors.userName : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 200 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Password"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            name="password"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            // value={values.website}
                                                                            error={Boolean(touched.password && errors.password)}
                                                                            helperText={
                                                                                touched.password && errors.password ? errors.password : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>

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
                                                                        CLEAR
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

export default User;
