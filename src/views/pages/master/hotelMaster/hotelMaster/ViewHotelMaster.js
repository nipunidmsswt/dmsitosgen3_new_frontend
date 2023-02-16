import { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';

import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLocationDetails, getLatestModifiedLocationDetails } from 'store/actions/masterActions/LocationAction';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';

import { FormControlLabel, FormGroup, Switch } from '@mui/material';

import {
    getActivity_SupplementLatestModifiedDetails,
    getAllActivity_SupplimentData
} from 'store/actions/masterActions/Activity_SupplimentAction';
import HotelMaster from './HotelMaster';
import { getAllHotelMainData } from 'store/actions/masterActions/HotelMasterAction';

function ViewHotelMaster() {
    const [open, setOpen] = useState(false);
    const [activitySupplimentId, setActivitySupplimentId] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);

    const columns = [
        {
            title: 'Hotel Code',
            field: 'hotelCode',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Hotel Name',
            field: 'longName',
            filterPlaceholder: 'filter',
            align: 'center'
        },

        {
            title: 'Star Class',
            field: 'starClass',
            filterPlaceholder: 'filter',
            align: 'center'
        },

        {
            title: 'Email',
            field: 'email',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        // {
        //     title: 'Max Pax',
        //     field: 'maxPax',
        //     filterPlaceholder: 'filter',
        //     align: 'center'
        // },

        {
            title: 'Status',
            field: 'status',
            filterPlaceholder: 'True || False',
            align: 'center',
            emptyValue: () => <em>null</em>,
            render: (rowData) => (
                <div
                    style={{
                        alignItems: 'center',
                        align: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {rowData.status === true ? (
                        <FormGroup>
                            <FormControlLabel control={<Switch size="small" />} checked={true} />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel control={<Switch size="small" />} checked={false} />
                        </FormGroup>
                    )}
                </div>
            )
        }
    ];

    const dispatch = useDispatch();
    const error = useSelector((state) => state.activity_supplimentReducer.errorMsg);
    const hotelMainData = useSelector((state) => state.hotelMainReducer.hotelMain);
    const hotelMainList = useSelector((state) => state.hotelMainReducer.hotelMainList);
    const lastModifiedDate = useSelector((state) => state.activity_supplimentReducer.lastModifiedDateTime);

    useEffect(() => {
        setLastModifiedTimeDate(lastModifiedDate);
    }, [lastModifiedDate]);

    useEffect(() => {
        if (hotelMainList?.length > 0) {
            setTableData(hotelMainList);
        }
    }, [hotelMainList]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (hotelMainData) {
            setHandleToast(true);
            // dispatch(getAllGuideClassData());
        }
    }, [hotelMainData]);

    useEffect(() => {
        dispatch(getAllHotelMainData());
        // dispatch(getActivity_SupplementLatestModifiedDetails());
    }, []);

    const handleClickOpen = (type, data) => {
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setActivitySupplimentId(data.id);
        } else if (type === 'INSERT') {
            setActivitySupplimentId('');
            setMode(type);
        } else {
            setMode(type);
            setActivitySupplimentId(data.guideCode);
        }
        setOpen(true);
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
            <MainCard title="Hotel Master">
                <div style={{ textAlign: 'right' }}> Last Modified Date : {lastModifiedTimeDate}</div>
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <MaterialTable
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
                                            tooltip: 'Edit',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'Edit',
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
                                />

                                {open ? (
                                    <HotelMaster
                                        open={open}
                                        handleClose={handleClose}
                                        activitySupplimentId={activitySupplimentId}
                                        mode={mode}
                                    />
                                ) : (
                                    ''
                                )}
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

export default ViewHotelMaster;
