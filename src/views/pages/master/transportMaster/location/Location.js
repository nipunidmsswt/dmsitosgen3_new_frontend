import { useEffect, forwardRef, useState, Fragment, useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';

import {
    Dialog,
    Slide,
    FormControlLabel,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Checkbox,
    Button,
    Typography,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { saveLocationData, updateLocationData } from 'store/actions/masterActions/LocationAction';

import { Formik, Form, FieldArray, useFormikContext } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';

import provinceDistricts from 'srilankan-provinces-districts';
import { getAllLocationDetails, getLocationDataById } from 'store/actions/masterActions/LocationAction';
import { Close } from '@mui/icons-material';
import CreatedUpdatedUserDetailsWithTableFormat from '../../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Location({ open, handleClose, mode, locationCode }) {
    const initialValues = {
        code: '',
        name: '',
        shortDescription: '',
        province: '',
        district: '',
        status: true,
        geoName: '',
        website: '',
        narration: '',
        files: undefined,
        previewImages: [],
        progressInfos: [],
        message: []
    };

    const [provinceList, setProvnceList] = useState([]);
    const [districtList, setDistricList] = useState([]);
    const [loadValues, setLoadValues] = useState('');
    const [disableDistrict, setDisableDistrict] = useState(true);
    const [previewImages, setPreviewImages] = useState([]);
    const [updatePreviewImages, setupdatePreviewImages] = useState([]);
    const ref = useRef(null);

    yup.addMethod(yup.string, 'checkDuplicateLocationCode', function (message) {
        return this.test('checkDuplicateLocationCode', 'Duplicate Tax group', async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    // dispatch(checkDuplicateTaxGroupCode(value));

                    if (duplicateLoction != null && duplicateLoction.errorMessages.length != 0) {
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
        code: yup.string().required('Required field'),
        // .checkDuplicateLocationCode("duplicate code"),

        name: yup.string().required('Required field')
    });

    //get data from reducers
    const duplicateLoction = useSelector((state) => state.locationReducer.duplicateLoction);
    const locationToUpdate = useSelector((state) => state.locationReducer.locationToUpdate);

    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            console.log(locationCode);
            setDisableDistrict(false);
            dispatch(getLocationDataById(locationCode));
        }
    }, [mode]);

    useEffect(() => {
        console.log(locationToUpdate);

        if (
            (mode === 'VIEW_UPDATE' && locationToUpdate?.LocationDetails != null) ||
            (mode === 'VIEW' && locationToUpdate?.LocationDetails != null)
        ) {
            console.log(locationToUpdate.LocationDetails);

            if (locationToUpdate?.LocationDetails.province) {
                handleDistricts(locationToUpdate?.LocationDetails.province);
            }
            setLoadValues(locationToUpdate?.LocationDetails);
            // images.push(URL.createObjectURL(event.target.files[i]));
            let images = [];

            setupdatePreviewImages(locationToUpdate?.LocationDetails.docPath);
        }
    }, [locationToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(loadValues);
        console.log(data);
        let formData = new FormData();
        // console.log(data.files);

        if (data.files != undefined) {
            for (let i = 0; i < data.files.length; i++) {
                formData.append(`files`, data.files[i]);
            }
        }

        // if (mode === "VIEW_UPDATE") {
        //   console.log(loadValues.locationImgs);

        //   for (let i = 0; i < loadValues.locationImgs.length; i++) {
        //     console.log(loadValues.locationImgs[i].imageOriginalName);
        //     // const arr = JSON.parse(data.files.locationImgs[i]);
        //     loadValues.locationImgs[i].name =
        //       loadValues.locationImgs[i].imageOriginalName;
        //     delete loadValues.locationImgs[i].imageOriginalName;
        //     // formData.append(`files`, data.files.locationImgs[i]);
        //   }
        // }

        console.log(loadValues.locationImgs);
        // if (loadValues.locationImgs.length !== 0) {
        //   for (let i = 0; i < loadValues.locationImgs.length; i++) {
        //     let output = "",
        //       input = JSON.stringify(loadValues.locationImgs[i]); // convert the json to string.
        //     // loop over the string and convert each charater to binary string.
        //     for (i = 0; i < input.length; i++) {
        //       output += input[i].charCodeAt(0).toString(2) + " ";
        //     }
        //     output.trimEnd();

        //       formData.append(`files`, output);
        //   }
        // }
        // delete data.files;
        // delete data.previewImages;
        // delete data.progressInfos;
        // delete data.message
        for (let [key, val] of Object.entries(data)) {
            console.log(val);
            formData.append(key, val);
        }
        // formData.append("location", JSON.stringify(data));
        if (mode === 'INSERT') {
            const requestOptions = {
                method: 'POST',
                body: formData
            };

            dispatch(saveLocationData(requestOptions));
        } else if (mode === 'VIEW_UPDATE') {
            console.log('yes click');
            const requestOptions = {
                method: 'PUT',
                body: formData
            };

            dispatch(updateLocationData(requestOptions));
        }
        handleClose();
    };

    useEffect(() => {
        console.log('provinces');
        let provinces = provinceDistricts.getProvinces();

        let provinceArray = [];
        for (let province in provinces) {
            provinceArray.push({ name: provinces[province] });
        }
        console.log(provinceArray);
        setProvnceList(provinceArray);
        console.log(provinces);
    }, []);

    const handleDistricts = (data) => {
        let districts = provinceDistricts.getDistricts(data);
        console.log(districts);

        let districtArray = [];
        for (let i in districts) {
            districtArray.push({ name: districts[i] });
        }

        setDistricList(districtArray);
    };
    const showImages = (event) => {
        let images = [];
        console.log(event);
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(event.target.files[i])
            images.push(URL.createObjectURL(event.target.files[i]));
        }

        setPreviewImages(images);
    };

    return (
        <div>
            <Dialog maxWidth="220px" open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} className="dialog-title">
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update' : ''} {mode === 'VIEW' ? 'View' : ''}
                            Location
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
                                                innerRef={ref}
                                                enableReinitialize={true}
                                                initialValues={loadValues || initialValues}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                validationSchema={validationSchema}
                                            >
                                                {({
                                                    values,
                                                    handleChange,
                                                    setFieldValue,

                                                    errors,
                                                    handleBlur,
                                                    touched
                                                }) => {
                                                    return (
                                                        <Form>
                                                            <div style={{ marginTop: '6px', margin: '10px' }}>
                                                                <Grid gap="10px" display="flex" style={{ marginBottom: '10px' }}>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            disabled={mode == 'VIEW_UPDATE'}
                                                                            label="Location Code"
                                                                            name="code"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.code}
                                                                            error={Boolean(touched.code && errors.code)}
                                                                            helperText={touched.code && errors.code ? errors.code : ''}
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            label="Location Name"
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            type="text"
                                                                            variant="outlined"
                                                                            name="name"
                                                                            value={values.name}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            error={Boolean(touched.name && errors.name)}
                                                                            helperText={touched.name && errors.name ? errors.name : ''}
                                                                        />
                                                                    </Grid>
                                                                    <Grid>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="Short Description"
                                                                            name="shortDescription"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.shortDescription}
                                                                            error={Boolean(
                                                                                touched.shortDescription && errors.shortDescription
                                                                            )}
                                                                            helperText={
                                                                                touched.shortDescription && errors.shortDescription
                                                                                    ? errors.shortDescription
                                                                                    : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex">
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="standard-select-currency"
                                                                            select
                                                                            label="Province"
                                                                            name="province"
                                                                            onChange={(event) => {
                                                                                console.log(event);
                                                                                handleDistricts(event.target.value);
                                                                                setFieldValue('province', event.target.value);
                                                                                setFieldValue('district', '');
                                                                                setDisableDistrict(false);
                                                                            }}
                                                                            onBlur={handleBlur}
                                                                            value={values.province}
                                                                            error={Boolean(touched.province && errors.province)}
                                                                            helperText={
                                                                                touched.province && errors.province ? errors.province : ''
                                                                            }
                                                                        >
                                                                            {provinceList.length != 0
                                                                                ? provinceList.map((data, key) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={key}
                                                                                              dense={true}
                                                                                              value={data.name}
                                                                                          >
                                                                                              {data.name}
                                                                                          </MenuItem>
                                                                                      );
                                                                                  })
                                                                                : ''}
                                                                        </TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <TextField
                                                                            /// disabled={disableDistrict}
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            select
                                                                            label="District"
                                                                            name="district"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.district}
                                                                            error={Boolean(touched.district && errors.district)}
                                                                            helperText={
                                                                                touched.district && errors.district ? errors.district : ''
                                                                            }
                                                                        >
                                                                            {districtList.length != 0
                                                                                ? districtList.map((data, key) => {
                                                                                      return (
                                                                                          <MenuItem
                                                                                              key={key}
                                                                                              dense={true}
                                                                                              value={data.name}
                                                                                          >
                                                                                              {data.name}
                                                                                          </MenuItem>
                                                                                      );
                                                                                  })
                                                                                : ''}
                                                                        </TextField>
                                                                    </Grid>
                                                                    <Grid>
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            id="outlined-required"
                                                                            label="GEO Name"
                                                                            name="geoName"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.geoName}
                                                                            error={Boolean(touched.geoName && errors.geoName)}
                                                                            helperText={
                                                                                touched.geoName && errors.geoName ? errors.geoName : ''
                                                                            }
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid gap="10px" display="flex" style={{ marginTop: '10px' }}>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Website"
                                                                            name="website"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.website}
                                                                            error={Boolean(touched.website && errors.website)}
                                                                            helperText={
                                                                                touched.website && errors.website ? errors.website : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        {' '}
                                                                        <TextField
                                                                            sx={{
                                                                                width: { sm: 200, md: 300 },
                                                                                '& .MuiInputBase-root': {
                                                                                    height: 40
                                                                                }
                                                                            }}
                                                                            label="Narration"
                                                                            name="narration"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.narration}
                                                                            error={Boolean(touched.narration && errors.narration)}
                                                                            helperText={
                                                                                touched.narration && errors.narration
                                                                                    ? errors.narration
                                                                                    : ''
                                                                            }
                                                                        ></TextField>
                                                                    </Grid>

                                                                    <Grid item display="flex">
                                                                        <Grid item style={{ paddingTop: '10px' }}>
                                                                            Active
                                                                        </Grid>

                                                                        <Grid item>
                                                                            <FormGroup>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            name="status"
                                                                                            onChange={handleChange}
                                                                                            checked={values.status}
                                                                                            value={values.status}
                                                                                        />
                                                                                    }
                                                                                />
                                                                            </FormGroup>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid display="flex" gap="10px" style={{ marginTop: '20px' }}>
                                                                    <Grid item>
                                                                        <input
                                                                            type="file"
                                                                            multiple
                                                                            accept="image/*"
                                                                            name="files"
                                                                            //  onChange={this.selectFiles}
                                                                            onChange={(event) => {
                                                                                // console.log("file", event.currentTarget.files);
                                                                                showImages(event);
                                                                                setFieldValue('files', event.currentTarget.files);
                                                                            }}
                                                                        />
                                                                        {previewImages && (
                                                                            <div>
                                                                                {previewImages.map((img, i) => {
                                                                                    return (
                                                                                        <div
                                                                                            style={{
                                                                                                display: 'inline-block',
                                                                                                position: 'relative'
                                                                                            }}
                                                                                        >
                                                                                            <img
                                                                                                width="100"
                                                                                                height="100"
                                                                                                style={{
                                                                                                    marginRight: '10px',
                                                                                                    marginTop: '10px'
                                                                                                }}
                                                                                                className="preview"
                                                                                                src={img}
                                                                                                alt={'image-' + i}
                                                                                                key={i}
                                                                                            />
                                                                                            <IconButton aria-label="add an alarm">
                                                                                                <HighlightOffIcon
                                                                                                    key={i}
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        top: -100,
                                                                                                        right: 0,
                                                                                                        width: '25px',
                                                                                                        height: '25px'
                                                                                                        // marginRight: "10px",
                                                                                                    }}
                                                                                                    // src="https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-icon-close-button-png-image_1357822.jpg"
                                                                                                />
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}

                                                                        {updatePreviewImages && (
                                                                            <div>
                                                                                {updatePreviewImages.map((img, i) => {
                                                                                    return (
                                                                                        <img
                                                                                            width="100"
                                                                                            height="100"
                                                                                            style={{
                                                                                                marginRight: '10px',
                                                                                                marginTop: '10px'
                                                                                            }}
                                                                                            src={`data:image/;base64,${img}`}
                                                                                            className="preview"
                                                                                            // src={img}
                                                                                            alt={'image-' + i}
                                                                                            key={i}
                                                                                        />
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </Grid>
                                                                </Grid>
                                                            </div>

                                                            <Box>
                                                                <Grid item>
                                                                    {mode === 'VIEW' ? (
                                                                        <CreatedUpdatedUserDetailsWithTableFormat formValues={values} />
                                                                    ) : null}
                                                                </Grid>
                                                            </Box>
                                                            <Box display="flex" flexDirection="row-reverse" style={{ marginTop: '20px' }}>
                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        type="button"
                                                                        style={{
                                                                            backgroundColor: '#B22222',
                                                                            marginLeft: '10px'
                                                                        }}
                                                                        // onClick={handleCancel}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}

                                                                {mode != 'VIEW' ? (
                                                                    <Button
                                                                        variant="contained"
                                                                        type="submit"
                                                                        style={{
                                                                            backgroundColor: '#00AB55'
                                                                        }}
                                                                    >
                                                                        {mode === 'INSERT' ? 'SAVE' : 'UPDATE'}
                                                                    </Button>
                                                                ) : (
                                                                    ''
                                                                )}
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

export default Location;
