import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField, Stack, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllCurrencyListData } from 'store/actions/masterActions/ExpenseTypeAction';
import { getActiveTourTypes } from 'store/actions/masterActions/TourTypeAction';
import { getActiveTourCategoryData } from 'store/actions/masterActions/TourCategoryActions';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';
import { activeSeasonsData } from 'store/actions/masterActions/SeasonAction';

const ProgramHeader = () => {
    const initialValues = {
        programmeNo: null,
        version: '',
        reference: null,
        programmeName: '',
        tourType: null,
        TourTypeDto: '',
        tourCategory: null,
        market: null,
        operator: null,
        profitType: '',
        startDate: '',
        endDate: ''
    };
    const dispatch = useDispatch();

    const [activeLocationList, setActiveLocationList] = useState([]);
    const [activeSeasonList, setactiveSeasonList] = useState([]);
    const [currencyListOptions, setCurrencyListOptions] = useState([]);
    const [activeTourTypeList, setActiveTourTypeList] = useState([]);
    const [activeTourCategpryList, setActiveTourcategoeryList] = useState([]);
    const [marketListOptions, setMarketListOptions] = useState([]);

    //data from reducers
    const currencyListData = useSelector((state) => state.expenseTypesReducer.currencyList);
    const activeSeasonData = useSelector((state) => state.seasonReducer.activeSeasons);
    const activeTourTypeListData = useSelector((state) => state.tourTypeDataReducer.activeTourTypeList);
    const activeTourCategoriesListData = useSelector((state) => state.tourCategoryReducer.activeTourCategories);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);

    const handleSubmit = async (values) => {
        console.log(values);
    };

    useEffect(() => {
        if (currencyListData != null) {
            setCurrencyListOptions(currencyListData);
        }
    }, [currencyListData]);

    useEffect(() => {
        if (activeSeasonData.length != 0) {
            setactiveSeasonList(activeSeasonData);
        }
    }, [activeSeasonData]);

    useEffect(() => {
        console.log(activeTourTypeListData);
        if (activeTourTypeListData.length != 0) {
            setActiveTourTypeList(activeTourTypeListData);
        }
    }, [activeTourTypeListData]);

    useEffect(() => {
        if (marketListData.length != 0) {
            setMarketListOptions(marketListData);
        }
    }, [marketListData]);

    useEffect(() => {
        if (activeTourCategoriesListData.length != 0) {
            setActiveTourcategoeryList(activeTourCategoriesListData);
        }
    }, [activeTourCategoriesListData]);

    useEffect(() => {
        dispatch(getAllCurrencyListData());
        dispatch(activeSeasonsData());
        dispatch(getActiveTourTypes());
        dispatch(getActiveTourCategoryData());
        dispatch(getAllActiveMarketData());
    }, []);

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm('');
                }}
                // validationSchema={validationSchema1}
            >
                {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                    return (
                        <Form>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    label="Programme No"
                                    fullWidth
                                    name="programmeNo"
                                    value={values.programmeNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.programmeNo && errors.programmeNo)}
                                    helperText={touched.programmeNo && errors.programmeNo ? errors.programmeNo : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    name="version"
                                    label="Version"
                                    fullWidth
                                    value={values.version}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.version && errors.version)}
                                    helperText={touched.version && errors.version ? errors.version : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    label="Programme Name"
                                    fullWidth
                                    name="programmeName"
                                    value={values.programmeName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.programmeName && errors.programmeName)}
                                    helperText={touched.programmeName && errors.programmeName ? errors.programmeName : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    name="reference"
                                    label="Reference"
                                    fullWidth
                                    value={values.reference}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.reference && errors.reference)}
                                    helperText={touched.reference && errors.reference ? errors.reference : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.location}
                                    name="tourType"
                                    onChange={(_, value) => {
                                        setFieldValue(`tourType`, value);
                                    }}
                                    fullWidth
                                    options={activeTourTypeList}
                                    getOptionLabel={(option) => `${option.code}`}
                                    isOptionEqualToValue={(option, value) => option.tourTypeId === value.tourTypeId}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Type"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="tourType"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.tourType && errors.tourType)}
                                            helperText={touched.tourType && errors.tourType ? errors.tourType : ''}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    value={values.tourCategory}
                                    name="tourCategory"
                                    onChange={(_, value) => {
                                        setFieldValue(`tourCategory`, value);
                                    }}
                                    fullWidth
                                    options={activeTourCategpryList}
                                    getOptionLabel={(option) => `${option.tourCategoryCode}`}
                                    isOptionEqualToValue={(option, value) => option.tourCategoryId === value.tourCategoryId}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Category"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="tourCategory"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.tourCategory && errors.tourCategory)}
                                            helperText={touched.tourCategory && errors.tourCategory ? errors.tourCategory : ''}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.market}
                                    name="market"
                                    onChange={(_, value) => {
                                        setFieldValue(`market`, value);
                                    }}
                                    fullWidth
                                    options={marketListOptions}
                                    getOptionLabel={(option) => `${option.code} - (${option.name})`}
                                    isOptionEqualToValue={(option, value) => option.marketId === value.marketId}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Market"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="market"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.market && errors.market)}
                                            helperText={touched.market && errors.market ? errors.market : ''}
                                        />
                                    )}
                                />
                                <TextField
                                    fullWidth
                                    select
                                    name="profitType"
                                    label="Profit Type"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    value={values.profitType}
                                    error={Boolean(touched.profitType && errors.profitType)}
                                    helperText={touched.profitType && errors.profitType ? errors.profitType : ''}
                                    // MenuProps={{
                                    //   PaperProps: { sx: { maxHeight: 120 } },
                                    // }}
                                >
                                    <MenuItem dense={true} value={'percentage'}>
                                        percentage
                                    </MenuItem>
                                    <MenuItem dense={true} value={'fixed'}>
                                        fixed
                                    </MenuItem>
                                    <MenuItem dense={true} value={'contracted'}>
                                        contracted
                                    </MenuItem>
                                    <MenuItem dense={true} value={'none'}>
                                        none
                                    </MenuItem>
                                </TextField>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.location}
                                    name="season"
                                    onChange={(_, value) => {
                                        setFieldValue(`season`, value);
                                    }}
                                    fullWidth
                                    options={activeSeasonList}
                                    getOptionLabel={(option) => `${option.mainSeason}`}
                                    isOptionEqualToValue={(option, value) => option.seasonId === value.seasonId}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Season"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="location"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.season && errors.season)}
                                            helperText={touched.season && errors.season ? errors.season : ''}
                                        />
                                    )}
                                />
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    // adapterLocale={locale}
                                >
                                    <DatePicker
                                        onChange={(value) => {
                                            setFieldValue(`startDate`, value);
                                        }}
                                        fullWidth
                                        inputFormat="DD/MM/YYYY"
                                        value={values.startDate}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        height: 41
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                label="Start Date"
                                                variant="outlined"
                                                name="startDate"
                                                onBlur={handleBlur}
                                                error={Boolean(touched.startDate && errors.startDate)}
                                                helperText={touched.startDate && errors.startDate ? errors.startDate : ''}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    // adapterLocale={locale}
                                >
                                    <DatePicker
                                        onChange={(value) => {
                                            setFieldValue(`endDate`, value);
                                        }}
                                        inputFormat="DD/MM/YYYY"
                                        value={values.endDate}
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        height: 41
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true
                                                }}
                                                fullWidth
                                                label="End Date"
                                                variant="outlined"
                                                name="endDate"
                                                onBlur={handleBlur}
                                                error={Boolean(touched.endDate && errors.endDate)}
                                                helperText={touched.endDate && errors.endDate ? errors.endDate : ''}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.currency}
                                    name="currency"
                                    onChange={(_, value) => {
                                        console.log(value);
                                        setFieldValue(`currency`, value);
                                    }}
                                    options={currencyListOptions}
                                    getOptionLabel={(option) => `${option.currencyCode}`}
                                    isOptionEqualToValue={(option, value) => option.currencyListId === value.currencyListId}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // label="tax"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            label="Currency"
                                            variant="outlined"
                                            name="currency"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.currency && errors.currency)}
                                            helperText={touched.currency && errors.currency ? errors.currency : ''}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    value={values.currency}
                                    name="currency"
                                    onChange={(_, value) => {
                                        console.log(value);
                                        setFieldValue(`currency`, value);
                                    }}
                                    fullWidth
                                    options={currencyListOptions}
                                    getOptionLabel={(option) => `${option.currencyCode}`}
                                    isOptionEqualToValue={(option, value) => option.currencyListId === value.currencyListId}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // label="tax"
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            label="Currency"
                                            variant="outlined"
                                            name="currency"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.currency && errors.currency)}
                                            helperText={touched.currency && errors.currency ? errors.currency : ''}
                                        />
                                    )}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="Tour Duration"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.tou && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ProgramHeader;
