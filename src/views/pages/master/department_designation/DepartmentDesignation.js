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

function DepartmentDesignation({ open, handleClose, mode, taxGroupCode }) {
    const initialValues = {
        type: '',
        description: '',
        status: true
    };

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
                    await dispatch(checkDuplicateTaxGroupCode(value));

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

    const validationSchema = yup.object().shape({
        type: yup.string().required('Required field'),
        description: yup.string().required('Required field'),
        status: yup.boolean()
    });

    //get data from reducers
    const duplicateTax = useSelector((state) => state.taxReducer.duplicateTax);
    const taxGroupToUpdate = useSelector((state) => state.taxGroupReducer.taxGroupToUpdate);
    const duplicateTaxGroup = useSelector((state) => state.taxGroupReducer.duplicateTaxGroup);

    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getTaxGroupDataById(taxGroupCode));
        }
    }, [mode]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && taxGroupToUpdate != null) || (mode === 'VIEW' && taxGroupToUpdate != null)) {
            setLoadValues(taxGroupToUpdate);
        }
    }, [taxGroupToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        if (mode === 'INSERT') {
            dispatch(saveCompanyProfileData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateCompanyProfileData(data));
        }
        // handleClose();
    };

    const handleCancel = () => {
        setLoadValues(initialValues);
    };

    return (
        <div>
            <Dialog fullWidth open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            Department / Designation
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
                                                <Grid item xs={6}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 200 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Desination / Department"
                                                        name="type"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.type}
                                                        error={Boolean(touched.type && errors.type)}
                                                        helperText={touched.type && errors.type ? errors.type : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Department'}>
                                                            Department
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Designation'}>
                                                            Designation
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        sx={{
                                                            width: { xs: 100, sm: 250 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Description"
                                                        name="description"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.description}
                                                        error={Boolean(touched.description && errors.description)}
                                                        helperText={touched.description && errors.description ? errors.description : ''}
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

export default DepartmentDesignation;
