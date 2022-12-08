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
    Switch,
    TextField,
    Typography
} from '@mui/material';
import React from 'react';
import { useEffect, forwardRef, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from '@mui/icons-material';
import CreatedUpdatedUserDetails from '../userTimeDetails/CreatedUpdatedUserDetails';
import {
    checkDuplicateTourTypeCode,
    getTourTypeDataById,
    saveTourTypeData,
    updateTourTypeData
} from 'store/actions/masterActions/TourTypeAction';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TourType({ open, mode, handleClose, tourTypeCode }) {
    // const phoneRegExp=/^[2-9]{2}[0-9]{8}/
    // const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const [duplicateError, setDuplicateError] = useState(false);

    const dispatch = useDispatch();

    const initialValues = {
        code: '',
        name: '',
        status: true
    };

    const tourTypeToUpdate = useSelector((state) => state.tourTypeDataReducer.tourTypeToUpdate);
    console.log('update: ' + tourTypeToUpdate);

    const [loadValues, setLoadValues] = useState(null);

    const duplicatetourType = useSelector((state) => state.tourTypeDataReducer.duplicatetourType);

    // useEffect(() => {
    //   if (duplicateProduct != null) {
    //     if (duplicateProduct.length != 0) {
    //       let data = [];
    //       setDuplicateError(true);
    //     } else {
    //       let data = null;
    //       setDuplicateError(false);
    //     }
    //   }
    // }, [duplicateProduct]);

    const validationSchema = Yup.object().shape({
        // name: Yup.string().min(3, "It's too short").required("Required"),
        // email: Yup.string().email("Enter valid email").required("Required"),
        // // phoneNumber: Yup.number().typeError("Enter valid Phone number").required("Required"),
        // phoneNumber:Yup.string().matches(phoneRegExp,"Enter valid Phone number").required("Required"),
        // password: Yup.string().min(8, "Minimum characters should be 8")
        // .matc,hes(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),
        // confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Password not matches").required('Required')

        code: Yup.string()
            .required('Required')
            .test('Unique', 'TourType Code Already Exists', async function validateValue(value) {
                if (mode === 'INSERT') {
                    try {
                        dispatch(checkTourTypeCode(value));

                        if (duplicatetourType != null && duplicatetourType.errorMessages.length != 0) {
                            return false;
                        } else {
                            return true;
                        }
                        return false; // or true as you see fit
                    } catch (error) {}
                }
                return true;
            }),
        name: Yup.string().required('Required'),
        status: Yup.boolean()
    });

    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmitForm = (values, props) => {
        if (mode === 'INSERT') {
            dispatch(saveTourTypeData(values));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateTourTypeData(values));
        }
        handleClose();
        // setDuplicateError(false);
        // props.resetForm()
    };

    useEffect(() => {
        //console.log("update:"+serviceOfferedToUpdate.code)
        if ((mode === 'VIEW_UPDATE' && tourTypeToUpdate != null) || (mode === 'VIEW' && tourTypeToUpdate != null)) {
            //setFormValues(serviceOfferedToUpdate);
            console.log(tourTypeToUpdate.body.payload[0].tourType);
            setLoadValues(tourTypeToUpdate.body.payload[0].tourType);
        }
    }, [tourTypeToUpdate]);

    const checkTourTypeCode = (values) => {
        console.log('e:' + values);
        if (values != '') {
            console.log('formValues.tourCategoryCode:' + values);
            dispatch(checkDuplicateTourTypeCode(values));
        }
    };

    useEffect(() => {
        console.log('mode:' + mode);
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getTourTypeDataById(tourTypeCode));
        }
        setDuplicateError(false);
    }, [mode]);

    const handleReset = (resetForm) => {
        resetForm();
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div>
            <Dialog open={open} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" alignItems="center" className="dialog-title">
                        <Box flexGrow={1}>
                            {(() => {
                                if (mode === 'INSERT') {
                                    return 'Add Tour Type';
                                    // <Text>Add</Text>
                                } else if (mode === 'VIEW') {
                                    return 'View Tour Type';
                                } else {
                                    return 'Edit Tour Type';
                                }

                                return null;
                            })()}

                            {/* {mode === "INSERT" ? "Add " : "Edit "} Tour Category */}
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <Formik
                    //initialValues={{ ...formValues }}
                    initialValues={loadValues || formValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitForm}
                >
                    {(props) => (
                        <Form noValidate>
                            <DialogContent>
                                <div>
                                    <Grid container direction="column" gap={'15px'} justifyContent="center" alignContent="center">
                                        <Grid item>
                                            <Typography variant="subtitle1" component="h2">
                                                Code
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Field
                                                as={TextField}
                                                name="code"
                                                disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                fullWidth
                                                sx={{
                                                    width: { sm: 200, md: 300 },
                                                    '& .MuiInputBase-root': {
                                                        height: 30
                                                    }
                                                }}
                                                error={props.errors.code && props.touched.code}
                                                // helperText={
                                                //   error && formValues.tourCategoryCode.length === 0
                                                //     ? "Required Field"
                                                //     : "" || duplicateError
                                                //     ? "Category Code Already Exists"
                                                //     : ""
                                                // }
                                                helperText={<ErrorMessage name="code" value="" />}
                                                required
                                                // onBlur={(e) => checkDuplicateProductCode(e)}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="subtitle1" component="h2">
                                                Name
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Field
                                                as={TextField}
                                                name="name"
                                                sx={{
                                                    width: { sm: 200, md: 300 },
                                                    '& .MuiInputBase-root': {
                                                        height: 30
                                                    }
                                                }}
                                                error={props.errors.name && props.touched.name}
                                                helperText={<ErrorMessage name="name" value={formValues.name} />}
                                                values={props.values.name}
                                                required
                                            />
                                        </Grid>

                                        <Grid item>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name="status"
                                                    onChange={handleInputChange}
                                                    value={formValues.status}
                                                    control={<Switch color="success" />}
                                                    label="Status"
                                                    checked={formValues.status}
                                                    disabled={mode == 'VIEW'}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        {mode === 'VIEW' ? <CreatedUpdatedUserDetails formValues={props.values} mode={mode} /> : null}
                                    </Grid>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{
                                        display: mode == 'VIEW' ? 'none' : 'block'
                                    }}
                                    className="btnSave"
                                >
                                    {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    type="button"
                                    style={{
                                        //   backgroundColor: '#B22222',
                                        display: mode == 'VIEW' ? 'none' : 'block'
                                    }}
                                    // onClick={clearForm}
                                    onClick={handleReset.bind(null, props.resetForm)}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}

export default TourType;
