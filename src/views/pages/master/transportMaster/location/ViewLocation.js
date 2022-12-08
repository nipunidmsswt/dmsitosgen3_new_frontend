import { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import Location from './Location';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLocationDetails, getLatestModifiedLocationDetails } from 'store/actions/masterActions/LocationAction';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';

function ViewLocation() {
    const [open, setOpen] = useState(false);
    const [locationCode, setLocationCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);

    const columns = [
        {
            title: 'Code',
            field: 'code',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Province',
            field: 'province',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'filter'
        },
        {
            title: 'Geo Name',
            field: 'geoName',
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
                        fontWeight: 'bold',
                        // background: rowData.status === true ? "#008000aa" : "#f90000aa",
                        borderRadius: '4px',
                        paddingLeft: 5,
                        paddingRight: 5
                    }}
                >
                    {rowData.status === true ? 'Active' : 'Inactive'}
                </div>
            )
        }
    ];

    const dispatch = useDispatch();
    const error = useSelector((state) => state.locationReducer.errorMsg);
    const locations = useSelector((state) => state.locationReducer.locations);
    const location = useSelector((state) => state.locationReducer.location);
    const lastModifiedDate = useSelector((state) => state.locationReducer.lastModifiedDateTime);

    useEffect(() => {
        setLastModifiedTimeDate(lastModifiedDate);
    }, [lastModifiedDate]);

    useEffect(() => {
        if (locations?.payload?.length > 0) {
            setTableData(locations?.payload[0]);
        }
    }, [locations]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (location) {
            console.log('sucessToast');
            setHandleToast(true);
            // dispatch(getAllLocationDetails());
        }
    }, [location]);

    useEffect(() => {
        dispatch(getAllLocationDetails());
        dispatch(getLatestModifiedLocationDetails());
    }, []);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setLocationCode(data.code);
        } else if (type === 'INSERT') {
            setLocationCode('');
            setMode(type);
        } else {
            setMode(type);
            setLocationCode(data.code);
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
            <MainCard title="Location">
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
                                            tooltip: 'Add Location',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit Location',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View Location',
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

                                {open ? <Location open={open} handleClose={handleClose} locationCode={locationCode} mode={mode} /> : ''}
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

export default ViewLocation;
