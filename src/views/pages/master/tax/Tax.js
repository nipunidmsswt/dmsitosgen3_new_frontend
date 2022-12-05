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
import { saveTaxData } from 'store/actions/masterActions/TaxActions/TaxAction';
// import {
//     getTaxDataById,
//     saveTaxData,
//     updateTaxData,
//     checkDuplicateTaxCode,
//     taxDuplicateError
// } from '../../../redux/actions/masterActions/TaxActions/TaxAction';
// import CreatedUpdatedUserDetailsWithTableFormat from "../../../components/CreatedUpdatedUserDetailsWithTableFormat";
// import CreatedUpdatedUserDetails from "../../../components/CreatedUpdatedUserDetails";

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
    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (formValues.taxCode.length == 0 || formValues.taxDescription.length == 0 || formValues.percentage.length == 0) {
            setError(true);
        } else {
            if (mode === 'INSERT') {
                dispatch(saveTaxData(formValues));
            } else if (mode === 'VIEW_UPDATE') {
                console.log('yes click');
                // dispatch(updateTaxData(formValues));
            }

            handleClose();
        }
    };
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
                            <Grid container direction="column" gap={'20px'} justifyContent="center" alignContent="center">
                                <Grid item>
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
                                        // error={(error && formValues.taxCode.length === 0) || duplicateError}
                                        // helperText={
                                        //     error && formValues.taxCode.length === 0
                                        //         ? 'Required Field'
                                        //         : '' || duplicateError
                                        //         ? 'Tax Code already exists'
                                        //         : ''
                                        // }
                                        value={formValues.taxCode}
                                        // onBlur={checkDuplicateTaxes}
                                    />
                                </Grid>
                                <Grid item>
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
                                </Grid>

                                <Grid item>
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
                                </Grid>

                                <Grid item>
                                    {/* <Typography variant="subtitle1" component="h2">
                  Active
                </Typography> */}
                                    {/* <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="status"
                        onChange={handleInputChange}
                        value={formValues.status}
                        checked={formValues.status}
                      />
                    }
                  />
                </FormGroup> */}
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
                                    </FormGroup>
                                </Grid>
                            </Grid>

                            <br></br>
                            {/* <Grid>{mode === 'VIEW' ? <CreatedUpdatedUserDetails formValues={formValues} /> : null}</Grid> */}
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
                            <Button className="btnClear" variant="contained" type="button" onClick={handleCancle}>
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
