import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Slide,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import { useEffect, forwardRef, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { CheckBox } from '@mui/icons-material';
import {
    checkDuplicateHotelBasisCodee,
    getHotelBasisDataById,
    saveHotelBasisData,
    updateHotelBasisData
} from 'store/actions/masterActions/operatorActions/HotelBasisAction';
import CreatedUpdatedUserDetails from '../../userTimeDetails/CreatedUpdatedUserDetails';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HotelBasis({ open, mode, handleClose, rowHotelBasisCode }) {
    // const phoneRegExp=/^[2-9]{2}[0-9]{8}/
    // const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const [duplicateError, setDuplicateError] = useState(false);

    const dispatch = useDispatch();

    const initialValues = {
        code: '',
        basisDesc: '',
        status: true
    };

    const hotelBasisToUpdate = useSelector((state) => state.hotelBasisReducer.hotelBasisToUpdate);

    const duplicatehotelBasis = useSelector((state) => state.hotelBasisReducer.duplicatehotelBasis);
    const [loadValues, setLoadValues] = useState(null);

    yup.addMethod(yup.string, 'checkDuplicateHotelBasis', function (message) {
        return this.test('checkDuplicateHotelBasis', 'Duplicate Hotel Basis Code', async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    dispatch(checkDuplicateHotelBasisCodee(value));

                    if (duplicatehotelBasis != null && duplicatehotelBasis.errorMessages.length != 0) {
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
        code: yup.string().required('Required field').checkDuplicateHotelBasis('ggg'),
        basisDesc: yup.string().required('Required field'),
        status: yup.boolean()
    });

    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmitForm = (values, props) => {
        if (mode === 'INSERT') {
            dispatch(saveHotelBasisData(values));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateHotelBasisData(values));
        }
        handleClose();
        // setDuplicateError(false);
        // props.resetForm()
    };

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && hotelBasisToUpdate != null) || (mode === 'VIEW' && hotelBasisToUpdate != null)) {
            setLoadValues(hotelBasisToUpdate);
        }
    }, [hotelBasisToUpdate]);

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getHotelBasisDataById(rowHotelBasisCode));
        }
        setDuplicateError(false);
    }, [mode]);

    const clearForm = () => {};

    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add ' : ''} {mode === 'VIEW_UPDATE' ? 'Update ' : ''} {mode === 'VIEW' ? 'View ' : ''}{' '}
                            Hotel Basis
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
                        <div>
                            <div className="row">
                                <Grid container direction="row">
                                    <Grid item lg={12} md={12} xs={12}>
                                        <>
                                            <Formik
                                                enableReinitialize={true}
                                                initialValues={loadValues || initialValues}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                validationSchema={validationSchema}
                                            >
                                                {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => {
                                                    return (
                                                        <Form>
                                                            <div>
                                                                <Grid
                                                                    container
                                                                    direction="column"
                                                                    gap={'15px'}
                                                                    justifyContent="center"
                                                                    alignContent="center"
                                                                >
                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" component="h2">
                                                                            Basis Code
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 30
                                                                                }
                                                                            }}
                                                                            disabled={mode == 'VIEW_UPDATE'}
                                                                            // label="Code"
                                                                            name="code"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.code}
                                                                            error={Boolean(touched.code && errors.code)}
                                                                            helperText={touched.code && errors.code ? errors.code : ''}
                                                                        ></TextField>
                                                                    </Grid>

                                                                    <Grid item>
                                                                        <Typography variant="subtitle1" component="h2">
                                                                            Basis Description
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            // label="Description"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 30
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            // variant="outlined"
                                                                            name="basisDesc"
                                                                            value={values.basisDesc}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.basisDesc && errors.basisDesc)}
                                                                            helperText={
                                                                                touched.basisDesc && errors.basisDesc
                                                                                    ? errors.basisDesc
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>

                                                                    <Grid item>
                                                                        <Typography variant="" component="p">
                                                                            Status
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item>
                                                                        <FormGroup>
                                                                            <FormControlLabel
                                                                                // label="Status"
                                                                                // labelPlacement="start"
                                                                                control={
                                                                                    <Checkbox
                                                                                        name="status"
                                                                                        onChange={handleChange}
                                                                                        checked={values.status}
                                                                                        value={values.status}
                                                                                        disabled={mode == 'VIEW'}
                                                                                    />
                                                                                }
                                                                            />
                                                                        </FormGroup>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>

                                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="outlined"
                                                                        type="button"
                                                                        style={{
                                                                            // backgroundColor: '#B22222',
                                                                            marginLeft: '10px'
                                                                        }}
                                                                        // onClick={handleReset.bind(null, values.resetForm)}
                                                                        onClick={clearForm}
                                                                    >
                                                                        CLEAR
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}

                                                                {mode != 'VIEW' ? (
                                                                    <Button variant="contained" type="submit" className="btnSave">
                                                                        {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}

                                                                {mode === 'VIEW' ? (
                                                                    <CreatedUpdatedUserDetails formValues={values} mode={mode} />
                                                                ) : null}
                                                            </Box>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        </>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                </>
            </Dialog>
        </div>
    );
}

export default HotelBasis;
