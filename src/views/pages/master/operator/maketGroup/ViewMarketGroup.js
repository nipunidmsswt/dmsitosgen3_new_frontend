import { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import MarketGroup from './MarketGroup';
import { getAllMarketGroupData, getLatestModifiedDetails } from 'store/actions/masterActions/operatorActions/MarketGroupAction';
import MainCard from 'ui-component/cards/MainCard';

function ViewMarketGroup() {
    const [open, setOpen] = useState(false);
    const [managerCode, setManagerCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: 'Group Type',
            field: 'groupType',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Group Code',
            field: 'code',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        // {
        //   title: "Operator / Market Code",
        //   field: "marketCode",
        //   align: "center",
        //   grouping: false,
        //   filterPlaceholder: "filter",
        // },
        {
            title: 'Group Description',
            field: 'description',
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
    const error = useSelector((state) => state.marketGroupReducer.errorMsg);
    const dispatch = useDispatch();
    const marketGroupData = useSelector((state) => state.marketGroupReducer.marketGroup);
    const marketGroupListData = useSelector((state) => state.marketGroupReducer.marketList);
    const lastModifiedDate = useSelector((state) => state.marketGroupReducer.lastModifiedDateTime);

    useEffect(() => {
        if (marketGroupData) {
            setHandleToast(true);
            dispatch(getAllMarketGroupData());
            dispatch(getLatestModifiedDetails());
        } else {
        }
    }, [marketGroupData]);

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

    useEffect(() => {
        const dataArray = [];
        if (marketGroupListData?.payload?.length > 0) {
            {
                marketGroupListData?.payload.length != 0 &&
                    marketGroupListData?.payload[0].map((item) => {
                        const initialValues = {
                            groupType: item.groupType,
                            code: item.code,
                            description: item.description,
                            // marketCode: item.marketGroupDetails[0].market.code,
                            // mobileN:item.managerAdditionalDetails[0].officeTelNumber,
                            // codeAndNameDetail:item.codeAndNameDetail.name,
                            // fax: item.managerAdditionalDetails[0].fax1,
                            status: item.status
                        };
                        dataArray.push(initialValues);
                    });
            }
        }
        setTableData(dataArray);
    }, [marketGroupListData]);

    useEffect(() => {
        console.log(error);
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        dispatch(getAllMarketGroupData());
        dispatch(getLatestModifiedDetails());
    }, []);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setManagerCode(data.code);
        } else if (type === 'INSERT') {
            setManagerCode('');
            setMode(type);
        } else {
            setMode(type);
            setManagerCode(data.code);
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
            <MainCard title="Market Group">
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
                                            tooltip: 'Add Market Group',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit Market Group',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'View Market Group',
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
                                        exportFileName: 'ManagerData',
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
                                            textAlign: 'center',
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
                                    <MarketGroup open={open} handleClose={handleClose} marketGroupCode={managerCode} mode={mode} />
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

export default ViewMarketGroup;
