import { useEffect, forwardRef, useState, Fragment } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog,
    Slide,
    Box,
    DialogContent,
    TextField,
    DialogTitle,
    Checkbox,
    Button,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Formik, Form, FieldArray } from 'formik';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import * as yup from 'yup';
import { getCodeAndNameDataByCode, saveCodeAndNameData, updateCodeAndNameData } from 'store/actions/masterActions/CodeAndNameAction';
import CreatedUpdatedUserDetailsWithTableFormat from '../userTimeDetails/CreatedUpdatedUserDetailsWithTableFormat';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CodeAndName({ open, handleClose, mode, ccode }) {
    const initialValues1 = {
        codeType: '',
        codeAndNameDetails: [
            {
                code: '',
                name: '',
                status: true
            }
        ]
    };

    const [loadValues, setLoadValues] = useState(null);
    yup.addMethod(yup.array, 'uniqueCode', function (message) {
        return this.test('uniqueCode', message, function (list) {
            const mapper = (x) => {
                return x.code;
            };
            const set = [...new Set(list.map(mapper))];
            const isUnique = list.length === set.length;
            if (isUnique) {
                return true;
            }

            const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
            return this.createError({
                path: `codeAndNameDetails[${idx}].code`,
                message: message
            });
        });
    });

    const validationSchema = yup.object().shape({
        codeType: yup.string().required('Required field'),

        codeAndNameDetails: yup
            .array()
            .of(
                yup.object().shape({
                    code: yup.string().required('Required field'),
                    // .checkDuplicateCode("Code Already Exist"),
                    name: yup.string().required('Required field'),
                    status: yup.boolean()
                })
            )
            // .uniqueCodeAndNameCode("Must be unique"),
            .uniqueCode('Code Already Exist')
    });

    //get data from reducers
    const duplicateCodeType = useSelector((state) => state.codeAndNameReducer.duplicateCodeType);
    const codeToUpdate = useSelector((state) => state.codeAndNameReducer.codeToUpdate);
    const duplicateCode = useSelector((state) => state.codeAndNameReducer.duplicateCode);

    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === 'VIEW_UPDATE' || mode === 'VIEW') {
            dispatch(getCodeAndNameDataByCode(ccode));
        }
    }, [mode]);

    useEffect(() => {
        if ((mode === 'VIEW_UPDATE' && codeToUpdate != null) || (mode === 'VIEW' && codeToUpdate != null)) {
            setLoadValues(codeToUpdate);
        }
    }, [codeToUpdate]);

    const handleSubmitForm = (data) => {
        if (mode === 'INSERT') {
            dispatch(saveCodeAndNameData(data));
        } else if (mode === 'VIEW_UPDATE') {
            dispatch(updateCodeAndNameData(data));
        }
        handleClose();
    };

    return (
        <div>
            <Dialog
                PaperProps={{
                    style: { borderRadius: 15 }
                }}
                maxWidth="220px"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                disableBackdropClick
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Box display="flex" className="dialog-title">
                        <Box flexGrow={1}>
                            {mode === 'INSERT' ? 'Add' : ''} {mode === 'VIEW_UPDATE' ? 'Update ' : ''} {mode === 'VIEW' ? 'View ' : ''}Code
                            & Name
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
                                                initialValues={loadValues || initialValues1}
                                                onSubmit={(values) => {
                                                    handleSubmitForm(values);
                                                }}
                                                validationSchema={validationSchema}
                                            >
                                                {({ values, handleChange, setFieldValue, errors, handleBlur, touched }) => {
                                                    return (
                                                        <Form>
                                                            <div style={{ marginTop: '6px', margin: '10px' }}>
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
                                                                            disabled={mode == 'VIEW_UPDATE' || mode == 'VIEW'}
                                                                            id="standard-select-currency"
                                                                            select
                                                                            label="Code Type"
                                                                            name="codeType"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            value={values.codeType}
                                                                            error={Boolean(touched.codeType && errors.codeType)}
                                                                            helperText={
                                                                                touched.codeType && errors.codeType ? errors.codeType : ''
                                                                            }
                                                                        >
                                                                            <MenuItem dense={true} value={'Airline'}>
                                                                                Airline
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'Cluster'}>
                                                                                Cluster
                                                                            </MenuItem>
                                                                            <MenuItem dense={true} value={'Operator'}>
                                                                                Operator
                                                                            </MenuItem>
                                                                        </TextField>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>

                                                            <FieldArray name="codeAndNameDetails">
                                                                {({ insert, remove, push }) => (
                                                                    <Paper>
                                                                        {mode != 'VIEW' ? (
                                                                            <Box display="flex" flexDirection="row-reverse">
                                                                                <IconButton
                                                                                    aria-label="delete"
                                                                                    onClick={() => {
                                                                                        push({
                                                                                            code: '',
                                                                                            name: '',
                                                                                            status: true
                                                                                        });
                                                                                    }}
                                                                                >
                                                                                    {mode === 'INSERT' ? <AddBoxIcon /> : null}
                                                                                </IconButton>
                                                                            </Box>
                                                                        ) : (
                                                                            ''
                                                                        )}

                                                                        <TableContainer>
                                                                            <Table stickyHeader size="small">
                                                                                <TableHead alignItems="center">
                                                                                    <TableRow>
                                                                                        <TableCell>Sequence</TableCell>
                                                                                        <TableCell>Code </TableCell>
                                                                                        <TableCell>Description</TableCell>
                                                                                        <TableCell>Status</TableCell>
                                                                                        <TableCell>Actions</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {values.codeAndNameDetails.map((record, idx) => {
                                                                                        return (
                                                                                            <TableRow key={idx} hover>
                                                                                                <TableCell>{idx + 1}</TableCell>
                                                                                                <TableCell>
                                                                                                    <TextField
                                                                                                        sx={{
                                                                                                            width: { sm: 200 },
                                                                                                            '& .MuiInputBase-root': {
                                                                                                                height: 40
                                                                                                            }
                                                                                                        }}
                                                                                                        disabled={
                                                                                                            mode == 'VIEW_UPDATE' ||
                                                                                                            mode == 'VIEW'
                                                                                                        }
                                                                                                        //   type="number"
                                                                                                        variant="outlined"
                                                                                                        // placeholder="code"
                                                                                                        // validate={checkDuplicateCodeForCodeAndName}

                                                                                                        name={`codeAndNameDetails.${idx}.code`}
                                                                                                        value={
                                                                                                            values.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.codeAndNameDetails[idx]
                                                                                                                .code
                                                                                                        }
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        error={Boolean(
                                                                                                            touched.codeAndNameDetails &&
                                                                                                                touched.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                touched.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ].code &&
                                                                                                                errors.codeAndNameDetails &&
                                                                                                                errors.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                errors.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ].code
                                                                                                        )}
                                                                                                        helperText={
                                                                                                            touched.codeAndNameDetails &&
                                                                                                            touched.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            touched.codeAndNameDetails[idx]
                                                                                                                .code &&
                                                                                                            errors.codeAndNameDetails &&
                                                                                                            errors.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            errors.codeAndNameDetails[idx]
                                                                                                                .code
                                                                                                                ? errors.codeAndNameDetails[
                                                                                                                      idx
                                                                                                                  ].code
                                                                                                                : ''
                                                                                                        }
                                                                                                    />
                                                                                                </TableCell>

                                                                                                <TableCell>
                                                                                                    <TextField
                                                                                                        sx={{
                                                                                                            width: { sm: 200 },
                                                                                                            '& .MuiInputBase-root': {
                                                                                                                height: 40
                                                                                                            }
                                                                                                        }}
                                                                                                        //   type="number"
                                                                                                        variant="outlined"
                                                                                                        // placeholder="name"
                                                                                                        name={`codeAndNameDetails.${idx}.name`}
                                                                                                        value={
                                                                                                            values.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.codeAndNameDetails[idx]
                                                                                                                .name
                                                                                                        }
                                                                                                        disabled={mode == 'VIEW'}
                                                                                                        onChange={handleChange}
                                                                                                        onBlur={handleBlur}
                                                                                                        error={Boolean(
                                                                                                            touched.codeAndNameDetails &&
                                                                                                                touched.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                touched.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ].name &&
                                                                                                                errors.codeAndNameDetails &&
                                                                                                                errors.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ] &&
                                                                                                                errors.codeAndNameDetails[
                                                                                                                    idx
                                                                                                                ].name
                                                                                                        )}
                                                                                                        helperText={
                                                                                                            touched.codeAndNameDetails &&
                                                                                                            touched.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            touched.codeAndNameDetails[idx]
                                                                                                                .name &&
                                                                                                            errors.codeAndNameDetails &&
                                                                                                            errors.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            errors.codeAndNameDetails[idx]
                                                                                                                .name
                                                                                                                ? errors.codeAndNameDetails[
                                                                                                                      idx
                                                                                                                  ].name
                                                                                                                : ''
                                                                                                        }
                                                                                                    />
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <Checkbox
                                                                                                        onChange={handleChange}
                                                                                                        name={`codeAndNameDetails.${idx}.status`}
                                                                                                        checked={
                                                                                                            values.codeAndNameDetails[
                                                                                                                idx
                                                                                                            ] &&
                                                                                                            values.codeAndNameDetails[idx]
                                                                                                                .status
                                                                                                        }
                                                                                                        disabled={mode == 'VIEW'}
                                                                                                    ></Checkbox>
                                                                                                </TableCell>

                                                                                                <TableCell>
                                                                                                    <IconButton
                                                                                                        aria-label="delete"
                                                                                                        onClick={() => {
                                                                                                            remove(idx);
                                                                                                        }}
                                                                                                    >
                                                                                                        <HighlightOffIcon />
                                                                                                    </IconButton>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        );
                                                                                    })}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </Paper>
                                                                )}
                                                            </FieldArray>

                                                            <br />
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
                                                                        variant="outlined"
                                                                        type="button"
                                                                        onClick={handleClose}
                                                                        style={{
                                                                            // backgroundColor: '#B22222',
                                                                            marginLeft: '10px'
                                                                        }}
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

export default CodeAndName;
