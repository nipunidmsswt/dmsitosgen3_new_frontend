import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, FormControlLabel, Box, DialogContent, TextField, DialogTitle, FormGroup, Button, MenuItem, Switch } from '@mui/material';

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

function CompanyProfile({ open, handleClose, mode, code }) {
    const initialValues = {
        companyName: '',
        companyId: '',
        version: '',
        status: true,
        address: '',
        email: '',
        fax: '',
        phone: '',
        website: '',
        taxRegistration: '',
        availableLicenceCount: '',
        allocatedLicenceCount: '',
        remark: '',
        files: ''
    };

    const [taxListOptions, setTaxListOptions] = useState([]);
    const [loadValues, setLoadValues] = useState(null);

    yup.addMethod(yup.array, 'uniqueTaxOrder', function (message) {
        return this.test('uniqueTaxOrder', message, function (list) {
            const mapper = (x) => {
                return x.taxOrder;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `taxGroupDetails[${idx}].taxOrder`,
                message: message
            });
        });
    });

    yup.addMethod(yup.array, 'uniqueTaxCode', function (message) {
        return this.test('uniqueTaxCode', message, function (list) {
            const mapper = (x) => {
                return x.tax?.taxCode;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `taxGroupDetails[${idx}].tax`,
                message: message
            });
        });
    });

    yup.addMethod(yup.string, 'checkDuplicateTaxGroup', function (message) {
        return this.test('checkDuplicateTaxGroup', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    await dispatch(checkDuplicatecode(value));

                    if (duplicateTaxGroup != null && duplicateTaxGroup.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                    return false; // or true as you see fit
                } catch (error) {}
            }
            return true;
        });
    });

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        companyName: yup.string().required('Required field'),
        companyId: yup.string().required('Required field'),
        version: yup.string().required('Required field'),
        address: yup.string().required('Required field'),
        email: yup.string().required('Required field').email(),
        fax: yup.string().required('Required field'),
        phone: yup.string().required('Required field').matches(phoneRegExp, 'Phone number is not valid'),
        website: yup.string().required('Required field'),
        fax: yup.string().required('Required field'),
        website: yup.string().required('Required field'),
        allocatedLicenceCount: yup.string().required('Required field')
    });

    //get data from reducers
    const duplicateTax = useSelector((state) => state.companyProfileReducer.duplicateTax);
    const companyProfileToUpdate = useSelector((state) => state.companyProfileReducer.companyProfileToUpdate);
    const duplicateTaxGroup = useSelector((state) => state.companyProfileReducer.duplicateTaxGroup);

    const dispatch = useDispatch();

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
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(saveCompanyProfileData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateCompanyProfileData(data));
        }
        handleClose();
    };

    const handleCancel = () => {
        setLoadValues(initialValues);
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
                                                        label="Company Name"
                                                        name="companyName"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyName}
                                                        error={Boolean(touched.companyName && errors.companyName)}
                                                        helperText={touched.companyName && errors.companyName ? errors.companyName : ''}
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
                                                        label="Company Id"
                                                        name="companyId"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyId}
                                                        error={Boolean(touched.companyId && errors.companyId)}
                                                        helperText={touched.companyId && errors.companyId ? errors.companyId : ''}
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
                                                        onChange={handleChange}
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
                                                <Grid item xs={8}>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        name="files"
                                                        //  onChange={this.selectFiles}
                                                        onChange={(event) => {
                                                            // console.log("file", event.currentTarget.files);
                                                            // showImages(event);
                                                            handleChange;
                                                            setFieldValue('files', event.currentTarget.files);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>
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

export default CompanyProfile;
