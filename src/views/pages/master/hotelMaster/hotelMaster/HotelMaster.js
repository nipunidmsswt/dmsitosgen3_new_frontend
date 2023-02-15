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
    Button,
    MenuItem,
    Divider
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
import { getActiveLocations } from 'store/actions/masterActions/LocationAction';
import {
    checkDuplicateActivity_SupplimentsCode,
    getActivity_SupplimentDetailsByCode,
    saveActivity_SupplimentData,
    updateActivity_SupplimentData
} from 'store/actions/masterActions/Activity_SupplimentAction';
import { getActivity_SupplimentDetailsByCodeSaga } from 'store/saga/mastersaga/Activity_SupplimentSage';
import PreviewIcon from '@mui/icons-material/Preview';
import { getAllActiveManagingCompanyDetails } from 'store/actions/masterActions/ManagingComapanyAction';
import AlertItemExist from 'messages/AlertItemExist';
import ManagingCompany from '../../managing_company/ManagingCompany';
import {
    getAllActiveChildrenFacilitiesData,
    getAllActiveFacilitiesOfferedData,
    getAllActiveRecreationData,
    getAllActiveServiceOfferedData
} from 'store/actions/masterActions/HotelFacilityAction';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HotelMaster({ open, handleClose, mode, activitySupplimentId }) {
    const initialValues = {
        id: '',
        managingCompany: null,
        type: '',
        typeOfActivity: '',
        code: '',
        locationCode: null,
        activityDescription: '',
        advanceType: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        fax: '',
        maxPax: '',
        status: true,
        advanceType: true,
        youtubeLinks: [
            {
                id: '',
                url: '',
                status: true,
                enableYoutubeRow: false
            }
        ],

        activityWithTaxes: [
            {
                fromDate: '',
                toDate: '',
                currencyList: null,
                tax: null,
                perPaxBuyRate: '',
                rateWithoutTax: '',
                rateWithTax: '',
                status: true,
                enableRow: false
            }
        ]
    };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const [existOpenModal, setExistOpenModal] = useState(false);
    const activity_supplimentToUpdate = useSelector((state) => state.activity_supplimentReducer.activity_supplimentToUpdate);
    const activeLocations = useSelector((state) => state.locationReducer.activeLocations);
    const activeManagingCompanies = useSelector((state) => state.ManagingCompanyReducer.activeManagingCompanies);
    const [loadValues, setLoadValues] = useState(initialValues);
    const [currencyListArray, setCurrecyListArray] = useState([]);
    const ref = useRef(null);
    const [appearing, setAppearing] = useState(false);
    const [activeLocationList, setActiveLocationList] = useState([]);
    const [activeManagingCompanyList, setActiveManagingCompanyList] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [updatePreviewImages, setupdatePreviewImages] = useState([]);

    const [activeReCreationList, setActiveRecreationList] = useState([]);
    const [activeFacilityOfferedListData, setActiveFacilityOfferedListData] = useState([]);
    const [activeChildrenFacilityListData, setActiveChildrenFacilityListData] = useState([]);
    const [activeServiceOfferedListData, setActiveServiceOfferedListData] = useState([]);

    const activeRoomRecreationList = useSelector((state) => state.hotelFacilityReducer.activeRoomRecreationList);
    const activeFacilityOfferedList = useSelector((state) => state.hotelFacilityReducer.activeFacilityOfferedList);
    const activeChildrenFacilitiesList = useSelector((state) => state.hotelFacilityReducer.activeChildrenFacilitiesList);
    const activeServiceOfferedList = useSelector((state) => state.hotelFacilityReducer.activeServiceOfferedList);

    useEffect(() => {
        dispatch(getActiveLocations());
        dispatch(getAllActiveManagingCompanyDetails());
        dispatch(getAllActiveRecreationData());
        dispatch(getAllActiveFacilitiesOfferedData());
        dispatch(getAllActiveChildrenFacilitiesData());
        dispatch(getAllActiveServiceOfferedData());
    }, []);
    const handleExistModalClose = (status) => {
        if (status) {
            setExistOpenModal(false);
        }
    };
    useEffect(() => {
        setActiveLocationList(activeLocations);
    }, [activeLocations]);

    useEffect(() => {
        console.log(activeRoomRecreationList);
        // if (activeRoomRecreationList?.length > 0) {
        setActiveRecreationList(activeRoomRecreationList);
        // }
        // setActiveLocationList(activeLocations);
    }, [activeRoomRecreationList]);

    useEffect(() => {
        console.log(activeServiceOfferedList);
        // if (activeRoomRecreationList?.length > 0) {
        setActiveServiceOfferedListData(activeServiceOfferedList);
        // }
        // setActiveLocationList(activeLocations);
    }, [activeServiceOfferedList]);

    useEffect(() => {
        console.log(activeChildrenFacilitiesList);
        // if (activeRoomRecreationList?.length > 0) {
        setActiveChildrenFacilityListData(activeChildrenFacilitiesList);
        // }
        // setActiveLocationList(activeLocations);
    }, [activeChildrenFacilitiesList]);

    useEffect(() => {
        console.log(activeFacilityOfferedList);
        // if (activeRoomRecreationList?.length > 0) {
        setActiveFacilityOfferedListData(activeFacilityOfferedList);
        // }
        // setActiveLocationList(activeLocations);
    }, [activeFacilityOfferedList]);

    useEffect(() => {
        if (activeManagingCompanies?.payload?.length > 0) {
            console.log(activeManagingCompanies?.payload[0]);
            setActiveManagingCompanyList(activeManagingCompanies?.payload[0]);
        }
    }, [activeManagingCompanies]);

    useEffect(() => {
        if (activity_supplimentToUpdate != null) {
            const dataArray = [];
            const dataArrayYoutube = [];
            if (
                (mode === 'VIEW_UPDATE' && activity_supplimentToUpdate != null) ||
                (mode === 'VIEW' && activity_supplimentToUpdate != null)
            ) {
                activity_supplimentToUpdate.activityWithTaxes.map((item) => {
                    const activityWithTaxes = {
                        enableRow: true,
                        fromDate: item.fromDate,
                        toDate: item.toDate,
                        currencyList: item.currencyList,
                        tax: item.tax,
                        perDayRate: item.perPaxBuyRate == null ? 0.0 : item.perPaxBuyRate,

                        status: item.status
                    };

                    dataArray.push(activityWithTaxes);
                });

                activity_supplimentToUpdate.youtubeLinks.map((itemYoutube) => {
                    const youtubeLinks = {
                        url: itemYoutube.url,
                        status: itemYoutube.status
                    };
                    dataArrayYoutube.push(youtubeLinks);
                });

                const saveValues = {
                    id: activity_supplimentToUpdate.id,
                    type: activity_supplimentToUpdate.type,
                    typeOfActivity: activity_supplimentToUpdate.typeOfActivity,
                    code: activity_supplimentToUpdate.code,
                    locationCode: activity_supplimentToUpdate.locationCode,
                    activityDescription: activity_supplimentToUpdate.activityDescription,
                    advanceType: activity_supplimentToUpdate.advanceType,
                    contactPerson: activity_supplimentToUpdate.contactPerson,
                    phone: activity_supplimentToUpdate.phone,
                    email: activity_supplimentToUpdate.email,
                    address: activity_supplimentToUpdate.address,
                    website: activity_supplimentToUpdate.website,
                    fax: activity_supplimentToUpdate.fax,
                    maxPax: activity_supplimentToUpdate.maxPax,
                    status: activity_supplimentToUpdate.status,
                    advanceType: activity_supplimentToUpdate.advanceType,
                    // files: data.files,AS
                    youtubeLinks: dataArrayYoutube,
                    activityWithTaxes: dataArray
                };
                setLoadValues(saveValues);
                activity_supplimentToUpdate.type == 'Supplement' ? setCategoryType('Supplement') : setCategoryType('Activity');
                activity_supplimentToUpdate.type == 'Supplement' ? setTypeOfActivity(false) : setTypeOfActivity(true);
                // activity_supplimentToUpdate.typeOfActivity == 'Supplement' ? setCategoryType('Supplement') : setCategoryType('Activity');
                if (activity_supplimentToUpdate.typeOfActivity == 'Group') {
                    setLabelName('Per Group Rate');
                } else if (activity_supplimentToUpdate.typeOfActivity == 'Ride') {
                    setLabelName('Max Pax Rate');
                    // setTypeOfActivity(false);
                } else {
                    setLabelName('Per Pax Rate');
                }
            }
        }
    }, [activity_supplimentToUpdate]);

    yup.addMethod(yup.string, 'checkDuplicateActivitySupplementCode', function (message) {
        return this.test('checkDuplicateActivitySupplementCode', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    await dispatch(checkDuplicateActivity_SupplimentsCode(value, categoryType));

                    if (duplicateCode != null && duplicateCode.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                    return false;
                } catch (error) {}
            }
            return true;
        });
    });

    const validationSchema = yup.object().shape({
        code: yup.string().required('Required field').checkDuplicateActivitySupplementCode('Duplicate Code'),
        activityDescription: yup.string().required('Required field'),
        maxPax: yup.number().required('Required field'),
        email: yup.string().email(),
        phone: yup.string().matches(phoneRegExp, 'Not valid').min(10, 'Must be exactly 10 digits').max(10, 'Must be 10 digits'),

        activityWithTaxes: yup.array().of(
            yup.object().shape({
                tax: yup.object().typeError('Required field'),
                fromDate: yup.date().required('Required field'),
                toDate: yup.date().min(yup.ref('fromDate'), "End date can't be before start date"),
                currencyList: yup.object().typeError('Required field'),
                perDayRate: yup.number().required('Required field').positive('entry should be greater than 0'),
                status: yup.boolean()
            })
        )
        // .uniqueStatus('Already Existing Active Record.')
    });

    // const  checkStatus()=>{

    // }
    let checkStatus = function (value) {
        initialValues.guideClassDetails?.map((s) => console.log(s.status));
        // console.log('value:' + value);
    };

    const dispatch = useDispatch();
    const [taxIdValues, setTaxIdValues] = useState(null);
    const [taxValues, setTaxValues] = useState(null);

    // useEffect(() => {
    //     if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
    //         dispatch(getActivity_SupplimentDetailsByCode(activitySupplimentId));
    //     }
    // }, [mode]);

    const showImages = (event) => {
        let images = [];
        console.log(event);
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(event.target.files[i])
            images.push(URL.createObjectURL(event.target.files[i]));
        }

        setPreviewImages(images);
        setupdatePreviewImages([]);
    };

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            const dataArray = [];
            const dataArrayYoutube = [];
            if (data.activityWithTaxes.length > 0 || data.youtubeLinks.length > 0) {
                data.activityWithTaxes.map((item) => {
                    const activityWithTaxes = {
                        fromDate: item.fromDate,
                        toDate: item.toDate,
                        currencyList: item.currencyList.currencyListId,
                        tax: item.tax.taxId,
                        perPaxBuyRate: item.perDayRate == null ? 0.0 : item.perDayRate,
                        rateWithoutTax: item.perDayRate,
                        rateWithTax: item.perDayRate,
                        status: item.status
                    };
                    dataArray.push(activityWithTaxes);
                });

                data.youtubeLinks.map((itemYoutube) => {
                    const youtubeLinks = {
                        url: itemYoutube.url,
                        status: itemYoutube.status
                    };
                    dataArrayYoutube.push(youtubeLinks);
                });

                const saveValues = {
                    type: data.type,
                    typeOfActivity: data.typeOfActivity,
                    code: data.code,
                    locationCode: data.locationCode.location_id,
                    activityDescription: data.activityDescription,
                    advanceType: data.advanceType,
                    contactPerson: data.contactPerson,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    website: data.website,
                    fax: data.fax,
                    maxPax: data.maxPax,
                    status: data.status,
                    advanceType: data.advanceType,
                    // files: data.files,AS
                    youtubeLinks: dataArrayYoutube,
                    activityWithTaxes: dataArray
                };
                dispatch(saveActivity_SupplimentData(saveValues));
            }
        } else if (mode === 'VIEW_UPDATE') {
            const dataArray = [];
            const dataArrayYoutube = [];
            console.log('activity_supplimentToUpdate.id:' + activity_supplimentToUpdate.id);
            data.activityWithTaxes.map((item) => {
                const activityWithTaxes = {
                    id: item.id,
                    fromDate: item.fromDate,
                    toDate: item.toDate,
                    currencyList: item.currencyList.currencyListId,
                    tax: item.tax.taxId,
                    perPaxBuyRate: item.perDayRate == null ? 0.0 : item.perDayRate,
                    rateWithoutTax: item.perDayRate,
                    rateWithTax: item.perDayRate,
                    status: item.status
                };
                dataArray.push(activityWithTaxes);
            });

            data.youtubeLinks.map((itemYoutube) => {
                const youtubeLinks = {
                    url: itemYoutube.url,
                    status: itemYoutube.status
                };
                dataArrayYoutube.push(youtubeLinks);
            });

            const saveValues = {
                id: data.id,
                type: data.type,
                typeOfActivity: data.typeOfActivity,
                code: data.code,
                locationCode: data.locationCode.location_id,
                activityDescription: data.activityDescription,
                advanceType: data.advanceType,
                contactPerson: data.contactPerson,
                phone: data.phone,
                email: data.email,
                address: data.address,
                website: data.website,
                fax: data.fax,
                maxPax: data.maxPax,
                status: data.status,
                advanceType: data.advanceType,
                // files: data.files,AS
                youtubeLinks: dataArrayYoutube,
                activityWithTaxes: dataArray
            };
            dispatch(updateActivity_SupplimentData(saveValues));
        }
        handleClose();
    };

    useEffect(() => {
        console.log(ref.current);
    }, [ref]);

    const taxListData = useSelector((state) => state.taxReducer.taxes);
    const currencyListData = useSelector((state) => state.expenseTypesReducer.currencyList);
    const duplicateCode = useSelector((state) => state.activity_supplimentReducer.duplicateCode);
    const [taxListOptions, setTaxListOptions] = useState([]);
    const [currencyListOptions, setCurrencyListOptions] = useState([]);
    const [categoryType, setCategoryType] = useState('Activity');
    const [typeOfActivity, setTypeOfActivity] = useState(true);
    const [labelName, setLabelName] = useState('Per Pax Rate');
    const [managingCompanyCode, setManagingCompanyCode] = useState('');

    useEffect(() => {
        if (currencyListData != null) {
            setCurrencyListOptions(currencyListData);
        }
    }, [currencyListData]);

    useEffect(() => {
        if (taxListData != null) {
            setTaxListOptions(taxListData);
        }
    }, [taxListData]);

    const selectedType = (event) => {
        const selectedType = event.currentTarget.dataset.value;

        setCategoryType(selectedType);
        if (selectedType == 'Activity') {
            setTypeOfActivity(true);
        } else {
            setLabelName('Per Pax Rate');
            setTypeOfActivity(false);
        }
        // setActivityType(t)
    };

    const selectedActivityType = (event) => {
        const selectedType = event.currentTarget.dataset.value;
        if (selectedType == 'Group') {
            setLabelName('Per Group Rate');
        } else if (selectedType == 'Ride') {
            setLabelName('Max Pax Rate');
            // setTypeOfActivity(false);
        } else {
            setLabelName('Per Pax Rate');
        }
    };

    const viewManagingCompanyDetails = (value) => {
        setManagingCompanyCode(value.code);
        setExistOpenModal(true);
        // alert('managing company');
    };

    return (
        <div>
            <Dialog
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
                            Hotel
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
                                                        <Box sx={{ width: '100%' }}>
                                                            <Grid container rowSpacing={2} style={{ marginTop: '2px' }}>
                                                                <Grid item xs={6}>
                                                                    {/* <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        disabled={mode == 'VIEW_UPDATE'}
                                                        label="Company Name"
                                                        name="companyName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyName}
                                                        error={Boolean(touched.companyName && errors.companyName)}
                                                        helperText={touched.companyName && errors.companyName ? errors.companyName : ''}
                                                    ></TextField> */}
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Hotel Code"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Grid container>
                                                                        <Grid item>
                                                                            <Autocomplete
                                                                                value={values.managingCompany}
                                                                                name="managingCompany"
                                                                                onChange={(_, value) => {
                                                                                    setFieldValue(`managingCompany`, value);
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                options={activeManagingCompanyList}
                                                                                getOptionLabel={(option) => `${option.code}-${option.name}`}
                                                                                // isOptionEqualToValue={(option, value) =>
                                                                                //     option.id === value.id
                                                                                // }
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        label="Managing Company"
                                                                                        InputLabelProps={{
                                                                                            shrink: true
                                                                                        }}
                                                                                        sx={{
                                                                                            width: {
                                                                                                sm: 230
                                                                                            },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                        variant="outlined"
                                                                                        name="managingCompany"
                                                                                        onBlur={handleBlur}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </Grid>

                                                                        <Grid item>
                                                                            {/* <PreviewIcon onClick={viewManagingCompanyDetails} /> */}
                                                                            <PreviewIcon
                                                                                onClick={() =>
                                                                                    viewManagingCompanyDetails(values.managingCompany)
                                                                                }
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={percentage}
                                                                        label="Property Code"
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        id="percentage"
                                                                        name="percentage"
                                                                        type="number"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.percentage}
                                                                        error={Boolean(touched.percentage && errors.percentage)}
                                                                        helperText={
                                                                            touched.percentage && errors.percentage ? errors.percentage : ''
                                                                        }
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        sx={{
                                                                            width: { sm: 200, md: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        id="standard-select-currency"
                                                                        select
                                                                        label="Star Class"
                                                                        name="type"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        // defaultValue={values.groupType}
                                                                        value={values.type}

                                                                        // error={Boolean(touched.groupType && errors.groupType)}
                                                                        // helperText={
                                                                        //     touched.groupType && errors.groupType
                                                                        //         ? errors.groupType
                                                                        //         : ''
                                                                        // }
                                                                    >
                                                                        <MenuItem dense={true} value={'3 Class'}>
                                                                            3 Class
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'4 Class'}>
                                                                            4 Class
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'5 Class'}>
                                                                            5 Class
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'6 Class'}>
                                                                            6 Class
                                                                        </MenuItem>
                                                                        <MenuItem dense={true} value={'7 Class'}>
                                                                            7 Class
                                                                        </MenuItem>
                                                                    </TextField>
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Long Name"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                    {/* <FormGroup>
                                                                        <FormControlLabel
                                                                            name="status"
                                                                            control={<Switch />}
                                                                            label="Status"
                                                                            disabled={mode == 'VIEW'}
                                                                            onChange={handleChange}
                                                                            checked={values.status}
                                                                            value={values.status}
                                                                        />
                                                                    </FormGroup> */}
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Address"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        value={values.locationCode}
                                                                        name="locationCode"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`locationCode`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeLocationList}
                                                                        getOptionLabel={(option) => `${option.code}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.location_id === value.location_id
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Location "
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                name="locationCode"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        value={values.locationCode}
                                                                        name="locationCode"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`locationCode`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeLocationList}
                                                                        getOptionLabel={(option) => `${option.code}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.location_id === value.location_id
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Hotel Category "
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                name="locationCode"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Hotel Phone 1"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Hotel Phone 2"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Hotel Fax 1"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Hotel Fax 2"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Email"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Website"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        // label={taxCode}
                                                                        label="Cancellation Policy"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 520 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        id="taxCode"
                                                                        name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.taxCode}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>

                                                                {/* <Divider variant="middle" /> */}

                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        // value={values.locationCode}
                                                                        // name="locationCode"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`reCreation`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeReCreationList}
                                                                        getOptionLabel={(option) => `${option.code}-${option.name}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.hotelFacilityId === value.hotelFacilityId
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Re Creation"
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                // name="locationCode"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        // value={values.locationCode}
                                                                        name="facilitiesOffered"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`facilitiesOffered`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeFacilityOfferedListData}
                                                                        getOptionLabel={(option) => `${option.code}-${option.name}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.hotelFacilityId === value.hotelFacilityId
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Facilities Offered"
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                name="facilitiesOffered"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        value={values.locationCode}
                                                                        name="childrenFacilities"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`childrenFacilities`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeChildrenFacilityListData}
                                                                        getOptionLabel={(option) => `${option.code}-${option.name}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.hotelFacilityId === value.hotelFacilityId
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Children's Facilities"
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                name="childrenFacilities"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Autocomplete
                                                                        // value={values.locationCode}
                                                                        name="serviceOffered"
                                                                        onChange={(_, value) => {
                                                                            setFieldValue(`serviceOffered`, value);
                                                                        }}
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        options={activeServiceOfferedListData}
                                                                        getOptionLabel={(option) => `${option.code}-${option.name}`}
                                                                        isOptionEqualToValue={(option, value) =>
                                                                            option.hotelFacilityId === value.hotelFacilityId
                                                                        }
                                                                        renderInput={(params) => (
                                                                            <TextField
                                                                                {...params}
                                                                                label="Service Offered"
                                                                                InputLabelProps={{
                                                                                    shrink: true
                                                                                }}
                                                                                sx={{
                                                                                    width: {
                                                                                        sm: 250
                                                                                    },
                                                                                    '& .MuiInputBase-root': {
                                                                                        height: 40
                                                                                    }
                                                                                }}
                                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                                variant="outlined"
                                                                                name="serviceOffered"
                                                                                onBlur={handleBlur}
                                                                            />
                                                                        )}
                                                                    />
                                                                </Grid>
                                                            </Grid>

                                                            {/* <Grid container rowSpacing={2}>
                                                                <Grid item>
                                                                    <TextField
                                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                        multiline
                                                                        rows={10}
                                                                        label="Cancellation Policy"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        sx={{
                                                                            width: { xs: 150, sm: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        type="text"
                                                                        variant="outlined"
                                                                        // className="txt"
                                                                        // id="taxCode"
                                                                        // name="taxCode"
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        // value={values.taxCode}
                                                                        // error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        // helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                    />
                                                                </Grid>
                                                            </Grid> */}
                                                        </Box>

                                                        <br />
                                                        {/* <Box>
                                                            <Grid item>
                                                                {mode === 'VIEW' ? (
                                                                    <CreatedUpdatedUserDetailsWithTableFormat formValues={values} />
                                                                ) : null}
                                                            </Grid>
                                                        </Box> */}
                                                        <Grid item>
                                                            {existOpenModal ? (
                                                                <ManagingCompany
                                                                    title="dev"
                                                                    open={existOpenModal}
                                                                    handleClose={handleExistModalClose}
                                                                    code={managingCompanyCode}
                                                                    mode="VIEW"
                                                                />
                                                            ) : null}
                                                        </Grid>
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

export default HotelMaster;
