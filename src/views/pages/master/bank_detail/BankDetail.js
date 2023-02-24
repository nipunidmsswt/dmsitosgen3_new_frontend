import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    FormControlLabel,
    Box,
    DialogActions,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Button,
    DialogContentText,
    Switch,
    Autocomplete
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    saveCompanyProfileData,
    getCompanyProfileDataById,
    updateCompanyProfileData,
    checkDuplicateCompanyProfileCode
} from '../../../../store/actions/masterActions/CompanyProfileAction';

import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { getAllbankData } from 'store/actions/masterActions/BankAction';

function BankDetail({ open, handleClose, mode, code }) {
    const initialValues = {
        bankCode: null,
        branchCode: '',
        swiftCode: '',
        address: '',
        currency: '',
        accNo: '',
        accDescription: '',
        intermediaryBank: '',
        intermediaryBranch: '',
        country: '',
        market: null,
        remark: '',
        status: true
    };

    const [loadValues, setLoadValues] = useState(null);
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [bankList, setbankList] = useState([]);

    //get data from reducers

    const duplicatecompanyProfileGroup = useSelector((state) => state.companyProfileReducer.duplicatecompanyProfileGroup);
    const companyProfileToUpdate = useSelector((state) => state.companyProfileReducer.companyProfileToUpdate);
    const bankListData = useSelector((state) => state.bankReducer.bankList);

    const dispatch = useDispatch();

    useEffect(() => {
        if (bankListData.length != 0) {
            console.log(bankListData);
            if (bankListData.payload.length === 1) {
                console.log(bankListData.payload[0]);
                setbankList(bankListData.payload[0]);
            }
        }
    }, [bankListData]);

    useEffect(() => {
        dispatch(getAllbankData());
    }, []);

    yup.addMethod(yup.string, 'checkDuplicateCompanyName', function (message) {
        return this.test('checkDuplicateCompanyName', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    console.log('sjhgchs');
                    await dispatch(checkDuplicateCompanyProfileCode(value));

                    if (duplicatecompanyProfileGroup != null && duplicatecompanyProfileGroup.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                    return false;
                } catch (error) {}
            }
            return true;
        });
    });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        // companyName: yup.string().required('Required field').checkDuplicateCompanyName('Duplicate Code'),
        // version: yup.string().required('Required field'),
        // address: yup.string().required('Required field'),
        // email: yup.string().required('Required field').email(),
        // phone: yup.string().required('Required field').matches(phoneRegExp, 'Phone number is not valid'),
        // website: yup.string().required('Required field'),
        // allocatedLicenceCount: yup.number().required('Required field').positive('Must be greater than zero')
        // files: yup
        //     .mixed()
        //     .test('fileSize', 'The file is too large', (value) => {
        //         if (!value.length) return true; // attachment is optional
        //         return value[0].size <= 2000000;
        //     })
        //     .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        //         return value && (value[0].type === 'image/jpeg' || value[0].type === 'image/jpg' || value[0].type === 'image/png');
        //     })
        // .test('is-num-files', 'NUMBER_OF_FILES', numberOfFiles)
        // .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .png', (value) => {
        //     return value && (value[0].type === 'image/jpeg' || value[0].type === 'image/jpg' || value[0].type === 'image/png');
        // })
    });

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getCompanyProfileDataById(code));
        }
    }, [mode]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && companyProfileToUpdate != null) || (mode === 'VIEW' && companyProfileToUpdate != null)) {
            setLoadValues(companyProfileToUpdate);
        }
    }, [companyProfileToUpdate]);

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            dispatch(saveCompanyProfileData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateCompanyProfileData(data));
        }
        handleClose();
    };

    return (
        <div>
            <Dialog fullWidth maxWidth="md" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}Company
                            Profile
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <>
                    <DialogContent>
                        <Formik
                            maxWidth
                            enableReinitialize={true}
                            initialValues={loadValues || initialValues}
                            onSubmit={(values) => {
                                handleSubmitForm(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                return (
                                    <Form>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container rowSpacing={2} style={{ marginTop: '2px' }}>
                                                <Grid item xs={3}>
                                                    <Grid item>
                                                        <Autocomplete
                                                            value={values.bankCode}
                                                            name="bankCode"
                                                            onChange={(_, value) => {
                                                                console.log(value);
                                                                setFieldValue(`bankCode`, value);
                                                            }}
                                                            options={bankList}
                                                            disabled={mode == 'VIEW_UPDATE'}
                                                            getOptionLabel={(option) => `${option.bankCode}-${option.bankName}`}
                                                            isOptionEqualToValue={(option, value) => {
                                                                console.log(option);
                                                                console.log(value);
                                                                return option.bankId === value.bankId;
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    // label="tax"
                                                                    sx={{
                                                                        width: { sm: 200 },
                                                                        '& .MuiInputBase-root': {
                                                                            height: 40
                                                                        }
                                                                    }}
                                                                    InputLabelProps={{
                                                                        shrink: true
                                                                    }}
                                                                    label="Bank"
                                                                    variant="outlined"
                                                                    name="bankCode"
                                                                    onBlur={handleBlur}
                                                                    error={Boolean(touched.bankCode && errors.bankCode)}
                                                                    helperText={touched.bankCode && errors.bankCode ? errors.bankCode : ''}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={3} hidden={mode == 'INSERT' ? true : false}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        disabled={true}
                                                        label="Company Id"
                                                        name="companyId"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyId}
                                                        error={Boolean(touched.companyId && errors.companyId)}
                                                        helperText={touched.companyId && errors.companyId ? errors.companyId : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={mode == 'INSERT' ? 4 : 3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Version"
                                                        name="version"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.version}
                                                        error={Boolean(touched.version && errors.version)}
                                                        helperText={touched.version && errors.version ? errors.version : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            name="status"
                                                            onChange={handleChange}
                                                            value={values.status}
                                                            control={<Switch color="success" />}
                                                            label="Status"
                                                            checked={values.status}
                                                            disabled={mode == 'VIEW'}
                                                        />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 400 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Address"
                                                        name="address"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.address}
                                                        error={Boolean(touched.address && errors.address)}
                                                        helperText={touched.address && errors.address ? errors.address : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Email"
                                                        name="email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email}
                                                        error={Boolean(touched.email && errors.email)}
                                                        helperText={touched.email && errors.email ? errors.email : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        label="Fax"
                                                        name="fax"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.fax}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        label="Phone"
                                                        name="phone"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone}
                                                        error={Boolean(touched.phone && errors.phone)}
                                                        helperText={touched.phone && errors.phone ? errors.phone : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        label="Website"
                                                        name="website"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.website}
                                                        error={Boolean(touched.website && errors.website)}
                                                        helperText={touched.website && errors.website ? errors.website : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Tax Registration"
                                                        name="taxRegistration"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.taxRegistration}
                                                    ></TextField>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 100 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        disabled={true}
                                                        label="Available LicenceCount"
                                                        name="availableLicenceCount"
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.availableLicenceCount}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 100 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        label="Allocated Licence Count"
                                                        name="allocatedLicenceCount"
                                                        onChange={(e) => {
                                                            setFieldValue(`allocatedLicenceCount`, e.target.value);

                                                            if (mode === 'INSERT') {
                                                                setFieldValue('availableLicenceCount', e.target.value);
                                                            } else if (mode === 'VIEW_UPDATE') {
                                                                if (e.target.value == 0) {
                                                                    setFieldValue('availableLicenceCount', 0);
                                                                } else if (e.target.value >= savedAlllocatedLicesnce) {
                                                                    let result =
                                                                        e.target.value - savedAlllocatedLicesnce + savedAvalableLicesnce;

                                                                    setFieldValue('availableLicenceCount', result);
                                                                } else if (e.target.value < savedAlllocatedLicesnce) {
                                                                    let diff = savedAlllocatedLicesnce - e.target.value;
                                                                    if (diff <= e.target.value) {
                                                                        setFieldValue(
                                                                            'availableLicenceCount',
                                                                            savedAvalableLicesnce - diff
                                                                        );
                                                                    } else {
                                                                        console.log('result 3');
                                                                        setOpenDialogBox(true);
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        onBlur={handleBlur}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        value={values.allocatedLicenceCount}
                                                        error={Boolean(touched.allocatedLicenceCount && errors.allocatedLicenceCount)}
                                                        helperText={
                                                            touched.allocatedLicenceCount && errors.allocatedLicenceCount
                                                                ? errors.allocatedLicenceCount
                                                                : ''
                                                        }
                                                    ></TextField>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {openDialogBox ? (
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title" style={{ color: 'red' }}>
                                                    {'Error Msg'}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Users are assigned to this company more than allocated license count
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    {/* <Button onClick={handleClose}>Disagree</Button> */}
                                                    <Button
                                                        className="btnSave"
                                                        type="button"
                                                        onClick={() => {
                                                            setOpenDialogBox(false);
                                                        }}
                                                    >
                                                        OK
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        ) : (
                                            ''
                                        )}
                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                            {mode != 'VIEW' ? (
                                                <Button
                                                    variant="outlined"
                                                    type="button"
                                                    style={{
                                                        // backgroundColor: '#B22222',
                                                        marginLeft: '10px'
                                                    }}
                                                    onClick={(e) => resetForm()}
                                                >
                                                    CLEAR
                                                </Button>
                                            ) : (
                                                ''
                                            )}

                                            {mode != 'VIEW' ? (
                                                <Button className="btnSave" variant="contained" type="submit">
                                                    {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                </Button>
                                            ) : (
                                                ''
                                            )}
                                        </Box>
                                        <Box>
                                            <Grid item>
                                                {mode === 'VIEW' ? <CreatedUpdatedUserDetailsWithTableFormat formValues={values} /> : null}
                                            </Grid>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
}

export default BankDetail;
