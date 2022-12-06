import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'utils/MaterialTableIcons';
import TaxGroup from './TaxGroup';
import SuccessMsg from '../../../../messages/SuccessMsg';
import ErrorMsg from '../../../../messages/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTaxData } from '../../../../store/actions/masterActions/TaxActions/TaxAction';
import { getAllTaxGroupDetails, getLatestModifiedTaxGroupDetails } from '../../../../store/actions/masterActions/TaxActions/TaxGroupAction';
import Grid from '@mui/material/Grid';

function ViewTaxGroup() {
    const [open, setOpen] = useState(false);
    const [taxGroupCode, setTaxGroupCode] = useState('');
    const [mode, setMode] = useState('INSERT');
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [lastModifiedTimeDate, setLastModifiedTimeDate] = useState(null);

    const columns = [
        {
            title: 'Tax Group Type',
            field: 'taxGroupType',
            filterPlaceholder: 'Tax Group Type',
            align: 'center'
        },
        {
            title: 'Tax Group Code',
            field: 'taxGroupCode',
            filterPlaceholder: 'Tax Group Code',
            align: 'center'
        },
        {
            title: 'Description',
            field: 'description',
            align: 'center',
            grouping: false,
            filterPlaceholder: 'Description'
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
                    {rowData.status === false ? 'Inactive' : 'Active'}
                </div>
            )
        }
    ];

    const dispatch = useDispatch();
    const error = useSelector((state) => state.taxReducer.errorMsg);

    const taxGroupListData = useSelector((state) => state.taxGroupReducer.taxgroups);
    const taxGroupData = useSelector((state) => state.taxGroupReducer.taxgroup);
    console.log(taxGroupListData);
    const lastModifiedDate = useSelector((state) => state.taxGroupReducer.lastModifiedDateTime);

    useEffect(() => {
        if (taxGroupListData?.payload?.length > 0) {
            setTableData(taxGroupListData?.payload[0]);
        }
    }, [taxGroupListData]);

    useEffect(() => {
        console.log(error);
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
            dispatch(getAllTaxGroupDetails());
            dispatch(getLatestModifiedTaxGroupDetails());
        }
    }, [taxGroupData]);

    useEffect(() => {
        dispatch(getAllTaxGroupDetails());
        dispatch(getAllTaxData());
        dispatch(getLatestModifiedTaxGroupDetails());
    }, []);

    useEffect(() => {
        // setLastModifiedTimeDate(dateFormator(lastModifiedDate));
        setLastModifiedTimeDate(lastModifiedDate);
        console.log(lastModifiedDate);
    }, [lastModifiedDate]);

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
        <div className="App">
            <p className="main-title">Tax Group Setup</p>
            <Grid
                item
                sx={{
                    textAlign: 'Right',
                    fontFamily: "Brush Script MT'"
                }}
            >
                <div> Last Modified Date : {lastModifiedTimeDate}</div>
            </Grid>
            <MaterialTable
                columns={columns}
                data={tableData}
                actions={[
                    {
                        icon: tableIcons.Add,
                        tooltip: 'Add',
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
                        fontSize: '15px'
                    },
                    rowStyle: {
                        whiteSpace: 'nowrap',
                        height: 20,
                        fontSize: '13px',
                        padding: 0
                    }
                }}
            />

            {open ? <TaxGroup open={open} handleClose={handleClose} taxGroupCode={taxGroupCode} mode={mode} /> : ''}
            {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
            {openErrorToast ? <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} /> : null}
        </div>
    );
}

export default ViewTaxGroup;
