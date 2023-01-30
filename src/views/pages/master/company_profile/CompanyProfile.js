import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    FormControlLabel,
    Box,
    Paper,
    DialogContent,
    TextField,
    DialogTitle,
    FormGroup,
    Button,
    MenuItem,
    Switch
} from '@mui/material';
// material-ui
import { alpha, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    saveCompanyProfileData,
    getCompanyProfileDataById,
    updateCompanyProfileData,
    checkDuplicateCompanyProfileCode
} from '../../../../store/actions/masterActions/CompanyProfileAction';

import { Formik, Form, ErrorMessage } from 'formik';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';
import { useDropzone } from 'react-dropzone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { isString } from 'lodash';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// const DropZoneStyle = styled('div')(({ theme }) => ({
//     // width: 64,
//     // height: 64,
//     // fontSize: 24,
//     // display: 'flex',
//     // cursor: 'pointer',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // margin: theme.spacing(0.5),
//     // borderRadius: theme.shape.borderRadius,
//     // '&:hover': { opacity: 0.72 }
// }));

const styleIT = {
    width: 64,
    height: 64,
    fontSize: 24,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: theme.spacing(0.5),
    // borderRadius: theme.shape.borderRadius,
    '&:hover': { opacity: 0.72 }
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #000',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function Previews(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            acceptedFiles.map((file, index) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    acceptedFiles[index].base64 = event.target.result;
                };
                reader.onerror = (error) => {
                    // Handle error here
                };
                reader.readAsDataURL(file);
            });

            props.setFieldValue('files', [...props.files, ...acceptedFiles]);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={img} alt="img" />
            </div>
        </div>
    ));

    useEffect(
        () => () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
            <div {...getRootProps()} style={{ border: '1px solid #000', padding: '1rem' }}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}

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
        files: '',
        avatars: [],
        docPath: ''
    };

    const [loadValues, setLoadValues] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [updatePreviewImages, setupdatePreviewImages] = useState([]);

    yup.addMethod(yup.string, 'checkDuplicateCompanyName', function (message) {
        return this.test('checkDuplicateCompanyName', message, async function validateValue(value) {
            if (mode === 'INSERT') {
                try {
                    console.log('sjhgchs');
                    await dispatch(checkDuplicateCompanyProfileCode(value));

                    if (duplicatecompanyProfileGroup != null && duplicatecompanyProfileGroup.errorMessages.length != 0) {
                        return false;
                    } else {
                        return true;
                    }
                    return false;
                } catch (error) {}
            }
            return true;
        });
    });
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object().shape({
        companyName: yup.string().required('Required field').checkDuplicateCompanyName('Duplicate Code'),
        version: yup.string().required('Required field'),
        address: yup.string().required('Required field'),
        email: yup.string().required('Required field').email(),
        phone: yup.string().required('Required field').matches(phoneRegExp, 'Phone number is not valid'),
        website: yup.string().required('Required field'),
        allocatedLicenceCount: yup.number().required('Required field').positive('Must be greater than zero')
    });

    //get data from reducers
    const duplicatecompanyProfileGroup = useSelector((state) => state.companyProfileReducer.duplicatecompanyProfileGroup);
    console.log(duplicatecompanyProfileGroup);
    const companyProfileToUpdate = useSelector((state) => state.companyProfileReducer.companyProfileToUpdate);

    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getCompanyProfileDataById(code));
        }
    }, [mode]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && companyProfileToUpdate != null) || (mode === 'VIEW' && companyProfileToUpdate != null)) {
            setLoadValues(companyProfileToUpdate);
            setupdatePreviewImages([companyProfileToUpdate.docPath]);
        }
    }, [companyProfileToUpdate]);

    const handleSubmitForm = (data) => {
        console.log(data);
        console.log(files);
        if (mode === 'INSERT') {
            dispatch(saveCompanyProfileData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateCompanyProfileData(data));
        }
        handleClose();
    };

    const [files, setFiles] = useState([]);

    const handleRemove = (file) => {
        const filteredItems = files.filter((_file) => _file !== file);
        setFiles(filteredItems);
    };

    // function preview2(props) {
    //     const handleDrop = useCallback(
    //         (acceptedFiles) => {
    //             setFiles(
    //                 acceptedFiles.map((file) => {
    //                     const reader = new FileReader();

    //                     reader.onabort = () => console.log('file reading was aborted');
    //                     reader.onerror = () => console.log('file reading has failed');
    //                     reader.onload = () => {
    //                         const binaryStr = reader.result;
    //                         console.log(binaryStr);
    //                     };
    //                     reader.readAsArrayBuffer(file);

    //                     console.log(reader);
    //                     return Object.assign(file, {
    //                         preview: URL.createObjectURL(file)
    //                     });
    //                 })
    //             );
    //             props.setFieldValue(
    //                 'files',
    //                 acceptedFiles.map((file) => {
    //                     const reader = new FileReader();

    //                     reader.onabort = () => console.log('file reading was aborted');
    //                     reader.onerror = () => console.log('file reading has failed');
    //                     reader.onload = () => {
    //                         const binaryStr = reader.result;
    //                         console.log(binaryStr);
    //                     };
    //                     reader.readAsArrayBuffer(file);

    //                     console.log(reader);
    //                     return Object.assign(file, {
    //                         preview: URL.createObjectURL(file)
    //                     });
    //                 })
    //             );
    //         },
    //         [setFiles]
    //     );

    //     const { getRootProps, getInputProps, isDragActive } = useDropzone({
    //         onDrop: handleDrop
    //     });
    // }
    const showImages = (event) => {
        let images = [];
        console.log(event);
        for (let i = 0; i < event.target.files.length; i++) {
            // console.log(event.target.files[i])
            images.push(URL.createObjectURL(event.target.files[i]));
        }

        setPreviewImages(images);
        setupdatePreviewImages([]);
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
                                                        disabled={mode == 'VIEW_UPDATE'}
                                                        label="Company Name"
                                                        name="companyName"
                                                        onChange={(e) => {
                                                            console.log(e.target.value);
                                                            setFieldValue('companyName', e.target.value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        value={values.companyName}
                                                        error={Boolean(touched.companyName && errors.companyName)}
                                                        helperText={touched.companyName && errors.companyName ? errors.companyName : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={3} hidden={mode == 'INSERT' ? true : false}>
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
                                                        disabled={true}
                                                        label="Company Id"
                                                        name="companyId"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.companyId}
                                                        error={Boolean(touched.companyId && errors.companyId)}
                                                        helperText={touched.companyId && errors.companyId ? errors.companyId : ''}
                                                    ></TextField>
                                                </Grid>
                                                <Grid item xs={mode == 'INSERT' ? 4 : 3}>
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
                                                        disabled={true}
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
                                                        onChange={(e) => {
                                                            setFieldValue('availableLicenceCount', e.target.value);
                                                            setFieldValue(`allocatedLicenceCount`, e.target.value);
                                                        }}
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
                                                            showImages(event);
                                                            handleChange;
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
                                                                            key={i + 'ke'}
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
                                                {/* <Grid item xs={12}>
                                                    <Previews setFieldValue={setFieldValue} files={values.files} />
                                                    <ErrorMessage style={{ color: 'red' }} component="p" name="files" />
                                                </Grid> */}
                                                {/* <Grid item xs={12}>
                                                    <>
                                                        {files.map((file) => {
                                                            const { name, preview } = file;
                                                            const key = isString(file) ? file : name;

                                                            return (
                                                                <Box
                                                                    key={key}
                                                                    sx={{
                                                                        p: 0,
                                                                        m: 0.5,
                                                                        width: 64,
                                                                        height: 64,
                                                                        borderRadius: 0.25,
                                                                        overflow: 'hidden',
                                                                        position: 'relative'
                                                                    }}
                                                                >
                                                                    <Paper
                                                                        variant="outlined"
                                                                        component="img"
                                                                        src={isString(file) ? file : preview}
                                                                        sx={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            objectFit: 'cover',
                                                                            position: 'absolute',
                                                                            borderRadius: 1
                                                                        }}
                                                                    />
                                                                    <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => handleRemove(file)}
                                                                            sx={{
                                                                                p: '1px',
                                                                                color: 'common.white',
                                                                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                                                                                '&:hover': {
                                                                                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                                                                                }
                                                                            }}
                                                                        >
                                                                            <CancelIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                </Box>
                                                            );
                                                        })}

                                                        <div
                                                            className="styleIT"
                                                            {...getRootProps()}
                                                            sx={{
                                                                ...(isDragActive && { opacity: 0.72 })
                                                            }}
                                                        >
                                                            <input {...getInputProps()} />

                                                            <Button variant="outlined" size="large" sx={{ p: 2.25 }}>
                                                                <AddRoundedIcon />
                                                            </Button>
                                                        </div>
                                                    </>
                                                </Grid> */}
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
