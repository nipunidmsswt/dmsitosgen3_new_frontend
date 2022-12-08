import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import FacilityCounter from './FacilityCount';
import tableIcons from 'utils/MaterialTableIcons';
import { gridSpacing } from 'store/constant';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTaxData } from 'store/actions/masterActions/TaxActions/TaxAction';
import { getAllTaxGroupDetails } from 'store/actions/masterActions/TaxActions/TaxGroupAction';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';

function ViewFacilityCounter() {
    const [open, setOpen] = useState(false);
    const [taxGroupCode, setTaxGroupCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);
    const columns = [
        {
            title: 'Code',
            field: 'taxGroupType',
            filterPlaceholder: 'filter',
            align: 'center'
        },
        {
            title: 'Description',
            field: 'taxGroupCode',
            filterPlaceholder: 'filter',
            align: 'center'
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
    const error = useSelector((state) => state.taxReducer.errorMsg);

    const taxGroupListData = useSelector((state) => state.taxGroupReducer.taxgroups);
    const taxGroupData = useSelector((state) => state.taxGroupReducer.taxgroup);
    console.log(taxGroupListData);

    useEffect(() => {
        if (taxGroupListData?.payload?.length > 0) {
            setTableData(taxGroupListData?.payload[0]);
        }
    }, [taxGroupListData]);

    useEffect(() => {
        if (error != null) {
            console.log('failed Toast');
            setOpenErrorToast(true);
        }
    }, [error]);

    useEffect(() => {
        console.log(taxGroupData);
        if (taxGroupData) {
            console.log('sucessToast');
            setHandleToast(true);
            //   dispatch(getAllTaxGroupDetails());
        }
    }, [taxGroupData]);

    useEffect(() => {
        // dispatch(getAllTaxGroupDetails());
    }, []);

    const handleClickOpen = (type, data) => {
        console.log(type);
        console.log(data);
        if (type === 'VIEW_UPDATE') {
            setMode(type);
            setTaxGroupCode(data.taxGroupCode);
        } else if (type === 'INSERT') {
            setTaxGroupCode('');
            setMode(type);
        } else {
            setMode(type);
            setTaxGroupCode(data.taxGroupCode);
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
            <MainCard title="Facility Count">
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
                                            tooltip: 'Add Tax',
                                            isFreeAction: true,
                                            onClick: () => handleClickOpen('INSERT', null)
                                        },
                                        (rowData) => ({
                                            icon: tableIcons.Edit,
                                            tooltip: 'Edit Tax',
                                            onClick: () => handleClickOpen('VIEW_UPDATE', rowData)
                                        }),
                                        (rowData) => ({
                                            icon: tableIcons.VisibilityIcon,
                                            tooltip: 'Edit Tax',
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
                                    <FacilityCounter open={open} handleClose={handleClose} taxGroupCode={taxGroupCode} mode={mode} />
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

export default ViewFacilityCounter;
