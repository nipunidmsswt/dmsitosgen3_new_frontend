import { useEffect, forwardRef, useState } from 'react';

import {
    Dialog,
    Slide,
    DialogActions,
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

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'assets/scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { checkDuplicateTaxCode, getTaxDataById, saveTaxData, updateTaxData } from 'store/actions/masterActions/TaxActions/TaxAction';
import CreatedUpdatedUserDetails from '../userTimeDetails/CreatedUpdatedUserDetails';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function Tax({ open, handleClose, mode, rowTaxCode }) {
    const initialValues = {
        taxCode: '',
        taxDescription: '',
        status: true,
        percentage: '',
        createdBy: 'admin'
    };

    const taxCode = (
        <p>
            Tax Code<span style={{ color: 'red' }}>*</span>
        </p>
    );
    const taxDescription = (
        <p>
            Tax Description<span style={{ color: 'red' }}>*</span>
        </p>
    );
    const percentage = (
        <p>
            Percentage<span style={{ color: 'red' }}>*</span>
        </p>
    );
    const [formValues, setFormValues] = useState(initialValues);

    const taxToUpdate = useSelector((state) => state.taxReducer.taxToUpdate);
    const duplicateTax = useSelector((state) => state.taxReducer.duplicateTax);
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formValues.taxCode.length == 0 || formValues.taxDescription.length == 0 || formValues.percentage.length == 0) {
            setError(true);
        } else {
            if (mode === 'INSERT') {
                dispatch(saveTaxData(formValues));
            } else if (mode === 'VIEW_UPDATE') {
                console.log('yes click');
                dispatch(updateTaxData(formValues));
            }

            handleClose();
        }
    };

    useEffect(() => {
        if (duplicateTax != null && duplicateTax.length != 0) {
            if (duplicateTax?.errorMessages?.length != 0) {
                setDuplicateError(true);
            } else {
                setDuplicateError(false);
            }
        } else {
            setDuplicateError(false);
        }
    }, [duplicateTax]);

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getTaxDataById(rowTaxCode));
        }
    }, [mode]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && taxToUpdate != null) || (mode === 'VIEW' && taxToUpdate != null)) {
            console.log(taxToUpdate);
            setFormValues(taxToUpdate);
        }
    }, [taxToUpdate]);
    const handleCancle = () => {
        if (mode === 'INSERT') {
            setFormValues(initialValues);
        } else if (mode === 'VIEW_UPDATE') {
            setFormValues(taxToUpdate);
        }
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

    const checkDuplicateTaxes = () => {
        dispatch(checkDuplicateTaxCode(formValues.taxCode));
    };

    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const [duplicateError, setDuplicateError] = useState(false);
    return (
        <div>
            <Dialog
                PaperProps={{
                    style: { borderRadius: 15 }
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
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}Tax
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <form onSubmit={handleSubmitForm}>
                    <DialogContent>
                        <div>
                            <Grid container spacing={10}>
                                <Grid container item xs={6} direction="column" gap="20px">
                                    <TextField
                                        disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                        label={taxCode}
                                        sx={{
                                            width: { sm: 200, md: 300 },
                                            '& .MuiInputBase-root': {
                                                height: 40
                                            }
                                        }}
                                        type="text"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        // className="txt"
                                        id="taxCode"
                                        name="taxCode"
                                        onChange={handleInputChange}
                                        error={(error && formValues.taxCode.length === 0) || duplicateError}
                                        helperText={
                                            error && formValues.taxCode.length === 0
                                                ? 'Required Field'
                                                : '' || duplicateError
                                                ? 'Tax Code already exists'
                                                : ''
                                        }
                                        value={formValues.taxCode}
                                        onBlur={checkDuplicateTaxes}
                                    />
                                    <TextField
                                        sx={{
                                            width: { sm: 200, md: 300 },
                                            '& .MuiInputBase-root': {
                                                height: 40
                                            }
                                        }}
                                        label={taxDescription}
                                        className="required"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        disabled={mode == 'VIEW'}
                                        type="text"
                                        variant="outlined"
                                        id="taxDescription"
                                        name="taxDescription"
                                        onChange={handleInputChange}
                                        error={error && formValues.taxDescription.length === 0}
                                        helperText={error && formValues.taxDescription.length === 0 ? 'Required Field' : ''}
                                        value={formValues.taxDescription}
                                    />
                                    <TextField
                                        label={percentage}
                                        sx={{
                                            width: { sm: 200, md: 300 },
                                            '& .MuiInputBase-root': {
                                                height: 40
                                            }
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        disabled={mode == 'VIEW'}
                                        id="percentage"
                                        name="percentage"
                                        type="number"
                                        onChange={handleInputChange}
                                        error={error && formValues.percentage.length === 0}
                                        helperText={error && formValues.percentage.length === 0 ? 'Required Field' : ''}
                                        value={formValues.percentage}
                                    />
                                    <FormGroup>
                                        <FormControlLabel
                                            name="status"
                                            onChange={handleInputChange}
                                            value={formValues.status}
                                            control={<Switch />}
                                            label="Status"
                                            checked={formValues.status}
                                            disabled={mode == 'VIEW'}
                                        />
                                        {/* <FormControlLabel
                      disabled
                      control={<Switch />}
                      label="Disabled"
                    /> */}
                                    </FormGroup>
                                </Grid>

                                {mode === 'VIEW' ? (
                                    <Grid container item xs={6} direction="column">
                                        <CreatedUpdatedUserDetails formValues={formValues} />
                                    </Grid>
                                ) : null}
                            </Grid>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {mode != 'VIEW' ? (
                            <Button className="btnSave" variant="contained" type="submit">
                                {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                            </Button>
                        ) : (
                            ''
                        )}
                        {mode != 'VIEW' ? (
                            <Button variant="outlined" type="button" onClick={handleCancle}>
                                CLEAR
                            </Button>
                        ) : (
                            ''
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default Tax;
