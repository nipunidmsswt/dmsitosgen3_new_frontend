import React from 'react';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { styled } from '@mui/material/styles';
import { Typography, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOwnerData, getLatestModifiedDetails } from 'store/actions/masterActions/OwnerAction';
import Owner from './Owner';
import MainCard from 'ui-component/cards/MainCard';

function ViewOwner() {
    const [open, setOpen] = useState(false);
    const [rowOwnerCode, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const error = useSelector((state) => state.ownerDataReducer.errorMsg);
    const ownerListData = useSelector((state) => state.ownerDataReducer.ownerList);
    const [tableData, setTableData] = useState([]);
    const lastModifiedDate = useSelector((state) => state.ownerDataReducer.lastModifiedDateTime);

    const ownerData = useSelector((state) => state.ownerDataReducer.owner);
    const dispatch = useDispatch();

    const handleClickOpen = (type, data) => {
        if (type === 'VIEW_UPDATE' || type === 'VIEW') {
            setMode(type);
            console.log('get by code' + data.code);
            setCode(data.code);
        } else {
            setCode('');
            setMode(type);
        }

        setOpen(true);
    };

    useEffect(() => {
        // setLastModifiedTimeDate(dateFormator(lastModifiedDate));
        setLastModifiedTimeDate(lastModifiedDate);
    }, [lastModifiedDate]);

    useEffect(() => {
        dispatch(getAllOwnerData());
        dispatch(getLatestModifiedDetails());
    }, []);

    useEffect(() => {
        if (ownerListData?.payload?.length > 0) {
            setTableData(ownerListData?.payload[0]);
        }
    }, [ownerListData]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        if (ownerData) {
            setHandleToast(true);
            dispatch(getAllOwnerData());
            dispatch(getLatestModifiedDetails());
        }
    }, [ownerData]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };

    const columns = [
        {
            title: 'Owner Code',
            field: 'code',
            headerStyle: { textAlign: 'center' },
            cellStyle: {
                minWidth: 200,
                maxWidth: 200,
                align: 'left'
            },
            filterPlaceholder: 'filter'
        },
        {
            title: 'Name',
            field: 'name',
            filterPlaceholder: 'filter',
            headerStyle: { textAlign: 'center' },
            align: 'left'
        },

        {
            title: 'Status',
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
    return (
        <div>
            <MainCard title="Owner">
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
                                            tooltip: 'Add Owner',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            filtering: true,
                                            tooltip: 'Edit Owner',
                                            // iconProps: { color: "primary" },
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View Owner',
                                            // iconProps: { color: "action" },
                                            onClick: () => handleClickOpen('VIEW', rowData)
                                        })
                                    ]}
                                    options={{
                                        // title:<ModifiedElement/>,
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
                                        // paginationPosition: "both",
                                        exportButton: true,
                                        exportAllData: true,
                                        exportFileName: 'Service Offered Table Data',
                                        actionsColumnIndex: -1,

                                        // grouping: true,
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

                                {open ? <Owner open={open} handleClose={handleClose} mode={mode} ownerCode={rowOwnerCode} /> : ''}
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

export default ViewOwner;
