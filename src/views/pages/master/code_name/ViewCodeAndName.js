import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { useSelector, useDispatch } from 'react-redux';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import CodeAndName from './CodeAndName';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import {
    getAllActiveOperatorData,
    getAllClusterData,
    getAllCodeAndNameDetails,
    getLatestModifiedDetails,
    saveClusterAndMarketMappingData
} from 'store/actions/masterActions/CodeAndNameAction';
import MainCard from 'ui-component/cards/MainCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';

function ViewCodeAndName() {
    const ref = useRef(null);
    const initialValues1 = {
        code: '',
        initials: '',
        surName: '',
        shortName: '',
        address: '',
        codeAndNameDetail: null,
        status: true,
        managerAdditionalDetails: [
            {
                homeTelNumber: '',
                officeTelNumber: '',
                fax1: '',
                fax2: ''
            }
        ]
    };

    const initialValuesClusterMarketMapping = {
        cluster: null
        // marketList: null
    };
    const [open, setOpen] = useState(false);
    const [ccode, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [clusterListOptions, setClusterListOptions] = useState([]);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const [operatorListOptions, setOperatorListOptions] = useState([]);

    const columns = [
        {
            title: 'Code Type',
            field: 'codeType',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: ' Code',
            field: 'code',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Description',
            field: 'name',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Active',
            field: 'status',
            filterPlaceholder: 'True || False',
            align: 'center',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                    style={{
                        color: rowData.status === true ? '#008000aa' : '#f90000aa',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        paddingLeft: 5,
                        paddingRight: 5
                    }}
                >
                    {rowData.status === true ? 'ACTIVE' : 'INACTIVE'}
                </div>
            )
        }
    ];

    const dispatch = useDispatch();
    const error = useSelector((state) => state.codeAndNameReducer.errorMsg);

    const codeAndNameListData = useSelector((state) => state.codeAndNameReducer.codeAndNameList);
    const codeAndNameData = useSelector((state) => state.codeAndNameReducer.codeAndName);
    const clusterListData = useSelector((state) => state.codeAndNameReducer.cluterTypesDetails);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);
    const lastModifiedDate = useSelector((state) => state.codeAndNameReducer.lastModifiedDateTime);
    const operatorListData = useSelector((state) => state.codeAndNameReducer.operatorTypesDetails);
    const [allValues, setAllValues] = useState({
        codeType: '',
        code: '',
        name: '',
        status: false
    });

    useEffect(() => {
        if (codeAndNameListData?.payload?.length > 0) {
            const dataArray = [];
            setTableData(codeAndNameListData?.payload[0][0].codeAndNameDetails);
        }
    }, [codeAndNameListData]);

    useEffect(() => {
        if (codeAndNameData) {
            setHandleToast(true);

            // dispatch(getAllCodeAndNameDetails());
            // dispatch(getLatestModifiedDetails());
        } else {
        }
    }, [codeAndNameData]);

    useEffect(() => {
        if (clusterListData != null) {
            setClusterListOptions(clusterListData);
        }
    }, [clusterListData]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        setMarketListOptions(marketListData);
    }, [marketListData]);

    useEffect(() => {
        dispatch(getAllClusterData());
        dispatch(getAllActiveMarketData());
        dispatch(getAllActiveOperatorData());
    }, []);

    useEffect(() => {
        if (operatorListData != null) {
            console.log(operatorListData);
            setOperatorListOptions(operatorListData);
        }
    }, [operatorListData]);

    // useEffect(() => {
    //     dispatch(getAllCodeAndNameDetails());
    //     dispatch(getLatestModifiedDetails());
    // }, []);

    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);

    // useEffect(() => {
    //     setLastModifiedTimeDate(lastModifiedDate === null ? '' : new Date(lastModifiedDate).toLocaleString('en-GB'));
    // }, [lastModifiedDate]);

    useEffect(() => {
        setLastModifiedTimeDate(
            lastModifiedDate === null
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

    const validationSchema = yup.object().shape({
        cluster: yup.object().typeError('Required field'),
        marketList: yup.object().typeError('Required field')
    });

    const handleClickOpen = () => {
        const type = 'INSERT';
        // if (type === 'VIEW_UPDATE') {
        //     setMode(type);
        //     setCode(data.code);
        // } else if (type === 'INSERT') {
        setCode('');
        setMode(type);
        // } else {
        // setMode(type);
        // setCode(data.code);
        // }

        setOpen(true);
    };

    const handleSubmitForm = async (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            console.log(data);
            dispatch(saveClusterAndMarketMappingData(data));
        } else if (mode === 'VIEW_UPDATE') {
            // dispatch(updateCodeAndNameData(data));
        }
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };
    return (
        <div>
            <MainCard title="Code And Name">
                <div style={{ textAlign: 'right' }}>
                    {' '}
                    {/* Last Modified Date : {lastModifiedTimeDate} */}
                    <Button variant="contained" type="button" className="btnSave" onClick={handleClickOpen}>
                        Add new
                    </Button>
                </div>
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography align="center">Map Cluster,Market And Operator</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Formik
                                                        innerRef={ref}
                                                        enableReinitialize={true}
                                                        initialValues={initialValuesClusterMarketMapping}
                                                        onSubmit={(values) => {
                                                            handleSubmitForm(values);
                                                        }}
                                                        // onReset={handleReset}
                                                        validationSchema={validationSchema}
                                                    >
                                                        {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => {
                                                            return (
                                                                <Form>
                                                                    <div style={{ marginTop: '6px', margin: '10px' }}>
                                                                        <Grid gap="10px" display="flex">
                                                                            <Grid item>
                                                                                <Autocomplete
                                                                                    // value={values.cluster}
                                                                                    name="cluster"
                                                                                    disabled={mode == 'VIEW'}
                                                                                    onChange={(_, value) => {
                                                                                        setFieldValue(`cluster`, value);
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    options={clusterListOptions}
                                                                                    getOptionLabel={(option) =>
                                                                                        `${option.code} - ${option.name}`
                                                                                    }
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            label="Cluster"
                                                                                            sx={{
                                                                                                width: { sm: 300 },
                                                                                                '& .MuiInputBase-root': {
                                                                                                    height: 41
                                                                                                }
                                                                                            }}
                                                                                            InputLabelProps={{
                                                                                                shrink: true
                                                                                            }}
                                                                                            error={Boolean(
                                                                                                touched.cluster && errors.cluster
                                                                                            )}
                                                                                            helperText={
                                                                                                touched.cluster && errors.cluster
                                                                                                    ? errors.cluster
                                                                                                    : ''
                                                                                            }
                                                                                            // placeholder="--Select a Manager Code --"
                                                                                            variant="outlined"
                                                                                            name="cluster"
                                                                                            onBlur={handleBlur}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <br />

                                                                        <Grid gap="10px" display="flex">
                                                                            <Grid>
                                                                                <Autocomplete
                                                                                    // value={values.marketList}
                                                                                    name="marketList"
                                                                                    multiple={true}
                                                                                    disabled={mode == 'VIEW'}
                                                                                    onChange={(_, value) => {
                                                                                        setFieldValue(`marketList`, value);
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    options={marketListOptions}
                                                                                    getOptionLabel={(option) =>
                                                                                        `${option.code} - ${option.name}`
                                                                                    }
                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                        option.marketId === value.marketId
                                                                                    }
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            label="Markets"
                                                                                            sx={{
                                                                                                width: { sm: 300 },
                                                                                                '& .MuiInputBase-root': {
                                                                                                    height: 41
                                                                                                }
                                                                                            }}
                                                                                            InputLabelProps={{
                                                                                                shrink: true
                                                                                            }}
                                                                                            // error={Boolean(
                                                                                            //     touched.marketList && errors.marketList
                                                                                            // )}
                                                                                            // helperText={
                                                                                            //     touched.marketList && errors.marketList
                                                                                            //         ? errors.marketList
                                                                                            //         : ''
                                                                                            // }
                                                                                            // placeholder="--Select a Manager Code --"
                                                                                            variant="outlined"
                                                                                            name="marketList"
                                                                                            onBlur={handleBlur}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>

                                                                    {/* <br /> */}
                                                                    {/* <Box>
                                                                        <Grid item>
                                                                            {mode === 'VIEW' ? (
                                                                                <CreatedUpdatedUserDetailsWithTableFormat
                                                                                    formValues={values}
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                    </Box> */}

                                                                    <Box
                                                                        display="flex"
                                                                        flexDirection="row-reverse"
                                                                        style={{ marginTop: '20px' }}
                                                                    >
                                                                        {mode != 'VIEW' ? (
                                                                            <Button
                                                                                variant="outlined"
                                                                                type="reset"
                                                                                style={{
                                                                                    // backgroundColor: '#B22222',
                                                                                    marginLeft: '10px'
                                                                                }}
                                                                                // onClick={handleCancel}
                                                                            >
                                                                                Clear
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
                                                    {/* <Item>xs=8</Item> */}
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Formik
                                                        innerRef={ref}
                                                        enableReinitialize={true}
                                                        initialValues={initialValues1}
                                                        onSubmit={(values) => {
                                                            handleSubmitForm(values);
                                                        }}
                                                        // onReset={handleReset}
                                                        // validationSchema={validationSchema}
                                                    >
                                                        {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => {
                                                            return (
                                                                <Form>
                                                                    <div style={{ marginTop: '6px', margin: '10px' }}>
                                                                        <Grid gap="10px" display="flex">
                                                                            <Grid item>
                                                                                <Autocomplete
                                                                                    // value={values.manager}
                                                                                    name="manager"
                                                                                    disabled={mode == 'VIEW'}
                                                                                    onChange={(_, value) => {
                                                                                        setFieldValue(`manager`, value);
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    options={operatorListOptions}
                                                                                    getOptionLabel={(option) =>
                                                                                        `${option.code} - ${option.name}`
                                                                                    }
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            label="Operators"
                                                                                            sx={{
                                                                                                width: { sm: 300 },
                                                                                                '& .MuiInputBase-root': {
                                                                                                    height: 41
                                                                                                }
                                                                                            }}
                                                                                            InputLabelProps={{
                                                                                                shrink: true
                                                                                            }}
                                                                                            // placeholder="--Select a Manager Code --"
                                                                                            variant="outlined"
                                                                                            name="manager"
                                                                                            onBlur={handleBlur}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <br />

                                                                        <Grid gap="10px" display="flex">
                                                                            <Grid>
                                                                                <Autocomplete
                                                                                    // value={values.manager}
                                                                                    name="manager"
                                                                                    multiple={true}
                                                                                    disabled={mode == 'VIEW'}
                                                                                    onChange={(_, value) => {
                                                                                        setFieldValue(`manager`, value);
                                                                                    }}
                                                                                    InputLabelProps={{
                                                                                        shrink: true
                                                                                    }}
                                                                                    options={marketListOptions}
                                                                                    getOptionLabel={(option) =>
                                                                                        `${option.code} - ${option.name}`
                                                                                    }
                                                                                    isOptionEqualToValue={(option, value) =>
                                                                                        option.marketId === value.marketId
                                                                                    }
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            label="Markets"
                                                                                            sx={{
                                                                                                width: { sm: 300 },
                                                                                                '& .MuiInputBase-root': {
                                                                                                    height: 41
                                                                                                }
                                                                                            }}
                                                                                            InputLabelProps={{
                                                                                                shrink: true
                                                                                            }}
                                                                                            // placeholder="--Select a Manager Code --"
                                                                                            variant="outlined"
                                                                                            name="manager"
                                                                                            onBlur={handleBlur}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>

                                                                    {/* <br /> */}
                                                                    {/* <Box>
                                                                        <Grid item>
                                                                            {mode === 'VIEW' ? (
                                                                                <CreatedUpdatedUserDetailsWithTableFormat
                                                                                    formValues={values}
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                    </Box> */}

                                                                    <Box
                                                                        display="flex"
                                                                        flexDirection="row-reverse"
                                                                        style={{ marginTop: '20px' }}
                                                                    >
                                                                        {mode != 'VIEW' ? (
                                                                            <Button
                                                                                variant="outlined"
                                                                                type="reset"
                                                                                style={{
                                                                                    // backgroundColor: '#B22222',
                                                                                    marginLeft: '10px'
                                                                                }}
                                                                                // onClick={handleCancel}
                                                                            >
                                                                                Clear
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
                                                    {/* <Item>xs=4</Item> */}
                                                </Grid>
                                                {/* <Grid item xs={4}>
                                                    <Item>xs=4</Item>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Item>xs=8</Item>
                                                </Grid> */}
                                            </Grid>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                        <Typography>Cluster, Market And Operator List</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                                            amet blandit leo lobortis eget.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {/* <Accordion disabled>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                                        <Typography>Disabled Accordion</Typography>
                                    </AccordionSummary>
                                </Accordion> */}
                                {/* <MaterialTable
                                    columns={columns}
                                    data={tableData}
                                    actions={[
                                        {
                                            icon: tableIcons.Add,
                                            tooltip: 'Add New',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit ',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View ',
                                            onClick: () => handleClickOpen('VIEW', rowData)
                                        })
                                    ]}
                                    options={{
                                        padding: 'dense',
                                        showTitle: false,
                                        sorting: true,
                                        search: true,
                                        searchFieldAlignment: 'right',
                                        searchAutoFocus: true,
                                        searchFieldVariant: 'standard',
                                        filtering: true,
                                        paging: true,
                                        pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                                        pageSize: 5,
                                        paginationType: 'stepped',
                                        showFirstLastPageButtons: false,
                                        exportButton: true,
                                        exportAllData: true,
                                        exportFileName: 'TableData',
                                        actionsColumnIndex: -1,
                                        columnsButton: true,

                                        headerStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            maxHeight: 20,
                                            padding: 2,
                                            fontSize: '14px',
                                            background: '-moz-linear-gradient(top, #0790E8, #3180e6)',
                                            background: '-ms-linear-gradient(top, #0790E8, #3180e6)',
                                            background: '-webkit-linear-gradient(top, #0790E8, #3180e6)',
                                            // textAlign: 'center',
                                            color: '#FFF'
                                        },
                                        rowStyle: {
                                            whiteSpace: 'nowrap',
                                            height: 20,
                                            fontSize: '13px',
                                            padding: 0
                                        }
                                    }}
                                /> */}

                                {open ? <CodeAndName open={open} handleClose={handleClose} ccode={ccode} mode={mode} /> : ''}
                                {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                                {openErrorToast ? (
                                    <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} />
                                ) : null}
                            </Grid>
                        </Grid>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
}

export default ViewCodeAndName;
