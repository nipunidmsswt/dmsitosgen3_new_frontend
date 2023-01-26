import { useEffect, forwardRef, useState, Fragment, useRef } from 'react';
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
    Button,
    Typography,
    MenuItem,
    Autocomplete,
    Switch
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import {
    getAllRolesData,
    getUserDataById,
    saveUserData,
    updateUserData,
    getProfileData
} from 'store/actions/authenticationActions/UserAction';
import CreatedUpdatedUserDetailsWithTableFormat from 'views/pages/master/userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';
import { getAllClusterData } from 'store/actions/masterActions/CodeAndNameAction';
import { getAllCompanyProfileData, getAvailableLicenseCount } from 'store/actions/masterActions/CompanyProfileAction';
import { getAllDepartmentData, getAllDesignationData } from 'store/actions/masterActions/DepartmentDesignationAction';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function User({ open, handleClose, mode, userCode, component }) {
    const initialValues = {
        disablePassowrdField: true,
        company: null,
        title: '',
        firstName: '',
        middleName: '',
        status: true,
        lastName: '',
        nic: '',
        email: '',
        mobile: '',
        designation: null,
        department: null,
        cluster: null,
        market: null,
        roleId: null,
        userName: '',
        password: '',
        availableLicenceCount: '',
        allocatedLicenceCount: ''
        // files: undefined,
        // previewImages: [],
        // progressInfos: [],
        // message: []
    };
    const [loadValues, setLoadValues] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [updatePreviewImages, setupdatePreviewImages] = useState([]);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);

    const formikRef = useRef();

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
        disablePassowrdField: yup.boolean(),
        company: yup.object().typeError('Required field'),
        title: yup.string().required('Required field'),
        firstName: yup.string().required('Required field'),
        // // status: true,
        lastName: yup.string().required('Required field'),
        nic: yup.string().required('Required field'),
        email: yup.string().email().required('Required field'),
        mobile: yup
            .string()
            .required('Required field')
            .matches(phoneRegExp, 'Not valid')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be 10 digits'),
        designation: yup.object().typeError('Required field'),
        department: yup.object().typeError('Required field'),
        cluster: yup.object().typeError('Required field'),
        // market: yup.object().typeError('Required field'),
        roleId: yup.object().typeError('Required field'),
        userName: yup.string().required('Requied field'),
        // password: yup.string().required('Requied field').min(8, 'Password is too short - should be 8 chars minimum.')
        // .lowercase(1, 'password must contain at least 1 lower case letter')
        // .minUppercase(1, 'password must contain at least 1 upper case letter')
        // .minNumbers(1, 'password must contain at least 1 number')
        // .minSymbols(1, 'password must contain at least 1 special character')

        // password: yup.string().when('disablePassowrdField', {
        //     is: true,
        //     then: yup
        //         .string()
        //         .required('Field is required')
        //         .min(8, 'Must be 8 characters or more')
        //         .matches(/[a-z]+/, 'One lowercase character')
        //         .matches(/[A-Z]+/, 'One uppercase character')
        //         .matches(/[@$!%*#?&]+/, 'One special character')
        //         .matches(/\d+/, 'One number')
        // })

        password: yup.string().required('Required field')
        // .min(8, 'Must be 8 characters or more')
        // .matches(/[a-z]+/, 'One lowercase character')
        // .matches(/[A-Z]+/, 'One uppercase character')
        // .matches(/[@$!%*#?&]+/, 'One special character')
        // .matches(/\d+/, 'One number')
        // .test('isValidPass1', 'can not include first name', (value, context) => {
        //     console.log(typeof value);
        //     console.log(formikRef.current.values.firstName);
        //     if (value !== '' && formikRef.current.values.firstName !== '') {
        //         console.log(value.includes(formikRef.current.values.firstName));
        //         return !value.includes(formikRef.current.values.firstName);
        //     }

        //     return true;
        // })
        // .test('isValidPass2', 'can not include last name', (value, context) => {
        //     console.log(typeof value);
        //     console.log(formikRef.current.values.lastName);
        //     if (value !== '' && formikRef.current.values.lastName !== '') {
        //         console.log(value.includes(formikRef.current.values.lastName));
        //         return !value.includes(formikRef.current.values.lastName);
        //     }

        //     return true;
        // })
        // .test('isValidPass3', 'can not include email', (value, context) => {
        //     console.log(typeof value);
        //     console.log(formikRef.current.values.email);
        //     if (value !== '' && formikRef.current.values.email !== '') {
        //         console.log(value.includes(formikRef.current.values.email));
        //         return !value.includes(formikRef.current.values.email);
        //     }

        //     return true;
        // })
        // .test('isValidPass3', 'can not include userName', (value, context) => {
        //     console.log(typeof value);
        //     console.log(formikRef.current.values.userName);
        //     if (value !== '' && formikRef.current.values.userName !== '') {
        //         console.log(value.includes(formikRef.current.values.userName));
        //         return !value.includes(formikRef.current.values.userName);
        //     }

        //     return true;
        // })
    });

    //get data from reducers
    const duplicateUser = useSelector((state) => state.userReducer.duplicateUser);
    const userToUpdate = useSelector((state) => state.userReducer.userToUpdate);
    const profileToUpdate = useSelector((state) => state.userReducer.profileToUpdate);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const clusterListData = useSelector((state) => state.codeAndNameReducer.cluterTypesDetails);
    console.log(clusterListData);
    const companyProfile = useSelector((state) => state.companyProfileReducer.companyProfileList);
    const availableLicenseCount = useSelector((state) => state.companyProfileReducer.availableLicenseCount);

    const [clusterListOptions, setClusterListOptions] = useState([]);
    const [departmentListOptions, setDepartmentListOptions] = useState([]);
    const [designationListOptions, setDesignationListOptions] = useState([]);
    const [userListOptions, setuserListOptions] = useState([]);
    const [titleListOptions, setTitleListOptions] = useState([]);
    const [companyListOptions, setCompanyListOptions] = useState([]);
    const [userRoleListOptions, setuserRoleListOptions] = useState([]);
    const dispatch = useDispatch();
    const [inputMarketValue, setMarketInputValue] = useState(initialValues.market);
    const departmentActiveList = useSelector((state) => state.departmentDesignationReducer.departmentActiveList);
    const designationActiveList = useSelector((state) => state.departmentDesignationReducer.designationActiveList);
    const roleIdList = useSelector((state) => state.userReducer.userRole);

    const titleItems = [
        {
            // id: 1,
            title: 'Mr.'
        },
        {
            // id: 2,
            title: 'Mrs.'
        },
        {
            // id: 3,
            title: 'Miss.'
        },
        {
            // id: 4,
            title: 'Ms.'
        },
        {
            // id: 5,
            title: 'Prof.'
        },
        {
            // id: 6,
            title: 'Dr.'
        },
        {
            // id: 7,
            title: 'Ven.'
        }
    ];
    useEffect(() => {
        console.log(clusterListData);
        if (clusterListData != null) {
            setClusterListOptions(clusterListData);
        }
    }, [clusterListData]);

    useEffect(() => {
        if (departmentActiveList != null) {
            setDepartmentListOptions(departmentActiveList);
        }
    }, [departmentActiveList]);

    useEffect(() => {
        console.log(userToUpdate);
        if ((mode === 'VIEW_UPDATE' && userToUpdate != null) || (mode === 'VIEW' && userToUpdate != null)) {
            console.log(userToUpdate);
            setLoadValues(userToUpdate);
            // setFieldValue('disablePassowrdField', false);
            formikRef.current.setFieldValue('disablePassowrdField', false);
        }
    }, [userToUpdate]);

    useEffect(() => {
        console.log(profileToUpdate);
        if ((mode === 'VIEW_UPDATE' && profileToUpdate != null) || (mode === 'VIEW' && profileToUpdate != null)) {
            console.log(profileToUpdate);

            // setFieldValue('disablePassowrdField', false);
            setLoadValues(profileToUpdate);
            formikRef.current.setFieldValue('disablePassowrdField', false);
        }
    }, [profileToUpdate]);

    useEffect(() => {
        if (roleIdList != null) {
            setuserRoleListOptions(roleIdList);
        }
    }, [roleIdList]);

    useEffect(() => {
        if (designationActiveList != null) {
            setDesignationListOptions(designationActiveList);
        }
    }, [designationActiveList]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && component === 'user_creation') || (mode === 'VIEW' && component === 'user_creation')) {
            console.log(userCode);

            dispatch(getUserDataById(userCode));

            // setTitleListOptions(ti)
        } else if ((mode === 'VIEW_UPDATE' && component === 'user_profile') || (mode === 'VIEW' && component === 'user_profile')) {
            dispatch(getProfileData(userCode));
        }
    }, [mode]);

    useEffect(() => {
        setMarketListOptions(marketListData);
    }, [marketListData]);

    useEffect(() => {
        if (companyProfile?.payload?.length > 0) {
            setCompanyListOptions(companyProfile?.payload[0]);
            console.log(companyProfile?.payload[0][0]);
            dispatch(getAvailableLicenseCount(companyProfile?.payload[0][0].id));
        }
    }, [companyProfile]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            console.log(data);
            // dispatch(saveUserData(data));
        } else if (mode === 'VIEW_UPDATE') {
            // dispatch(updateUserData(data));
        }
        // handleClose();
    };

    const loadAvalibleLicenseCount = (data, setFieldValue) => {
        setFieldValue('availableLicenceCount', data.availableLicenceCount);
        setFieldValue('allocatedLicenceCount', data.allocatedLicenceCount);
    };

    useEffect(() => {
        dispatch(getAllActiveMarketData());
        dispatch(getAllClusterData());
        dispatch(getAllCompanyProfileData());
        setTitleListOptions(titleItems);
        dispatch(getAllDepartmentData());
        dispatch(getAllDesignationData());
        dispatch(getAllRolesData());
    }, []);

    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" alignItems="center" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' && component === 'user_creation' ? 'Add User Creation' : ''}
                            {mode === 'VIEW_UPDATE' && component === 'user_creation' ? 'Update User Creation' : ''}
                            {mode === 'VIEW' && component === 'user_creation' ? 'View User Creation' : ''}
                            {component === 'user_profile' ? 'My Profile' : ''}
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
                                                innerRef={formikRef}
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
                                                                    {/* <Grid item sm={4}>
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
                                                                    </Grid> */}
                                                                    {/* <Grid item sm={4}>
                                                                        <Typography variant="" component="p">
                                                                            5 Licenses Used Out Of 10
                                                                        </Typography>
                                                                    </Grid> */}
                                                                    {/* <Grid item sm={4}>
                                                                        <Typography variant="" component="p">
                                                                            5 Licenses Used Out Of 10
                                                                        </Typography>
                                                                    </Grid> */}
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
                                                                            value={values.company}
                                                                            name="company"
                                                                            onChange={(_, value) => {
                                                                                console.log(value);
                                                                                setFieldValue(`company`, value);
                                                                                loadAvalibleLicenseCount(value, setFieldValue);
                                                                            }}
                                                                            options={companyListOptions}
                                                                            getOptionLabel={(option) => `${option.companyName}`}
                                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 100, md: 100 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            select
                                                                            name="title"
                                                                            label="Title"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            value={values.title}
                                                                            error={Boolean(touched.title && errors.title)}
                                                                            helperText={touched.title && errors.title ? errors.title : ''}
                                                                            // MenuProps={{
                                                                            //   PaperProps: { sx: { maxHeight: 120 } },
                                                                            // }}
                                                                        >
                                                                            <MenuItem dense={true} value={'MR.'}>
                                                                                MR.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MRS.'}>
                                                                                MRS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MISS.'}>
                                                                                MISS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'MS.'}>
                                                                                MS.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'PROF.'}>
                                                                                PROF.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'DR.'}>
                                                                                DR.
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'VEN.'}>
                                                                                VEN.
                                                                            </MenuItem>
                                                                        </TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 150 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Available LicenceCount"
                                                                            name="availableLicenceCount"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={true}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.availableLicenceCount}
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 150 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Alocated LicenceCount"
                                                                            name="allocatedLicenceCount"
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            disabled={true}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.allocatedLicenceCount}
                                                                        ></TextField>
                                                                    </Grid>
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
                                                                            onBlur={handleBlur}
                                                                            value={values.firstName}
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
                                                                            onChange={handleChange}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                            value={values.middleName}
                                                                            error={Boolean(touched.middleName && errors.middleName)}
                                                                            helperText={
                                                                                touched.middleName && errors.middleName
                                                                                    ? errors.middleName
                                                                                    : ''
                                                                            }
                                                                        ></TextField>
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
                                                                            value={values.lastName}
                                                                            error={Boolean(touched.lastName && errors.lastName)}
                                                                            helperText={
                                                                                touched.lastName && errors.lastName ? errors.lastName : ''
                                                                            }
                                                                        ></TextField>
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
                                                                            value={values.nic}
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
                                                                            value={values.email}
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
                                                                            name="mobile"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.mobile}
                                                                            // error={Boolean(touched.mobile && errors.mobile)}
                                                                            // helperText={
                                                                            //     touched.mobile && errors.mobile ? errors.mobile : ''
                                                                            // }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        <Autocomplete
                                                                            value={values.designation}
                                                                            name="designation"
                                                                            onChange={(_, value) => {
                                                                                console.log(value);
                                                                                setFieldValue(`designation`, value);
                                                                            }}
                                                                            options={designationListOptions}
                                                                            getOptionLabel={(option) => `${option.description}`}
                                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                                                                    error={Boolean(
                                                                                        touched.designation && errors.designation
                                                                                    )}
                                                                                    helperText={
                                                                                        touched.designation && errors.designation
                                                                                            ? errors.designation
                                                                                            : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            value={values.department}
                                                                            name="department"
                                                                            onChange={(_, value) => {
                                                                                console.log(value);
                                                                                setFieldValue(`department`, value);
                                                                            }}
                                                                            options={departmentListOptions}
                                                                            getOptionLabel={(option) => `${option.description}`}
                                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                                                                    error={Boolean(touched.department && errors.department)}
                                                                                    helperText={
                                                                                        touched.department && errors.department
                                                                                            ? errors.department
                                                                                            : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            value={values.cluster}
                                                                            name="cluster"
                                                                            onChange={(_, value) => {
                                                                                console.log(value);
                                                                                setFieldValue(`cluster`, value);
                                                                            }}
                                                                            options={clusterListOptions}
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
                                                                                    variant="outlined"
                                                                                    name="cluster"
                                                                                    onBlur={handleBlur}
                                                                                    error={Boolean(touched.cluster && errors.cluster)}
                                                                                    helperText={
                                                                                        touched.cluster && errors.cluster
                                                                                            ? errors.cluster
                                                                                            : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid>
                                                                        <Autocomplete
                                                                            fullWidth
                                                                            multiple={true}
                                                                            name="market"
                                                                            onChange={(_, value) => {
                                                                                // console.log(value);
                                                                                // setMarketInputValue(value.code);
                                                                                setFieldValue(`market`, value);
                                                                            }}
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
                                                                                        width: { sm: 620, md: 620 },
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
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                </Grid>

                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    {/* <Grid item xs={6} sm={4}>
                                                                        <Autocomplete
                                                                            value={values.roleId}
                                                                            name="roleId"
                                                                            onChange={(_, value) => {
                                                                                console.log(value);
                                                                                setFieldValue(`roleId`, value);
                                                                            }}
                                                                            options={userRoleListOptions}
                                                                            getOptionLabel={(option) => `${option.name}`}
                                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                                                                    variant="outlined"
                                                                                    name="roleId"
                                                                                    onBlur={handleBlur}
                                                                                    error={Boolean(touched.roleId && errors.roleId)}
                                                                                    helperText={
                                                                                        touched.roleId && errors.roleId ? errors.roleId : ''
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid> */}
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
                                                                            value={values.userName}
                                                                            error={Boolean(touched.userName && errors.userName)}
                                                                            helperText={
                                                                                touched.userName && errors.userName ? errors.userName : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item display={component === 'user_creation' ? 'flex' : 'none'}>
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
                                                                            value={values.password}
                                                                            error={Boolean(touched.password && errors.password)}
                                                                            helperText={
                                                                                touched.password && errors.password ? errors.password : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
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
