import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import tableIcons from 'utils/MaterialTableIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllExChangeRateData, getLatestModifiedDetails } from 'store/actions/masterActions/exchangeRateActions/ExchangeRateActions';
import MainCard from 'ui-component/cards/MainCard';
import { FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import { gridSpacing } from 'store/constant';
import ExpenseTypes from './ExpenseTypes';

function ViewExpenseTypes() {
    const [open, setOpen] = useState(false);
    const [Code, setCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const columns = [
        {
            title: 'Expense Code',
            field: 'expenseCode',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Description',
            field: 'description',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Sttaus',
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
                        justifyContent: 'center'
                    }}
                >
                    {rowData.status === true ? (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="success" size="small" />} checked={true} />
                        </FormGroup>
                    ) : (
                        <FormGroup>
                            <FormControlLabel control={<Switch color="error" size="small" />} checked={false} />
                        </FormGroup>
                    )}
                </div>
            )
        }
    ];

    const dispatch = useDispatch();
    const error = useSelector((state) => state.exchangeRateTypesReducer.errorMsg);

    const exchangeRateTypeList = useSelector((state) => state.exchangeRateTypesReducer.exchangeRateTypeList);
    const exchangeRateType = useSelector((state) => state.exchangeRateTypesReducer.exchangeRateType);
    const lastModifiedDate = useSelector((state) => state.exchangeRateTypesReducer.lastModifiedDateTime);
    const expenseType = useSelector((state) => state.expenseTypesReducer.expenseType);
    // useEffect(() => {
    //     if (exchangeRateTypeList?.payload?.length > 0) {
    //         setTableData(exchangeRateTypeList?.payload[0]);
    //     }
    // }, [exchangeRateTypeList]);

    useEffect(() => {
        if (error != null) {
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        console.log(expenseType);
        if (expenseType) {
            console.log('sucessToast');
            setHandleToast(true);
            // dispatch(getAllExChangeRateData());
        }
    }, [expenseType]);

    // useEffect(() => {
    //     dispatch(getLatestModifiedDetails());
    //     dispatch(getAllExChangeRateData());
    // }, []);

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
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setCode(data.baseCurrencyCode);
        } else if (type === 'INSERT') {
            setCode('');
            setMode(type);
        } else {
            setMode(type);
            setCode(data.baseCurrencyCode);
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
            <MainCard title="Expense Types">
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
                                            tooltip: 'View',
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

                                {open ? <ExpenseTypes open={open} handleClose={handleClose} code={Code} mode={mode} /> : ''}
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

export default ViewExpenseTypes;
