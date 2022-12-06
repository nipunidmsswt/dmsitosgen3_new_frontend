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
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from '@mui/icons-material';
import {
    checkDuplicateRoomCategoryCodee,
    getRoomCategoryDataById,
    saveRoomCategoryData,
    updateRoomCategoryData
} from 'store/actions/masterActions/RoomCategoryAction';
import CreatedUpdatedUserDetails from '../../userTimeDetails/CreatedUpdatedUserDetails';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RoomCategory({ open, mode, handleClose, rowHotelChildrenFacilityCode }) {
    const [duplicateError, setDuplicateError] = useState(false);
    const [openToast, setHandleToast] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        code: '',
        roomDescription: '',
        status: true
    };

    const hotelChildrenFacilityToUpdate = useSelector((state) => state.roomCategoryReducer.hotelChildrenFacilityToUpdate);

    const duplicateRoomCategoryCode = useSelector((state) => state.roomCategoryReducer.duplicateRoomCategoryCode);

    Yup.addMethod(Yup.string, 'checkDuplicateRoomCategory', function (message) {
        return this.test('checkDuplicateRoomCategory', 'Duplicate Room Category Code', async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    dispatch(checkDuplicateRoomCategoryCodee(value));

                    if (duplicateRoomCategoryCode != null && duplicateRoomCategoryCode.errorMessages.length != 0) {
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

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('Required').checkDuplicateRoomCategory('ggg'),
        roomDescription: Yup.string().required('Required'),
        status: Yup.boolean()
    });

    const [formValues, setFormValues] = useState(initialValues);

    const handleSubmitForm = (values, props) => {
        if (mode === 'INSERT') {
            dispatch(saveRoomCategoryData(values));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateRoomCategoryData(values));
        }
        handleClose();
        // setDuplicateError(false);
        // props.resetForm()
    };

    useEffect(() => {
        if (
            (mode === 'VIEW_UPDATE' && hotelChildrenFacilityToUpdate != null) ||
            (mode === 'VIEW' && hotelChildrenFacilityToUpdate != null)
        ) {
            setFormValues(hotelChildrenFacilityToUpdate);
        }
    }, [hotelChildrenFacilityToUpdate]);

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getRoomCategoryDataById(rowHotelChildrenFacilityCode));
        }
        setDuplicateError(false);
    }, [mode]);

    const handleReset = (resetForm) => {
        resetForm();

        // const ConfirmDialog = () => {
        // return (
        //   <Dialog open={open} maxWidth="sm" fullWidth TransitionComponent={Transition}
        //   keepMounted
        //   disableBackdropClick>
        //     <DialogTitle>Confirm the action</DialogTitle>
        //     <Box position="absolute" top={0} right={0}>
        //       <IconButton>
        //         <Close />
        //       </IconButton>
        //     </Box>
        //     <DialogContent>
        //       <Typography>some message here</Typography>
        //     </DialogContent>
        //     <DialogActions>
        //       <Button color="primary" variant="contained">
        //         Cancel
        //       </Button>
        //       <Button color="secondary" variant="contained">
        //         Confirm
        //       </Button>
        //     </DialogActions>
        //   </Dialog>
        // );
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                disableBackdropClick
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}Room
                            Category
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <Formik
                    initialValues={{ ...formValues }}
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
                                                Description
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <Field
                                                as={TextField}
                                                name="roomDescription"
                                                sx={{
                                                    width: { sm: 200, md: 300 },
                                                    '& .MuiInputBase-root': {
                                                        height: 30
                                                    }
                                                }}
                                                error={props.errors.roomDescription && props.touched.roomDescription}
                                                helperText={<ErrorMessage name="roomDescription" value={formValues.roomDescription} />}
                                                required
                                            />
                                        </Grid>

                                        {/* <Grid item> */}
                                        <Grid item>
                                            <Typography variant="subtitle1" component="h2">
                                                Status
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<Field as={Checkbox} name="status" checked={props.values.status} />}
                                                />
                                            </FormGroup>
                                        </Grid>
                                        {mode === 'VIEW' ? <CreatedUpdatedUserDetails formValues={formValues} mode={mode} /> : null}
                                    </Grid>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    style={{
                                        backgroundColor: '#00AB55',
                                        display: mode == 'VIEW' ? 'none' : 'block'
                                    }}
                                >
                                    {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                </Button>
                                <Button
                                    variant="contained"
                                    type="button"
                                    style={{
                                        backgroundColor: '#d4b600',
                                        display: mode == 'VIEW' ? 'none' : 'block'
                                    }}
                                    // onClick={clearForm}
                                    onClick={handleReset.bind(null, props.resetForm)}
                                >
                                    CLEAR
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}

export default RoomCategory;
