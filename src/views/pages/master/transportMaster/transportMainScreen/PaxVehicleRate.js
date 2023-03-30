import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { activeSeasonsData, activeRatesSeasonId } from 'store/actions/masterActions/SeasonAction';
import {
    getAllActiveOperatorGroupData,
    getAllActiveOperatorByOperatorGpId
} from 'store/actions/masterActions/operatorActions/MarketGroupAction';
import { getActiveTaxGroupList } from 'store/actions/masterActions/TaxActions/TaxGroupAction';
import MainCard from 'ui-component/cards/MainCard';
import { Formik, Form, FieldArray, Field } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import * as yup from 'yup';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getAllCurrencyListData } from 'store/actions/masterActions/ExpenseTypeAction';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getActiveRoomcategory } from 'store/actions/masterActions/RoomCategoryAction';
import { getActiveHotelBasisList } from 'store/actions/masterActions/operatorActions/HotelBasisAction';
import {
    saveRoomBuyingRateData,
    getRoomBuyingRateDataById,
    updateRoomBuyingRateData,
    clearRoomBuyingRate,
    checkDuplicateRoomBuyingRateCode
} from 'store/actions/masterActions/RoomBuyongRateAction';
import ArticleIcon from '@mui/icons-material/Article';
import { withStyles } from '@material-ui/core/styles';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import ExitAlert from 'messages/ExitAlert';
import AlertItemExist from 'messages/AlertItemExist';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { getAllActiveGuideClassData } from 'store/actions/masterActions/GuideClassAction';
import {
    getAllActiveVehicleCategoryDataByType,
    getAllActiveVehicleTypeDataByType
} from 'store/actions/masterActions/transportActions/MainTransportCategoriesActions';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllTaxData } from 'store/actions/masterActions/TaxActions/TaxAction';
import { IconEye } from '@tabler/icons';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpenseatLocation from './ExpenseatLocation';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const styles = (theme) => ({
    tableRow: {
        '&$selected, &$selected:hover': {
            backgroundColor: 'purple'
        }
    },
    tableCell: {
        '$selected &': {
            color: 'yellow'
        }
    },
    selected: {}
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

function PaxVehicleRate({ mode, selectedType }) {
    const classes = useStyles();
    const styles = (theme) => ({
        tableRow: {
            '&.Mui-selected, &.Mui-selected:hover': {
                backgroundColor: 'purple',
                '& > .MuiTableCell-root': {
                    color: 'yellow'
                }
            }
        }
    });
    const formikRef = useRef();
    const newobj = {
        transportType: null,
        minCount: '',
        maxCount: '',
        vehicleCategory: null,
        noOfDrivers: '',
        noOfAssistants: '',
        guideClass: null,
        status: true,
        fromDate: '',
        toDate: '',
        currency: null,
        vehicleType: null,
        rateType: null,
        taxCode: null,
        vehicleRate: '',
        vehicleRateWithTax: '',
        driverRate: '',
        driverRateWithTax: '',
        assistantRate: '',
        assistantWithTax: '',
        deatailStatus: true,
        ratesDetails: [
            {
                transportType: null,
                minCount: '',
                maxCount: '',
                vehicleCategory: null,
                noOfDrivers: '',
                noOfAssistants: '',
                guideClass: null,
                status: true,
                tourGuideDetails: [
                    {
                        fromDate: '',
                        toDate: '',
                        currency: null,
                        vehicleType: null,
                        rateType: null,
                        taxCode: null,
                        vehicleRate: '',
                        vehicleRateWithTax: '',
                        driverRate: '',
                        driverRateWithTax: '',
                        assistantRate: '',
                        assistantWithTax: '',
                        deatailStatus: ''
                    }
                ],
                expensesAtLocations: [
                    {
                        location: null,
                        locationDes: '',
                        expenseTypes: null,
                        expenseDes: '',
                        status: true
                    }
                ]
            }
        ]

        // tourGuideDetails: [
        //     {
        //         fromDate: '',
        //         toDate: '',
        //         currency: null,
        //         vehicleType: null,
        //         rateType: null,
        //         taxCode: null,
        //         vehicleRate: '',
        //         vehicleRateWithTax: '',
        //         driverRate: '',
        //         driverRateWithTax: '',
        //         assistantRate: '',
        //         assistantWithTax: '',
        //         deatailStatus: ''
        //     }
        // ]
    };

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [mmObject, setnewobj] = useState(newobj);
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [currencyListOptions, setCurrencyListOptions] = useState([]);
    const [storeTaxdata, setStoreTaxData] = useState([]);
    const [taxDetails, setTaxDetails] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const [taxListOptions, setTaxListOptions] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openExpensesLocation, setOpenExpensesLocation] = useState(false);
    const [existOpenModal, setExistOpenModal] = useState(false);
    const [existOpenModal1, setExistOpenModal1] = useState(false);
    const [openDetailTable, setOpenDetailTable] = useState(false);
    const [vehicleCategoryList, setvehicleCategories] = useState([]);
    const [vehicleTypeList, setvehicleTypes] = useState([]);
    const [detailTableIndex, setDetailTableIndex] = useState(0);
    const [activeGuideClassList, setActiveGuideClassList] = useState([]);
    const [rateType, setRateType] = useState([
        { label: 'Per KM', value: 'Per KM' },
        { label: 'Per Hour', value: 'Per Hour' }
    ]);
    const [expenseLocationDetails, setexpenseLocationDetails] = useState([]);
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [selectedID, setSelectedID] = useState(null);
    const dispatch = useDispatch();

    const error = useSelector((state) => state.seasonReducer.errorMsg);
    const lastModifiedDate = useSelector((state) => state.seasonReducer.lastModifiedDateTime);
    const currencyListData = useSelector((state) => state.expenseTypesReducer.currencyList);
    const roomBuyingRateToUpdate = useSelector((state) => state.roomBuyingRateReducer.roomBuyingRateToUpdate);
    const roomBuyingRate = useSelector((state) => state.roomBuyingRateReducer.roomBuyingRate);
    const duplicateRoomBuyingRate = useSelector((state) => state.roomBuyingRateReducer.duplicateRoomBuyingRate);
    const guideClassActiveList = useSelector((state) => state.guideClassReducer.guideClassActiveList);
    const vehicleCategories = useSelector((state) => state.mainTransportCategoryReducer.vehicleCategories);
    const vehicleTypes = useSelector((state) => state.mainTransportCategoryReducer.vehicleTypes);
    const taxListData = useSelector((state) => state.taxReducer.taxes);
    const [flag, setFlag] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        console.log('roomBuyingRate roomBuyingRate roomBuyingRate');
        if (roomBuyingRate && mode === 'INSERT') {
        } else if (roomBuyingRate && mode === 'VIEW_UPDATE') {
        }
    }, [roomBuyingRate]);

    useEffect(() => {}, [roomBuyingRateToUpdate]);

    const handleModalClose = (status) => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (guideClassActiveList.length != 0) {
            setActiveGuideClassList(guideClassActiveList);
        }
    }, [guideClassActiveList]);

    useEffect(() => {
        if (vehicleCategories.length != 0) {
            setvehicleCategories(vehicleCategories);
        }
    }, [vehicleCategories]);

    useEffect(() => {
        if (vehicleTypes.length != 0) {
            setvehicleTypes(vehicleTypes);
        }
    }, [vehicleTypes]);

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
    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

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
        dispatch(getAllCurrencyListData());
        dispatch(getAllActiveGuideClassData());
        dispatch(getAllActiveVehicleCategoryDataByType('Vehicle Category'));
        dispatch(getAllActiveVehicleTypeDataByType('Vehicle Type'));
        dispatch(getAllTaxData());
    }, []);

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

    const loadRatesBySeason = (value) => {
        console.log(value);
        dispatch(activeRatesSeasonId(value.seasonId));
    };

    const loadOperatorCode = (value) => {
        console.log(value);
        dispatch(getAllActiveOperatorByOperatorGpId(value.marketGroupOperatorGroupId));
    };

    const addRows = async (values, formValues) => {
        console.log(formValues);
        const initialValuesNew = {
            transportType: null,
            minCount: '',
            maxCount: '',
            vehicleCategory: null,
            noOfDrivers: '',
            noOfAssistants: '',
            guideClass: null,
            status: true,
            fromDate: '',
            toDate: '',
            currency: null,
            vehicleType: null,
            rateType: null,
            taxCode: null,
            vehicleRate: '',
            vehicleRateWithTax: '',
            driverRate: '',
            driverRateWithTax: '',
            assistantRate: '',
            assistantWithTax: '',
            deatailStatus: true,
            ratesDetails: []
        };

        // });

        // console.log(initialValuesNew);

        // console.log(mmObject.ratesDetails);
        mmObject.ratesDetails.push({
            transportType: null,
            minCount: values.minCount,
            maxCount: values.maxCount,
            vehicleCategory: values.vehicleCategory,
            noOfDrivers: values.noOfDrivers,
            noOfAssistants: values.noOfAssistants,
            guideClass: values.guideClass,
            status: values.status,
            tourGuideDetails: [
                {
                    fromDate: '',
                    toDate: '',
                    currency: null,
                    vehicleType: null,
                    rateType: null,
                    taxCode: null,
                    vehicleRate: '',
                    vehicleRateWithTax: '',
                    driverRate: '',
                    driverRateWithTax: '',
                    assistantRate: '',
                    assistantWithTax: '',
                    deatailStatus: ''
                }
            ],
            expensesAtLocations: [
                {
                    location: null,
                    locationDes: '',
                    expenseTypes: null,
                    expenseDes: '',
                    status: true
                }
            ]
        });
        mmObject.ratesDetails?.map((s) => {
            console.log(s);
            if (s.minCount !== '') {
                initialValuesNew.ratesDetails.push(s);
            }
        });

        console.log(initialValuesNew);
        setnewobj(initialValuesNew);
    };
    const addDetailsRow = async (values, formValues) => {
        console.log(values);
        console.log(formValues);

        const initialValuesNew = {
            transportType: null,
            minCount: '',
            maxCount: '',
            vehicleCategory: null,
            noOfDrivers: '',
            noOfAssistants: '',
            guideClass: null,
            status: true,
            fromDate: '',
            toDate: '',
            currency: null,
            vehicleType: null,
            rateType: null,
            taxCode: null,
            vehicleRate: '',
            vehicleRateWithTax: '',
            driverRate: '',
            driverRateWithTax: '',
            assistantRate: '',
            assistantWithTax: '',
            deatailStatus: true,
            ratesDetails: [
                {
                    transportType: null,
                    minCount: '',
                    maxCount: '',
                    vehicleCategory: null,
                    noOfDrivers: '',
                    noOfAssistants: '',
                    guideClass: null,
                    status: true,
                    tourGuideDetails: [
                        {
                            fromDate: '',
                            toDate: '',
                            currency: null,
                            vehicleType: null,
                            rateType: null,
                            taxCode: null,
                            vehicleRate: '',
                            vehicleRateWithTax: '',
                            driverRate: '',
                            driverRateWithTax: '',
                            assistantRate: '',
                            assistantWithTax: '',
                            deatailStatus: ''
                        }
                    ]
                }
            ]
            // ratesDetails: [
            //     {
            //         transportType: null,
            //         minCount: values.minCount,
            //         maxCount: values.maxCount,
            //         vehicleCategory: values.vehicleCategory,
            //         noOfDrivers: values.noOfDrivers,
            //         noOfAssistants: values.noOfAssistants,
            //         guideClass: values.guideClass,
            //         status: values.status,
            //         tourGuideDetails: [
            //             {
            //                 fromDate: '',
            //                 toDate: '',
            //                 currency: null,
            //                 vehicleType: null,
            //                 rateType: null,
            //                 taxCode: null,
            //                 vehicleRate: '',
            //                 vehicleRateWithTax: '',
            //                 driverRate: '',
            //                 driverRateWithTax: '',
            //                 assistantRate: '',
            //                 assistantWithTax: '',
            //                 deatailStatus: ''
            //             }
            //         ]
            //     }
            // ]
        };

        initialValuesNew.ratesDetails = formValues.ratesDetails;
        initialValuesNew.ratesDetails[detailTableIndex].tourGuideDetails.push({
            fromDate: values.fromDate,
            toDate: values.toDate,
            currency: values.currency,
            vehicleType: values.vehicleType,
            rateType: values.rateType,
            taxCode: values.taxCode,
            vehicleRate: values.vehicleRate,
            vehicleRateWithTax: values.vehicleRateWithTax,
            driverRate: values.driverRate,
            driverRateWithTax: values.driverRateWithTax,
            assistantRate: values.assistantRate,
            assistantWithTax: values.assistantWithTax,
            deatailStatus: values.deatailStatus
        });

        // mmObject.ratesDetails[detailTableIndex].tourGuideDetails?.map((s) => {
        //     if (s.rateType !== null) {
        //         initialValuesNew.ratesDetails[detailTableIndex].tourGuideDetails.push(s);
        //     }
        // });

        console.log(initialValuesNew);
        // initialValuesNew.tourGuideDetails.push({

        // })
        // mmObject.ratesDetails[detailTableIndex].tourGuideDetails?.map((s) => {
        //     if (s.rateType !== null) {
        //         initialValuesNew.ratesDetails[detailTableIndex].tourGuideDetails.push(s);
        //     }
        // });
        setnewobj(initialValuesNew);
    };

    const handleFinalSubmit = async (values) => {
        console.log(values);
        delete values.hotelCode.createdDate;
        delete values.hotelCode.updatedDate;

        // let data = {
        //     hotelCode: values.hotelCode,
        //     operatorGpCode: values.operatorGpCode,
        //     operatorCode: values.operatorCode,
        //     season: values.season,
        //     ratePeriod: values.ratePeriod
        // };
        // if (values.hotelCode && values.operatorGpCode && values.operatorCode && values.season && values.ratePeriod) {
        //     dispatch(checkDuplicateRoomBuyingRateCode(data));
        // }

        for (let i in values.newOperatorCode) {
            values.operatorCode.push(values.newOperatorCode[i]);
        }

        if (mode === 'INSERT') {
            dispatch(saveRoomBuyingRateData(values));
        } else {
            dispatch(updateRoomBuyingRateData(values));
        }
    };

    function requiredValidation(value) {
        console.log(value);
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }

    useEffect(() => {
        console.log(duplicateRoomBuyingRate);
        // if(duplicateRoomBuyingRate){
        //     if(duplicateRoomBuyingRate.errormessages.length < 0){

        //     }
        // }
    }, [duplicateRoomBuyingRate]);

    const validate = (values) => {
        console.log(values);
    };

    const handleExistModalClose = () => {
        setExistOpenModal(false);
    };
    const handleExistModalClose1 = () => {
        setExistOpenModal1(false);
    };

    const handleexpenseLocationClose = () => {
        setOpenExpensesLocation(false);
    };

    const childToParent = (childData) => {
        console.log(childData);
        console.log(mmObject);
        // if (mmObject.ratesDetails[detailTableIndex].expensesAtLocations[0].location == null) {
        //     delete mmObject.ratesDetails[detailTableIndex].expensesAtLocations[0];
        // }
        childData.expensesAtLocations.map((s) => {
            mmObject.ratesDetails[detailTableIndex].expensesAtLocations.push(s);
        });

        console.log(mmObject);
    };
    return (
        <div>
            <MainCard>
                <div className="row">
                    <Grid container direction="row">
                        <Grid item>
                            <Formik enableReinitialize={true} initialValues={mmObject || newobj} innerRef={formikRef} validate={validate}>
                                {({
                                    values,
                                    handleChange,
                                    setFieldValue,
                                    errors,
                                    handleBlur,
                                    touched,
                                    resetForm,
                                    validateField,
                                    validateForm,
                                    isValid,
                                    dirty,
                                    setFieldTouched,
                                    setTouched,
                                    setErrors
                                }) => {
                                    return (
                                        <Form>
                                            <br />
                                            <div style={{ marginTop: '6px', margin: '10px' }}>
                                                <Grid gap="10px" display="flex">
                                                    <Grid item>
                                                        <Field
                                                            as={TextField}
                                                            label="Min Count"
                                                            sx={{
                                                                width: { xs: 120 },
                                                                '& .MuiInputBase-root': {
                                                                    height: 40
                                                                }
                                                            }}
                                                            disabled={mode == 'VIEW'}
                                                            type="text"
                                                            variant="outlined"
                                                            name="minCount"
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            value={values.minCount}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.minCount && errors.minCount)}
                                                            helperText={touched.minCount && errors.minCount ? errors.minCount : ''}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Field
                                                            as={TextField}
                                                            label="Max Count"
                                                            sx={{
                                                                width: { xs: 120 },
                                                                '& .MuiInputBase-root': {
                                                                    height: 40
                                                                }
                                                            }}
                                                            disabled={mode == 'VIEW'}
                                                            type="text"
                                                            variant="outlined"
                                                            name="maxCount"
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            value={values.maxCount}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.maxCount && errors.maxCount)}
                                                            helperText={touched.maxCount && errors.maxCount ? errors.maxCount : ''}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Field
                                                            as={Autocomplete}
                                                            value={values.vehicleCategory}
                                                            name="vehicleCategory"
                                                            disabled={mode == 'VIEW'}
                                                            onChange={(_, value) => {
                                                                setFieldValue(`vehicleCategory`, value);
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            options={vehicleCategoryList}
                                                            getOptionLabel={(option) => `${option.typeCode}`}
                                                            isOptionEqualToValue={(option, value) => option.categoryId === value.categoryId}
                                                            renderInput={(params) => (
                                                                <Field
                                                                    as={TextField}
                                                                    {...params}
                                                                    label="Vehicle Category Code"
                                                                    sx={{
                                                                        width: { xs: 120 },
                                                                        '& .MuiInputBase-root': {
                                                                            height: 41
                                                                        }
                                                                    }}
                                                                    InputLabelProps={{
                                                                        shrink: true
                                                                    }}
                                                                    validate={requiredValidation}
                                                                    error={Boolean(touched.vehicleCategory && errors.vehicleCategory)}
                                                                    helperText={
                                                                        touched.vehicleCategory && errors.vehicleCategory
                                                                            ? errors.vehicleCategory
                                                                            : ''
                                                                    }
                                                                    variant="outlined"
                                                                    name="vehicleCategory"
                                                                    onBlur={handleBlur}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Field
                                                            as={TextField}
                                                            label="No of Drivers"
                                                            sx={{
                                                                width: { xs: 120 },
                                                                '& .MuiInputBase-root': {
                                                                    height: 40
                                                                }
                                                            }}
                                                            disabled={mode == 'VIEW'}
                                                            type="text"
                                                            variant="outlined"
                                                            name="noOfDrivers"
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            value={values.noOfDrivers}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.noOfDrivers && errors.noOfDrivers)}
                                                            helperText={touched.noOfDrivers && errors.noOfDrivers ? errors.noOfDrivers : ''}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Field
                                                            as={TextField}
                                                            label="No of Asssistants"
                                                            sx={{
                                                                width: { xs: 120 },
                                                                '& .MuiInputBase-root': {
                                                                    height: 40
                                                                }
                                                            }}
                                                            disabled={mode == 'VIEW'}
                                                            type="text"
                                                            variant="outlined"
                                                            name="noOfAssistants"
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            value={values.noOfAssistants}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.noOfAssistants && errors.noOfAssistants)}
                                                            helperText={
                                                                touched.noOfAssistants && errors.noOfAssistants ? errors.noOfAssistants : ''
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Field
                                                            as={Autocomplete}
                                                            value={values.guideClass}
                                                            name="guideClass"
                                                            disabled={mode == 'VIEW'}
                                                            onChange={(_, value) => {
                                                                setFieldValue(`guideClass`, value);
                                                            }}
                                                            InputLabelProps={{
                                                                shrink: true
                                                            }}
                                                            options={activeGuideClassList}
                                                            getOptionLabel={(option) => `${option.guideCode}`}
                                                            isOptionEqualToValue={(option, value) =>
                                                                option.guideClassId === value.guideClassId
                                                            }
                                                            renderInput={(params) => (
                                                                <Field
                                                                    as={TextField}
                                                                    {...params}
                                                                    label="Guide Class"
                                                                    sx={{
                                                                        width: { xs: 120 },
                                                                        '& .MuiInputBase-root': {
                                                                            height: 41
                                                                        }
                                                                    }}
                                                                    InputLabelProps={{
                                                                        shrink: true
                                                                    }}
                                                                    validate={requiredValidation}
                                                                    error={Boolean(touched.guideClass && errors.guideClass)}
                                                                    helperText={
                                                                        touched.guideClass && errors.guideClass ? errors.guideClass : ''
                                                                    }
                                                                    variant="outlined"
                                                                    name="guideClass"
                                                                    onBlur={handleBlur}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>

                                                    <Grid item>
                                                        <FormGroup>
                                                            <Field
                                                                as={FormControlLabel}
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
                                                            type="button"
                                                            onClick={() => {
                                                                addRows(values, formikRef.current.values);
                                                                let id = 0;
                                                            }}
                                                        >
                                                            <AddBoxIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <br />
                                            <FieldArray name="ratesDetails">
                                                {({ insert, remove, push }) => (
                                                    <Paper>
                                                        <TableContainer>
                                                            <Table stickyHeader>
                                                                <TableHead alignItems="center">
                                                                    <TableRow>
                                                                        <TableCell>Min Count</TableCell>
                                                                        <TableCell>Max Count </TableCell>
                                                                        <TableCell>Vehicle Category Code</TableCell>
                                                                        <TableCell>Description</TableCell>
                                                                        <TableCell>No of Drivers</TableCell>
                                                                        <TableCell>No of Assistant</TableCell>
                                                                        <TableCell>Guide Class</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                        <TableCell>Actions</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {/* {tableBodyData ? ( */}
                                                                <TableBody>
                                                                    {values.ratesDetails.map((record, idx) => {
                                                                        // {values.codeAndNameDetails.map((record, idx) => {
                                                                        return (
                                                                            <TableRow
                                                                                key={idx}
                                                                                hover
                                                                                onClick={() => {
                                                                                    setSelectedID(idx);
                                                                                }}
                                                                                classes={{ selected: classes.selected }}
                                                                                className={classes.tableRow}
                                                                            >
                                                                                {/* <TableCell>{idx + 1}</TableCell> */}

                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 55 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`ratesDetails.${idx}.minCount`}
                                                                                        value={
                                                                                            values.ratesDetails[idx] &&
                                                                                            values.ratesDetails[idx].minCount
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.ratesDetails &&
                                                                                                touched.ratesDetails[idx] &&
                                                                                                touched.ratesDetails[idx].minCount &&
                                                                                                errors.ratesDetails &&
                                                                                                errors.ratesDetails[idx] &&
                                                                                                errors.ratesDetails[idx].minCount
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.ratesDetails &&
                                                                                            touched.ratesDetails[idx] &&
                                                                                            touched.ratesDetails[idx].minCount &&
                                                                                            errors.ratesDetails &&
                                                                                            errors.ratesDetails[idx] &&
                                                                                            errors.ratesDetails[idx].minCount
                                                                                                ? errors.ratesDetails[idx].minCount
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 55 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`ratesDetails.${idx}.maxCount`}
                                                                                        value={
                                                                                            values.ratesDetails[idx] &&
                                                                                            values.ratesDetails[idx].maxCount
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.ratesDetails &&
                                                                                                touched.ratesDetails[idx] &&
                                                                                                touched.ratesDetails[idx].maxCount &&
                                                                                                errors.ratesDetails &&
                                                                                                errors.ratesDetails[idx] &&
                                                                                                errors.ratesDetails[idx].maxCount
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.ratesDetails &&
                                                                                            touched.ratesDetails[idx] &&
                                                                                            touched.ratesDetails[idx].maxCount &&
                                                                                            errors.ratesDetails &&
                                                                                            errors.ratesDetails[idx] &&
                                                                                            errors.ratesDetails[idx].maxCount
                                                                                                ? errors.ratesDetails[idx].maxCount
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Autocomplete
                                                                                        disabled
                                                                                        value={
                                                                                            values.ratesDetails[idx]
                                                                                                ? values.ratesDetails[idx].vehicleCategory
                                                                                                : null
                                                                                        }
                                                                                        name={`ratesDetails.${idx}.vehicleCategory`}
                                                                                        onChange={(_, value) => {
                                                                                            console.log(value);
                                                                                            setFieldValue(
                                                                                                `ratesDetails.${idx}.vehicleCategory`,
                                                                                                value
                                                                                            );
                                                                                        }}
                                                                                        options={vehicleCategoryList}
                                                                                        getOptionLabel={(option) => `${option.typeCode}`}
                                                                                        isOptionEqualToValue={(option, value) =>
                                                                                            option.categoryId === value.categoryId
                                                                                        }
                                                                                        renderInput={(params) => (
                                                                                            <TextField
                                                                                                {...params}
                                                                                                // label="tax"

                                                                                                sx={{
                                                                                                    width: { sm: 100 },
                                                                                                    '& .MuiInputBase-root': {
                                                                                                        height: 40
                                                                                                    }
                                                                                                }}
                                                                                                variant="outlined"
                                                                                                name={`ratesDetails.${idx}.vehicleCategory`}
                                                                                                onBlur={handleBlur}
                                                                                                helperText={
                                                                                                    touched.ratesDetails &&
                                                                                                    touched.ratesDetails[idx] &&
                                                                                                    touched.ratesDetails[idx]
                                                                                                        .vehicleCategory &&
                                                                                                    errors.ratesDetails &&
                                                                                                    errors.ratesDetails[idx] &&
                                                                                                    errors.ratesDetails[idx].vehicleCategory
                                                                                                        ? errors.ratesDetails[idx]
                                                                                                              .vehicleCategory
                                                                                                        : ''
                                                                                                }
                                                                                                error={Boolean(
                                                                                                    touched.ratesDetails &&
                                                                                                        touched.ratesDetails[idx] &&
                                                                                                        touched.ratesDetails[idx]
                                                                                                            .vehicleCategory &&
                                                                                                        errors.ratesDetails &&
                                                                                                        errors.ratesDetails[idx] &&
                                                                                                        errors.ratesDetails[idx]
                                                                                                            .vehicleCategory
                                                                                                )}
                                                                                            />
                                                                                        )}
                                                                                    />
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 170 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"

                                                                                        name={`ratesDetails.${idx}.description`}
                                                                                        value={
                                                                                            values.ratesDetails[idx] &&
                                                                                            values.ratesDetails[idx].vehicleCategory
                                                                                                ?.description
                                                                                        }
                                                                                        disabled
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 55 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`ratesDetails.${idx}.singleRate`}
                                                                                        value={
                                                                                            values.ratesDetails[idx] &&
                                                                                            values.ratesDetails[idx].noOfDrivers
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.ratesDetails &&
                                                                                                touched.ratesDetails[idx] &&
                                                                                                touched.ratesDetails[idx].noOfDrivers &&
                                                                                                errors.ratesDetails &&
                                                                                                errors.ratesDetails[idx] &&
                                                                                                errors.ratesDetails[idx].noOfDrivers
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.ratesDetails &&
                                                                                            touched.ratesDetails[idx] &&
                                                                                            touched.ratesDetails[idx].noOfDrivers &&
                                                                                            errors.ratesDetails &&
                                                                                            errors.ratesDetails[idx] &&
                                                                                            errors.ratesDetails[idx].noOfDrivers
                                                                                                ? errors.ratesDetails[idx].noOfDrivers
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <TextField
                                                                                        sx={{
                                                                                            width: { xs: 55 },
                                                                                            '& .MuiInputBase-root': {
                                                                                                height: 40
                                                                                            }
                                                                                        }}
                                                                                        //   type="number"
                                                                                        variant="outlined"
                                                                                        // placeholder="name"
                                                                                        name={`ratesDetails.${idx}.noOfAssistants`}
                                                                                        value={
                                                                                            values.ratesDetails[idx] &&
                                                                                            values.ratesDetails[idx].noOfAssistants
                                                                                        }
                                                                                        disabled
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        error={Boolean(
                                                                                            touched.ratesDetails &&
                                                                                                touched.ratesDetails[idx] &&
                                                                                                touched.ratesDetails[idx].noOfAssistants &&
                                                                                                errors.ratesDetails &&
                                                                                                errors.ratesDetails[idx] &&
                                                                                                errors.ratesDetails[idx].noOfAssistants
                                                                                        )}
                                                                                        helperText={
                                                                                            touched.ratesDetails &&
                                                                                            touched.ratesDetails[idx] &&
                                                                                            touched.ratesDetails[idx].noOfAssistants &&
                                                                                            errors.ratesDetails &&
                                                                                            errors.ratesDetails[idx] &&
                                                                                            errors.ratesDetails[idx].noOfAssistants
                                                                                                ? errors.ratesDetails[idx].noOfAssistants
                                                                                                : ''
                                                                                        }
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <Autocomplete
                                                                                        disabled
                                                                                        value={
                                                                                            values.ratesDetails[idx]
                                                                                                ? values.ratesDetails[idx].guideClass
                                                                                                : null
                                                                                        }
                                                                                        name={`ratesDetails.${idx}.guideClass`}
                                                                                        onChange={(_, value) => {
                                                                                            console.log(value);
                                                                                            setFieldValue(
                                                                                                `ratesDetails.${idx}.guideClass`,
                                                                                                value
                                                                                            );
                                                                                        }}
                                                                                        options={activeGuideClassList}
                                                                                        getOptionLabel={(option) => `${option.guideCode}`}
                                                                                        isOptionEqualToValue={(option, value) =>
                                                                                            option.guideClassId === value.guideClassId
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
                                                                                                variant="outlined"
                                                                                                name={`ratesDetails.${idx}.guideClass`}
                                                                                                onBlur={handleBlur}
                                                                                                helperText={
                                                                                                    touched.ratesDetails &&
                                                                                                    touched.ratesDetails[idx] &&
                                                                                                    touched.ratesDetails[idx].guideClass &&
                                                                                                    errors.ratesDetails &&
                                                                                                    errors.ratesDetails[idx] &&
                                                                                                    errors.ratesDetails[idx].guideClass
                                                                                                        ? errors.ratesDetails[idx]
                                                                                                              .guideClass
                                                                                                        : ''
                                                                                                }
                                                                                                error={Boolean(
                                                                                                    touched.ratesDetails &&
                                                                                                        touched.ratesDetails[idx] &&
                                                                                                        touched.ratesDetails[idx]
                                                                                                            .guideClass &&
                                                                                                        errors.ratesDetails &&
                                                                                                        errors.ratesDetails[idx] &&
                                                                                                        errors.ratesDetails[idx].guideClass
                                                                                                )}
                                                                                            />
                                                                                        )}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <FormGroup>
                                                                                        <FormControlLabel
                                                                                            name={`ratesDetails.${idx}.status`}
                                                                                            onChange={handleChange}
                                                                                            value={
                                                                                                values.ratesDetails[idx] &&
                                                                                                values.ratesDetails[idx].status
                                                                                            }
                                                                                            control={<Switch color="success" />}
                                                                                            // label="Status"
                                                                                            checked={values.ratesDetails[idx].status}
                                                                                            disabled
                                                                                            // disabled={mode == 'VIEW'}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </TableCell>

                                                                                <TableCell>
                                                                                    <IconButton
                                                                                        disabled={mode == 'VIEW'}
                                                                                        disa
                                                                                        aria-label="delete"
                                                                                        onClick={() => {
                                                                                            console.log('here');
                                                                                            console.log(values);
                                                                                            setTaxDetails(values);
                                                                                            // setOpenTaxDetails(true);

                                                                                            // remove(idx);
                                                                                        }}
                                                                                    >
                                                                                        <ArticleIcon />
                                                                                    </IconButton>
                                                                                    <IconButton
                                                                                        disabled={mode == 'VIEW'}
                                                                                        disa
                                                                                        aria-label="delete"
                                                                                        color={
                                                                                            flag && selectedID === idx
                                                                                                ? 'primary'
                                                                                                : 'secondary'
                                                                                        }
                                                                                        onClick={() => {
                                                                                            console.log('here');
                                                                                            console.log(idx);
                                                                                            console.log(values.ratesDetails[idx]);
                                                                                            setFlag(true);
                                                                                            setDetailTableIndex(idx);
                                                                                            setOpenDetailTable(true);
                                                                                            setFlag(!flag);
                                                                                        }}
                                                                                    >
                                                                                        <IconEye />
                                                                                    </IconButton>
                                                                                    <IconButton
                                                                                        disabled={mode == 'VIEW'}
                                                                                        disa
                                                                                        aria-label="delete"
                                                                                        onClick={() => {
                                                                                            console.log('here');
                                                                                            console.log(idx);
                                                                                            setexpenseLocationDetails(
                                                                                                mmObject.ratesDetails[idx]
                                                                                                    .expensesAtLocations
                                                                                            );
                                                                                            setDetailTableIndex(idx);
                                                                                            setOpenExpensesLocation(true);
                                                                                            // remove(idx);
                                                                                        }}
                                                                                    >
                                                                                        <LocationOnIcon />
                                                                                    </IconButton>
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
                                                                    {/* <TableRow>
                                                                        <TablePagination
                                                                            rowsPerPageOptions={[
                                                                                5, 10, 25
                                                                                // { label: 'All', value: -1 }
                                                                            ]}
                                                                            count={values.ratesDetails.length}
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
                                                                    </TableRow> */}
                                                                </TableFooter>
                                                                {/* ) : null} */}
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                )}
                                            </FieldArray>
                                            <br />
                                            {detailTableIndex > -1 && openDetailTable ? (
                                                <div style={{ backgroundColor: '#D4F1F4' }}>
                                                    <Grid gap="10px" display="flex">
                                                        <Grid item>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                                // adapterLocale={locale}
                                                            >
                                                                <DatePicker
                                                                    disabled={mode != 'INSERT'}
                                                                    onChange={(value) => {
                                                                        setFieldValue(`fromDate`, value);
                                                                    }}
                                                                    inputFormat="DD/MM/YYYY"
                                                                    value={values.fromDate}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            sx={{
                                                                                width: { xs: 150 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 41
                                                                                }
                                                                            }}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            label="From Date"
                                                                            variant="outlined"
                                                                            name="fromDate"
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.fromDate && errors.fromDate)}
                                                                            helperText={
                                                                                touched.fromDate && errors.fromDate ? errors.fromDate : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item>
                                                            <LocalizationProvider
                                                                dateAdapter={AdapterDayjs}
                                                                // adapterLocale={locale}
                                                            >
                                                                <DatePicker
                                                                    disabled={mode != 'INSERT'}
                                                                    onChange={(value) => {
                                                                        setFieldValue(`toDate`, value);
                                                                    }}
                                                                    inputFormat="DD/MM/YYYY"
                                                                    value={values.toDate}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            sx={{
                                                                                width: { xs: 150 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 41
                                                                                }
                                                                            }}
                                                                            InputLabelProps={{
                                                                                shrink: true
                                                                            }}
                                                                            label="To Date"
                                                                            variant="outlined"
                                                                            name="toDate"
                                                                            value={values.toDate}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.toDate && errors.toDate)}
                                                                            helperText={
                                                                                touched.toDate && errors.toDate ? errors.toDate : ''
                                                                            }
                                                                        />
                                                                    )}
                                                                />
                                                            </LocalizationProvider>
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={Autocomplete}
                                                                value={values.currency}
                                                                name="currency"
                                                                onChange={(_, value) => {
                                                                    console.log(value);
                                                                    setFieldValue(`currency`, value);
                                                                }}
                                                                disabled={mode == 'VIEW' || mode == 'VIEW_UPDATE'}
                                                                options={currencyListOptions}
                                                                getOptionLabel={(option) => `${option.currencyCode}`}
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.currencyListId === value.currencyListId
                                                                }
                                                                renderInput={(params) => (
                                                                    <Field
                                                                        as={TextField}
                                                                        {...params}
                                                                        // label="tax"
                                                                        sx={{
                                                                            width: { xs: 150 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        label="Currency"
                                                                        variant="outlined"
                                                                        validate={requiredValidation}
                                                                        name="currency"
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.currency && errors.currency)}
                                                                        helperText={
                                                                            touched.currency && errors.currency ? errors.currency : ''
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={Autocomplete}
                                                                value={values.vehicleType}
                                                                name="vehicleType"
                                                                onChange={(_, value) => {
                                                                    console.log(value);
                                                                    setFieldValue(`vehicleType`, value);
                                                                }}
                                                                disabled={mode == 'VIEW' || mode == 'VIEW_UPDATE'}
                                                                options={vehicleTypeList}
                                                                getOptionLabel={(option) => `${option.typeCode}`}
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.categoryId === value.categoryId
                                                                }
                                                                renderInput={(params) => (
                                                                    <Field
                                                                        as={TextField}
                                                                        {...params}
                                                                        // label="tax"
                                                                        sx={{
                                                                            width: { xs: 150 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 40
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        label="Vehicle Type"
                                                                        variant="outlined"
                                                                        validate={requiredValidation}
                                                                        name="vehicleType"
                                                                        onBlur={handleBlur}
                                                                        error={Boolean(touched.vehicleType && errors.vehicleType)}
                                                                        helperText={
                                                                            touched.vehicleType && errors.vehicleType
                                                                                ? errors.vehicleType
                                                                                : ''
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={Autocomplete}
                                                                value={values.rateType}
                                                                name="rateType"
                                                                disabled={mode == 'VIEW'}
                                                                onChange={(_, value) => {
                                                                    setFieldValue(`rateType`, value);
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                options={rateType}
                                                                getOptionLabel={(option) => `${option.label}`}
                                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                                renderInput={(params) => (
                                                                    <Field
                                                                        as={TextField}
                                                                        {...params}
                                                                        label="Rate Type"
                                                                        sx={{
                                                                            width: { xs: 150 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 41
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        validate={requiredValidation}
                                                                        error={Boolean(touched.rateType && errors.rateType)}
                                                                        helperText={
                                                                            touched.rateType && errors.rateType ? errors.rateType : ''
                                                                        }
                                                                        variant="outlined"
                                                                        name="rateType"
                                                                        onBlur={handleBlur}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={Autocomplete}
                                                                value={values.guideBasis}
                                                                name="taxCode"
                                                                disabled={mode == 'VIEW'}
                                                                onChange={(_, value) => {
                                                                    setFieldValue(`taxCode`, value);
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                options={rateType}
                                                                getOptionLabel={(option) => `${option.label}`}
                                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                                                renderInput={(params) => (
                                                                    <Field
                                                                        as={TextField}
                                                                        {...params}
                                                                        label="Tax Code"
                                                                        sx={{
                                                                            width: { xs: 250 },
                                                                            '& .MuiInputBase-root': {
                                                                                height: 41
                                                                            }
                                                                        }}
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        validate={requiredValidation}
                                                                        error={Boolean(touched.taxCode && errors.taxCode)}
                                                                        helperText={touched.taxCode && errors.taxCode ? errors.taxCode : ''}
                                                                        variant="outlined"
                                                                        name="taxCode"
                                                                        onBlur={handleBlur}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>

                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Vehicle Rate"
                                                                sx={{
                                                                    width: { xs: 100 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="vehicleRate"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.vehicleRate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.vehicleRate && errors.vehicleRate)}
                                                                helperText={
                                                                    touched.vehicleRate && errors.vehicleRate ? errors.vehicleRate : ''
                                                                }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid gap="10px" style={{ marginTop: '15px' }} display="flex">
                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Vehicle Rate with Tax"
                                                                sx={{
                                                                    width: { xs: 100 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="vehicleRateWithTax"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.vehicleRateWithTax}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.vehicleRateWithTax && errors.vehicleRateWithTax)}
                                                                helperText={
                                                                    touched.vehicleRateWithTax && errors.vehicleRateWithTax
                                                                        ? errors.vehicleRateWithTax
                                                                        : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Driver Rate"
                                                                sx={{
                                                                    width: { xs: 250 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="driverRate"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.driverRate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.driverRate && errors.driverRate)}
                                                                helperText={
                                                                    touched.driverRate && errors.driverRate ? errors.driverRate : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Driver Rate with Tax"
                                                                sx={{
                                                                    width: { xs: 250 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="driverRateWithTax"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.driverRateWithTax}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.driverRateWithTax && errors.driverRateWithTax)}
                                                                helperText={
                                                                    touched.driverRateWithTax && errors.driverRateWithTax
                                                                        ? errors.driverRateWithTax
                                                                        : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Assistant Rate"
                                                                sx={{
                                                                    width: { xs: 250 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="assistantRate"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.assistantRate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.assistantRate && errors.assistantRate)}
                                                                helperText={
                                                                    touched.assistantRate && errors.assistantRate
                                                                        ? errors.assistantRate
                                                                        : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                as={TextField}
                                                                label="Assistant Rate with Tax"
                                                                sx={{
                                                                    width: { xs: 250 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                type="text"
                                                                variant="outlined"
                                                                name="assistantWithTax"
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                value={values.assistantWithTax}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(touched.assistantWithTax && errors.assistantWithTax)}
                                                                helperText={
                                                                    touched.assistantWithTax && errors.assistantWithTax
                                                                        ? errors.assistantWithTax
                                                                        : ''
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <FormGroup>
                                                                <Field
                                                                    as={FormControlLabel}
                                                                    name="deatailStatus"
                                                                    onChange={handleChange}
                                                                    value={values.deatailStatus}
                                                                    control={<Switch color="success" />}
                                                                    label="Status"
                                                                    checked={values.deatailStatus}
                                                                    // disabled={mode == 'VIEW'}
                                                                />
                                                            </FormGroup>
                                                        </Grid>
                                                        <Grid item>
                                                            <IconButton
                                                                aria-label="delete"
                                                                type="button"
                                                                onClick={() => {
                                                                    addDetailsRow(values, formikRef.current.values);
                                                                }}
                                                            >
                                                                <AddBoxIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                    <FieldArray name={`tourGuideDetails`}>
                                                        {({ insert, remove, push }) => (
                                                            <Paper>
                                                                <TableContainer style={{ width: 1230 }}>
                                                                    <Table stickyHeader className={classes.table}>
                                                                        <TableHead alignItems="center">
                                                                            <TableRow>
                                                                                {/* <TableCell>Sequence</TableCell> */}

                                                                                <TableCell>From Date </TableCell>
                                                                                <TableCell>To Date</TableCell>
                                                                                <TableCell>Currency</TableCell>
                                                                                <TableCell>vehicle Type</TableCell>
                                                                                <TableCell>Rate Type</TableCell>
                                                                                <TableCell>Tax Code</TableCell>
                                                                                <TableCell>Vehicle Rate</TableCell>
                                                                                <TableCell>Vehicle Rate with Tax</TableCell>
                                                                                <TableCell>Driver Rate</TableCell>
                                                                                <TableCell>Driver Rate with Tax</TableCell>
                                                                                <TableCell>Assistant Rate</TableCell>
                                                                                <TableCell>Assistant Rate with Tax</TableCell>
                                                                                <TableCell>Status</TableCell>
                                                                                <TableCell>Action</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        {/* {tableBodyData ? ( */}
                                                                        <TableBody>
                                                                            {values.ratesDetails[detailTableIndex].tourGuideDetails.map(
                                                                                (record, index) => {
                                                                                    // {values.codeAndNameDetails.map((record, idx) => {
                                                                                    return (
                                                                                        <TableRow key={index} hover>
                                                                                            {/* <TableCell>{idx + 1}</TableCell> */}

                                                                                            <TableCell>
                                                                                                <LocalizationProvider
                                                                                                    dateAdapter={AdapterDayjs}
                                                                                                    // adapterLocale={locale}
                                                                                                >
                                                                                                    <DatePicker
                                                                                                        disabled
                                                                                                        onChange={(value) => {
                                                                                                            console.log(value);
                                                                                                            console.log(ref.current);
                                                                                                            setFieldValue(
                                                                                                                `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.fromDate`,
                                                                                                                value
                                                                                                            );
                                                                                                        }}
                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                        value={
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index]
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
                                                                                                                name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.fromDate`}
                                                                                                                onBlur={handleBlur}
                                                                                                                error={false}
                                                                                                            />
                                                                                                        )}
                                                                                                    />
                                                                                                </LocalizationProvider>
                                                                                            </TableCell>

                                                                                            <TableCell>
                                                                                                <LocalizationProvider
                                                                                                    dateAdapter={AdapterDayjs}
                                                                                                    // adapterLocale={locale}
                                                                                                >
                                                                                                    <DatePicker
                                                                                                        disabled
                                                                                                        onChange={(value) => {
                                                                                                            console.log(value);
                                                                                                            console.log(ref.current);
                                                                                                            setFieldValue(
                                                                                                                `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.toDate`,
                                                                                                                value
                                                                                                            );
                                                                                                        }}
                                                                                                        inputFormat="DD/MM/YYYY"
                                                                                                        value={
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index].toDate
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
                                                                                                                name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.toDate`}
                                                                                                                onBlur={handleBlur}
                                                                                                                error={false}
                                                                                                            />
                                                                                                        )}
                                                                                                    />
                                                                                                </LocalizationProvider>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    disabled
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index].currency
                                                                                                    }
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.currency`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.currency`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={currencyListOptions}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.currencyCode}`
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
                                                                                                            variant="outlined"
                                                                                                            name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.currency`}
                                                                                                            onBlur={handleBlur}
                                                                                                            error={false}
                                                                                                        />
                                                                                                    )}
                                                                                                />
                                                                                            </TableCell>

                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    disabled
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .vehicleType
                                                                                                    }
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.vehicleType`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.vehicleType`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={vehicleTypeList}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.typeCode}`
                                                                                                    }
                                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                                        option.categoryId ===
                                                                                                        value.categoryId
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
                                                                                                            variant="outlined"
                                                                                                            name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.vehicleType`}
                                                                                                            onBlur={handleBlur}
                                                                                                            error={false}
                                                                                                        />
                                                                                                    )}
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    disabled
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index].rateType
                                                                                                    }
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.rateType`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.rateType`,
                                                                                                            value
                                                                                                        );
                                                                                                    }}
                                                                                                    options={rateType}
                                                                                                    getOptionLabel={(option) =>
                                                                                                        `${option.label}`
                                                                                                    }
                                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                                        option.value === value.value
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
                                                                                                            variant="outlined"
                                                                                                            name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.rateType`}
                                                                                                            onBlur={handleBlur}
                                                                                                            error={false}
                                                                                                        />
                                                                                                    )}
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Autocomplete
                                                                                                    disabled
                                                                                                    // value={
                                                                                                    //     values.tourLeadRate[idx]
                                                                                                    //         ? values.tourLeadRate[idx].taxCode
                                                                                                    //         : null
                                                                                                    // }
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.taxCode`}
                                                                                                    onChange={(_, value) => {
                                                                                                        console.log(value);
                                                                                                        setFieldValue(
                                                                                                            `ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.taxCode`,
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
                                                                                                            variant="outlined"
                                                                                                            name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.taxCode`}
                                                                                                            onBlur={handleBlur}
                                                                                                            error={false}
                                                                                                        />
                                                                                                    )}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.vehicleRate`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .vehicleRate
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.vehicleRateWithTax`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .vehicleRateWithTax
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.driverRate`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index].driverRate
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.driverRateWithTax`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .driverRateWithTax
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.assistantRate`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .assistantRate
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
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
                                                                                                    name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.assistantWithTax`}
                                                                                                    value={
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index] &&
                                                                                                        values.ratesDetails[
                                                                                                            detailTableIndex
                                                                                                        ].tourGuideDetails[index]
                                                                                                            .assistantWithTax
                                                                                                    }
                                                                                                    disabled
                                                                                                    onChange={handleChange}
                                                                                                    onBlur={handleBlur}
                                                                                                    error={false}
                                                                                                />
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <FormGroup>
                                                                                                    <FormControlLabel
                                                                                                        name={`ratesDetails.${detailTableIndex}.tourGuideDetails.${index}.deatailStatus`}
                                                                                                        onChange={handleChange}
                                                                                                        value={
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index] &&
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index]
                                                                                                                .deatailStatus
                                                                                                        }
                                                                                                        control={<Switch color="success" />}
                                                                                                        // label="Status"
                                                                                                        checked={
                                                                                                            values.ratesDetails[
                                                                                                                detailTableIndex
                                                                                                            ].tourGuideDetails[index]
                                                                                                                .deatailStatus
                                                                                                        }
                                                                                                        disabled
                                                                                                        // disabled={mode == 'VIEW'}
                                                                                                    />
                                                                                                </FormGroup>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <IconButton
                                                                                                    disabled={
                                                                                                        mode == 'VIEW_UPDATE' ||
                                                                                                        mode == 'VIEW'
                                                                                                    }
                                                                                                    disa
                                                                                                    aria-label="delete"
                                                                                                    onClick={() => {
                                                                                                        remove(idx);
                                                                                                    }}
                                                                                                >
                                                                                                    <HighlightOffIcon />
                                                                                                </IconButton>
                                                                                                <IconButton
                                                                                                    disabled={mode == 'VIEW'}
                                                                                                    disa
                                                                                                    aria-label="delete"
                                                                                                    onClick={() => {
                                                                                                        console.log('here');
                                                                                                        console.log(values);
                                                                                                        setTaxDetails(values);

                                                                                                        // remove(idx);
                                                                                                    }}
                                                                                                >
                                                                                                    <ArticleIcon />
                                                                                                </IconButton>
                                                                                                <IconButton
                                                                                                    disabled={mode == 'VIEW'}
                                                                                                    aria-label="delete"
                                                                                                    onClick={() => {
                                                                                                        console.log('here');
                                                                                                        console.log(values);

                                                                                                        // remove(idx);
                                                                                                    }}
                                                                                                >
                                                                                                    <ArticleIcon />
                                                                                                </IconButton>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    );
                                                                                }
                                                                            )}
                                                                            {/* {emptyRows > 0 && (
                                                                    <TableRow style={{ height: 53 * emptyRows }}>
                                                                        <TableCell colSpan={6} />
                                                                    </TableRow>
                                                                )} */}
                                                                        </TableBody>
                                                                        <TableFooter>
                                                                            {/* <TableRow>
                                                                                <TablePagination
                                                                                    rowsPerPageOptions={[
                                                                                        5, 10, 25
                                                                                        // { label: 'All', value: -1 }
                                                                                    ]}
                                                                                    count={values.tourGuideDetails.length}
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
                                                                            </TableRow> */}
                                                                        </TableFooter>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Paper>
                                                        )}
                                                    </FieldArray>{' '}
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {/* add code */}
                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                {mode != 'VIEW' ? (
                                                    <Button
                                                        className="btnSave"
                                                        variant="contained"
                                                        // type="button"
                                                        // onClick={() => {
                                                        //     setTouched({
                                                        //         hotelCode: true,
                                                        //         hotelName: true,
                                                        //         operatorGpCode: true,
                                                        //         operatorCode: true,
                                                        //         season: true,
                                                        //         ratePeriod: true
                                                        //     }).then(() => {});
                                                        // }}
                                                        type="button"
                                                        onClick={() => {
                                                            console.log(formikRef);
                                                            // handleFinalSubmit(values);
                                                            //

                                                            setTouched({
                                                                operatorGpCode: true,
                                                                season: true,
                                                                ratePeriod: true,
                                                                currency: true
                                                            }).then(() => {
                                                                console.log(formikRef);
                                                                console.log(formikRef.current.errors);
                                                                if (
                                                                    formikRef.current.errors.operatorGpCode == undefined &&
                                                                    formikRef.current.errors.season == undefined &&
                                                                    (formikRef.current.errors.ratePeriod == undefined) &
                                                                        (formikRef.current.errors.currency == undefined)
                                                                ) {
                                                                    handleFinalSubmit(values);
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                    </Button>
                                                ) : (
                                                    ''
                                                )}
                                            </Box>
                                            {/* ) : null} */}
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Grid>

                        {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                        {openModal ? <ExitAlert title="dev" open={openModal} handleClose={handleModalClose} /> : null}
                        {existOpenModal ? (
                            <AlertItemExist
                                title="Room Category and Basis should be unique"
                                open={existOpenModal}
                                handleClose={handleExistModalClose}
                            />
                        ) : null}
                        {existOpenModal1 ? (
                            <AlertItemExist title="Basis should be unique" open={existOpenModal1} handleClose={handleExistModalClose1} />
                        ) : null}
                        {openExpensesLocation ? (
                            <ExpenseatLocation
                                open={openExpensesLocation}
                                handleClose={handleexpenseLocationClose}
                                mode={mode}
                                childToParent={childToParent}
                                expenseLocationDetails={expenseLocationDetails}
                            />
                        ) : null}
                    </Grid>
                </div>
            </MainCard>
        </div>
    );
}

export default PaxVehicleRate;
