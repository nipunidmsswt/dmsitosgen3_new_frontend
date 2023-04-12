import { useEffect, forwardRef, useState } from 'react';

import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Button,
    Grid,
    Switch
} from '@mui/material';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'assets/scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ProgramTransport({ open, handleClose, mode }) {
    const initialValues = {
        paxBaggage: '',
        transportType: '',
        chargeMethod: '',
        vehicleType: '',
        vehicleCategory: '',
        location1: null,
        location2: null,
        location3: null,
        location4: null,
        location5: null,
        kms: 0,
        hours: 0
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [loadValues, setLoadValues] = useState(null);
    const dispatch = useDispatch();

    const validationSchema = yup.object().shape({
        paxBaggage: yup.string().required('Required field'),
        transportType: yup.string().required('Required field'),
        chargeMethod: yup.string().required('Required field'),
        vehicleType: yup.string().required('Required field'),
        vehicleCategory: yup.string().required('Required field'),
        location1: yup.string().typeError('Required field'),
        location2: yup.string().typeError('Required field'),
        location3: yup.string().typeError('Required field'),
        location4: yup.string().typeError('Required field'),
        location5: yup.string().typeError('Required field')
    });

    const handleSubmitForm = (data) => {
        handleClose();
    };

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: { borderRadius: 15, maxWidth: '120%', height: '65%' }
                }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} Transport
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={loadValues || initialValues}
                            onSubmit={(values) => {
                                console.log(values);
                                handleSubmitForm(values);
                            }}
                            validationSchema={validationSchema}
                        >
                            {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                                return (
                                    <Form>
                                        <div style={{ marginTop: '6px', margin: '10px' }}>
                                            <Grid gap="10px" display="flex">
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="paxBaggage"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Pag/Baggage"
                                                        name="paxBaggage"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.paxBaggage}
                                                        error={Boolean(touched.paxBaggage && errors.paxBaggage)}
                                                        helperText={touched.paxBaggage && errors.paxBaggage ? errors.paxBaggage : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Pax'}>
                                                            Pax
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Baggage'}>
                                                            Baggage
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="transportType"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Transport Type"
                                                        name="transportType"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.transportType}
                                                        error={Boolean(touched.transportType && errors.transportType)}
                                                        helperText={
                                                            touched.transportType && errors.transportType ? errors.transportType : ''
                                                        }
                                                    >
                                                        <MenuItem dense={true} value={'Normal'}>
                                                            Normal
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Economy'}>
                                                            Economy
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="chargeMethod"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Charge Method"
                                                        name="chargeMethod"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.chargeMethod}
                                                        error={Boolean(touched.chargeMethod && errors.chargeMethod)}
                                                        helperText={touched.chargeMethod && errors.chargeMethod ? errors.chargeMethod : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Distance'}>
                                                            Distance
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Hours'}>
                                                            Hours
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="vehicleType"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Vehicle Type"
                                                        name="vehicleType"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.vehicleType}
                                                        error={Boolean(touched.vehicleType && errors.vehicleType)}
                                                        helperText={touched.vehicleType && errors.vehicleType ? errors.vehicleType : ''}
                                                    >
                                                        <MenuItem dense={true} value={'Standard'}>
                                                            Standard
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Premium'}>
                                                            Premium
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>

                                                <Grid item>
                                                    <TextField
                                                        sx={{
                                                            width: { sm: 75, md: 150 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        id="vehicleCategory"
                                                        select
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        label="Vehicle Category"
                                                        name="vehicleCategory"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.vehicleCategory}
                                                        error={Boolean(touched.vehicleCategory && errors.vehicleCategory)}
                                                        helperText={
                                                            touched.vehicleCategory && errors.vehicleCategory ? errors.vehicleCategory : ''
                                                        }
                                                    >
                                                        <MenuItem dense={true} value={'Car'}>
                                                            Car
                                                        </MenuItem>
                                                        <MenuItem dense={true} value={'Bike'}>
                                                            Bike
                                                        </MenuItem>
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                            <Grid gap="10px" display="flex" style={{ marginTop: '50px' }}>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location1}
                                                        name="location1"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location1`, value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={['CMB-Colombo', 'KDY-Kandy', 'JAF-Jaffna']}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 01"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 110 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location1 && errors.location1)}
                                                                helperText={touched.location1 && errors.location1 ? errors.location1 : ''}
                                                                variant="standard"
                                                                name="location1"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location2}
                                                        name="location2"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location2`, value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={['CMB-Colombo', 'KDY-Kandy', 'JAF-Jaffna']}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 02"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 110 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location2 && errors.location2)}
                                                                helperText={touched.location2 && errors.location2 ? errors.location2 : ''}
                                                                variant="standard"
                                                                name="location2"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location3}
                                                        name="location3"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location3`, value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={['CMB-Colombo', 'KDY-Kandy', 'JAF-Jaffna']}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 03"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 110 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location3 && errors.location3)}
                                                                helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                                variant="standard"
                                                                name="location3"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location4}
                                                        name="location4"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location4`, value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={['CMB-Colombo', 'KDY-Kandy', 'JAF-Jaffna']}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 04"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 110 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location4 && errors.location4)}
                                                                helperText={touched.location4 && errors.location4 ? errors.location4 : ''}
                                                                variant="standard"
                                                                name="location4"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Autocomplete
                                                        value={values.location5}
                                                        name="location5"
                                                        onChange={(_, value) => {
                                                            setFieldValue(`location5`, value);
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        options={['CMB-Colombo', 'KDY-Kandy', 'JAF-Jaffna']}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Location 05"
                                                                sx={{
                                                                    alignItems: 'center',
                                                                    width: { sm: 75, md: 110 },
                                                                    '& .MuiInputBase-root': {
                                                                        height: 40
                                                                    }
                                                                }}
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                error={Boolean(touched.location5 && errors.location5)}
                                                                helperText={touched.location5 && errors.location5 ? errors.location5 : ''}
                                                                variant="standard"
                                                                name="location5"
                                                                onBlur={handleBlur}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginLeft: '40px', marginTop: '15px' }}>
                                                    <TextField
                                                        label="Distance"
                                                        sx={{
                                                            alignItems: 'center',
                                                            width: { sm: 75, md: 70 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        // error={Boolean(touched.location3 && errors.location3)}
                                                        // helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                        variant="filled"
                                                        name="distance"
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item style={{ marginTop: '15px' }}>
                                                    <TextField
                                                        label="Hours"
                                                        sx={{
                                                            alignItems: 'center',
                                                            width: { sm: 75, md: 70 },
                                                            '& .MuiInputBase-root': {
                                                                height: 40
                                                            }
                                                        }}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        InputProps={{
                                                            readOnly: true
                                                        }}
                                                        // error={Boolean(touched.location3 && errors.location3)}
                                                        // helperText={touched.location3 && errors.location3 ? errors.location3 : ''}
                                                        variant="filled"
                                                        name="hours"
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '60px' }}>
                                            <Button className="btnSave" variant="contained" type="submit">
                                                {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                type="button"
                                                style={{
                                                    // backgroundColor: '#B22222',
                                                    marginRight: '10px'
                                                }}
                                                onClick={(e) => resetForm()}
                                            >
                                                CLEAR
                                            </Button>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ProgramTransport;
