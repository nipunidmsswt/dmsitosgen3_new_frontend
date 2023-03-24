import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux';
import { gridSpacing } from 'store/constant';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import {
    getAllActiveOperatorData,
    getAllClusterData,
    getAllMarketAndOperatorForCluster,
    getExisitngMarketCodesForCluster,
    getExisitngOperatorCodesForMarket,
    saveClusterAndMarketMappingData,
    saveOperatorAndMarketMappingData
} from 'store/actions/masterActions/CodeAndNameAction';
import MainCard from 'ui-component/cards/MainCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import { getAllActiveMarketData } from 'store/actions/masterActions/operatorActions/MarketAction';
import { makeStyles } from '@material-ui/core/styles';
import MainTransportCategories from './MainTransportCategories';
import DistancesDetails from './DistancesDetails';
import BaggageTransportRate from './PaxVehicleRate';

const useStyles = makeStyles({
    content: {
        justifyContent: 'center'
    }
});

function TransportMainScreen() {
    const classes = useStyles();

    const initialMarketOperator = {
        market: null,
        operatorList: []
    };

    const initialValuesClusterMarketMapping = {
        cluster: null,
        marketList: []
    };

    const validationSchema = yup.object().shape({
        cluster: yup.object().typeError('Required field'),
        marketList: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string(),
                    code: yup.string(),
                    name: yup.string()
                })
            )
            .min(1, 'Required Field')
    });

    const validationSchemaMarketOperator = yup.object().shape({
        market: yup.object().typeError('Required field'),
        operatorList: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string(),
                    code: yup.string(),
                    name: yup.string()
                })
            )
            .min(1, 'Required Field')
    });

    const [open, setOpen] = useState(false);
    const [openAgent, setAgentOpen] = useState(false);
    const [ccode, setCode] = useState('');
    const [operatorCode, setOperatorCode] = useState('');
    const [marketCode, setMarketCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [clusterListOptions, setClusterListOptions] = useState([]);
    const [marketListOptions, setMarketListOptions] = useState([]);
    const [operatorListOptions, setOperatorListOptions] = useState([]);

    const dispatch = useDispatch();
    const error = useSelector((state) => state.codeAndNameReducer.errorMsg);

    const codeAndNameData = useSelector((state) => state.codeAndNameReducer.codeAndName);
    const clusterMarketMappingData = useSelector((state) => state.codeAndNameReducer.clusterMarketMappingData);
    const clusterListData = useSelector((state) => state.codeAndNameReducer.cluterTypesDetails);
    const marketListData = useSelector((state) => state.marketReducer.marketActiveList);
    const lastModifiedDate = useSelector((state) => state.codeAndNameReducer.lastModifiedDateTime);
    const operatorListData = useSelector((state) => state.codeAndNameReducer.operatorTypesDetails);
    const marketMappingWithCluster = useSelector((state) => state.codeAndNameReducer.marketMappingWithCluster);
    const operatorMappingWithMarket = useSelector((state) => state.codeAndNameReducer.operatorMappingWithMarket);
    const marketOperatorMappingData = useSelector((state) => state.codeAndNameReducer.marketOperatorMappingData);

    const dataToTableView = useSelector((state) => state.codeAndNameReducer.dataToTableView);
    const agentData = useSelector((state) => state.agentReducer.agent);
    const mainTransportDetail = useSelector((state) => state.mainTransportCategoryReducer.mainTransportDetail);

    const handleClickOpenAgentForm = (code, marketCode) => {
        console.log('market Code:' + marketCode);
        setOperatorCode(code);
        setMode('INSERT');
        setAgentOpen(true);
        setMarketCode(marketCode);
        // setType('');
    };

    const columns = [
        {
            title: 'Market',
            field: 'marketList',
            filterPlaceholder: 'filter',
            align: 'left'
        },
        {
            title: 'Operator',
            field: 'operatorList',
            filterPlaceholder: 'filter',
            align: 'left',

            render: (rowData) => (
                console.log(rowData.operatorList),
                (
                    <div
                        style={{
                            alignItems: 'center',
                            align: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            {rowData.operatorList?.split(',').map((type) => (
                                <Button
                                    variant="outlined"
                                    type="button"
                                    style={{
                                        // backgroundColor: '#B22222',
                                        marginLeft: '10px'
                                    }}
                                    onClick={(e) => handleClickOpenAgentForm(type, rowData.marketList)}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                )
            )
        }
    ];

    useEffect(() => {
        setTableData(dataToTableView);
    }, [dataToTableView]);

    useEffect(() => {
        // if (marketMappingWithCluster?.payload?.length > 0) {

        setMarketListOptions(marketMappingWithCluster);
    }, [marketMappingWithCluster]);

    useEffect(() => {
        if (operatorMappingWithMarket?.length > 0) {
            setOperatorListOptions(operatorMappingWithMarket);
        }
    }, [operatorMappingWithMarket]);

    useEffect(() => {
        if (mainTransportDetail != null) {
            setHandleToast(true);

            // dispatch(getAllCodeAndNameDetails());
            // dispatch(getLatestModifiedDetails());
        } else {
        }
    }, [mainTransportDetail]);

    useEffect(() => {
        if (agentData != null) {
            setHandleToast(true);
        } else {
        }
    }, [agentData]);

    useEffect(() => {
        if (clusterMarketMappingData != null) {
            setHandleToast(true);

            // dispatch(getAllCodeAndNameDetails());
            // dispatch(getLatestModifiedDetails());
        }
    }, [clusterMarketMappingData]);

    useEffect(() => {
        if (marketOperatorMappingData != null) {
            setHandleToast(true);

            // dispatch(getAllCodeAndNameDetails());
            // dispatch(getLatestModifiedDetails());
        } else {
        }
    }, [marketOperatorMappingData]);

    // useEffect(() => {
    //     if (clusterListData != null) {
    //         setClusterListOptions(clusterListData);
    //     }
    // }, [clusterListData]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        setMarketListOptions(marketListData);
    }, [marketListData]);

    useEffect(() => {
        // dispatch(getAllClusterData());
        // dispatch(getAllActiveMarketData());
        // dispatch(getAllActiveOperatorData());
        // dispatch(getAllMarketAndOperatorForCluster());
    }, []);

    useEffect(() => {
        if (operatorListData != null) {
            setOperatorListOptions(operatorListData);
        }
    }, [operatorListData]);

    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
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

    const handleClickOpen = () => {
        const type = 'INSERT';
        setCode('');
        setMode(type);
        setOpen(true);
    };

    const handleSubmitForm = async (data) => {
        if (mode === 'INSERT') {
            dispatch(saveClusterAndMarketMappingData(data));
        }

        handleClose();
    };

    const handleMarketOperatorSubmitForm = async (data) => {
        dispatch(saveOperatorAndMarketMappingData(data));

        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setAgentOpen(false);
        // dispatch(getAllClusterData());
        // dispatch(getAllActiveMarketData());
        // dispatch(getAllActiveOperatorData());
    };

    const loadExisitngMarketCodesForCluster = (value) => {
        dispatch(getExisitngMarketCodesForCluster(value.clusterId));
    };

    const loadExisitngOperatorCodesForMarket = (value) => {
        dispatch(getExisitngOperatorCodesForMarket(value.marketId));
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };

    const loadTableData = (value) => {
        dispatch(getAllMarketAndOperatorForCluster(value.clusterId));
    };

    return (
        <div>
            <MainCard title="Transport Details Management">
                <div style={{ textAlign: 'right' }}>
                    {' '}
                    {/* Last Modified Date : {lastModifiedTimeDate} */}
                    <Button variant="contained" type="button" className="btnSave" onClick={handleClickOpen}>
                        Main
                    </Button>
                </div>
                <br />
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Accordion square>
                                    <AccordionSummary
                                        style={{ background: 'linear-gradient(to right bottom, #516a9f, #1877f2)' }}
                                        classes={{ content: classes.content }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white'
                                            }}
                                        >
                                            Distances Details
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <DistancesDetails mode={mode}></DistancesDetails>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion square>
                                    <AccordionSummary
                                        style={{ background: 'linear-gradient(to right bottom, #516a9f, #1877f2)' }}
                                        classes={{ content: classes.content }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white'
                                            }}
                                        >
                                            Pax Vehicle Rate (Per Day)
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <BaggageTransportRate mode={mode}></BaggageTransportRate>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion square>
                                    <AccordionSummary
                                        style={{ background: 'linear-gradient(to right bottom, #516a9f, #1877f2)' }}
                                        classes={{ content: classes.content }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white'
                                            }}
                                        >
                                            Baggage Transport Rates
                                        </Typography>
                                    </AccordionSummary>
                                </Accordion>

                                {openAgent ? (
                                    <Agent
                                        open={openAgent}
                                        handleClose={handleClose}
                                        operatorCode={operatorCode}
                                        marketCode={marketCode}
                                        // mode={mode}
                                    />
                                ) : (
                                    ''
                                )}
                                {open ? <MainTransportCategories open={open} handleClose={handleClose} ccode={ccode} mode={mode} /> : ''}
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

export default TransportMainScreen;
