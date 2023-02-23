import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from 'utils/MaterialTableIcons';
import SuccessMsg from '../../../../../messages/SuccessMsg';
import ErrorMsg from '../../../../../messages/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTaxData } from '../../../../../store/actions/masterActions/TaxActions/TaxAction';
import {
    getAllTaxGroupDetails,
    getLatestModifiedTaxGroupDetails
} from '../../../../../store/actions/masterActions/TaxActions/TaxGroupAction';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

function RoomBuyingRates() {
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
            align: 'left'
        },
        {
            title: 'Tax Group Code',
            field: 'taxGroupCode',
            filterPlaceholder: 'Tax Group Code',
            align: 'left'
        },
        {
            title: 'Description',
            field: 'description',
            align: 'left',
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
                        alignItems: 'center',
                        align: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
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
            <MainCard title="Room Buying Rates">
                {/* <div style={{ textAlign: 'right' }}> Last Modified Date : {lastModifiedTimeDate}</div> */}
                <br />
            </MainCard>
        </div>
    );
}

export default RoomBuyingRates;
