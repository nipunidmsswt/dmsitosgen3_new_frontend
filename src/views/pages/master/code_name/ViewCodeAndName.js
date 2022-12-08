import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { useSelector, useDispatch } from 'react-redux';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import CodeAndName from './CodeAndName';
import { Grid } from '@mui/material';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import { getAllCodeAndNameDetails, getLatestModifiedDetails } from 'store/actions/masterActions/CodeAndNameAction';
import MainCard from 'ui-component/cards/MainCard';

function ViewCodeAndName() {
    const [open, setOpen] = useState(false);
    const [ccode, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
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

    const lastModifiedDate = useSelector((state) => state.codeAndNameReducer.lastModifiedDateTime);
    console.log(codeAndNameData);
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

            dispatch(getAllCodeAndNameDetails());
            dispatch(getLatestModifiedDetails());
        } else {
        }
    }, [codeAndNameData]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(getAllCodeAndNameDetails());
        dispatch(getLatestModifiedDetails());
    }, []);

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

    const handleClickOpen = (type, data) => {
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setCode(data.code);
        } else if (type === 'INSERT') {
            setCode('');
            setMode(type);
        } else {
            setMode(type);
            setCode(data.code);
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
            <MainCard title="Code And Name">
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
                                />

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
