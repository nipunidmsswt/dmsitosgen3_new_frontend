import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Grid, FormGroup, FormControlLabel, Switch, Autocomplete, TextField, Button, Stack } from '@mui/material';

const ProgramHeader = () => {
    const headerInitialValues = {
        location: null,
        locationDes: '',
        expenseTypes: null,
        expenseDes: '',
        status: true
    };

    const [activeLocationList, setActiveLocationList] = useState([]);

    const handleSubmit = async (values) => {
        console.log(values);
    };

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={headerInitialValues}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values);
                    resetForm('');
                }}
                // validationSchema={validationSchema1}
            >
                {({ values, handleChange, setFieldValue, errors, handleBlur, touched, resetForm }) => {
                    return (
                        <Form>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="Programme No"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="Version"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="Programme Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="Reference"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.location}
                                    name="location"
                                    onChange={(_, value) => {
                                        setFieldValue(`location`, value);
                                        if (value != null) {
                                            setFieldValue(`locationDes`, value.shortDescription);
                                        } else {
                                            setFieldValue(`locationDes`, '');
                                        }
                                    }}
                                    fullWidth
                                    options={activeLocationList}
                                    getOptionLabel={(option) => `${option.code}`}
                                    isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Type"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="location"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location ? errors.location : ''}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    value={values.location}
                                    name="location"
                                    onChange={(_, value) => {
                                        setFieldValue(`location`, value);
                                        if (value != null) {
                                            setFieldValue(`locationDes`, value.shortDescription);
                                        } else {
                                            setFieldValue(`locationDes`, '');
                                        }
                                    }}
                                    fullWidth
                                    options={activeLocationList}
                                    getOptionLabel={(option) => `${option.code}`}
                                    isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Category"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="location"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location ? errors.location : ''}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <Autocomplete
                                    value={values.location}
                                    name="location"
                                    onChange={(_, value) => {
                                        setFieldValue(`location`, value);
                                        if (value != null) {
                                            setFieldValue(`locationDes`, value.shortDescription);
                                        } else {
                                            setFieldValue(`locationDes`, '');
                                        }
                                    }}
                                    fullWidth
                                    options={activeLocationList}
                                    getOptionLabel={(option) => `${option.code}`}
                                    isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Type"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="location"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location ? errors.location : ''}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    value={values.location}
                                    name="location"
                                    onChange={(_, value) => {
                                        setFieldValue(`location`, value);
                                        if (value != null) {
                                            setFieldValue(`locationDes`, value.shortDescription);
                                        } else {
                                            setFieldValue(`locationDes`, '');
                                        }
                                    }}
                                    fullWidth
                                    options={activeLocationList}
                                    getOptionLabel={(option) => `${option.code}`}
                                    isOptionEqualToValue={(option, value) => option.location_id === value.location_id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tour Type"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            fullWidth
                                            sx={{
                                                '& .MuiInputBase-root': {
                                                    height: 40
                                                }
                                            }}
                                            // disabled={mode == 'VIEW'}
                                            variant="outlined"
                                            name="location"
                                            onBlur={handleBlur}
                                            error={Boolean(touched.location && errors.location)}
                                            helperText={touched.location && errors.location ? errors.location : ''}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            height: 40
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    color="secondary"
                                    label="First Name"
                                    fullWidth
                                    value={values.locationDes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.locationDes && errors.locationDes)}
                                    helperText={touched.locationDes && errors.locationDes ? errors.locationDes : ''}
                                />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ProgramHeader;
