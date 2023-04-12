import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { Button, makeStyles, Card, CardContent, Divider } from '@material-ui/core';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { style } from '@mui/system';
import SuccessMsg from 'messages/SuccessMsg';
import ErrorMsg from 'messages/ErrorMsg';
import ProgramTransport from './ProgramTransport';

const useStyles = makeStyles((theme) => ({
    content: {
        justifyContent: 'center'
    },
    formControl: {
        minWidth: 120,
        marginBottom: theme.spacing(2)
    },
    button: {
        marginTop: theme.spacing(0),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        padding: '-1px 0px',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#000',
        height: '30px'
    },
    roundbutton: {
        borderRadius: '50%',
        margin: '2px 9px',
        width: '1px',
        height: '30px',
        minWidth: '0px',
        minHeight: '0px',
        fontSize: '10px',
        display: 'inline-flex'
    },
    card: {
        maxWidth: '100%',
        padding: '0px 5px',
        margin: '0 auto'
    },
    buttonArray: {
        maxWidth: '100%',
        padding: '0px 0px',
        margin: '50px 0',
        textAlign: 'left'
    },
    activeButton: {
        backgroundColor: 'purple'
    },
    popUpButton: {
        margin: '0px 0x',
        padding: '0px 0px',
        height: '40px',
        display: 'inline-flex',
        position: 'absolute',
        width: '152px',
        textTransform: 'capitalize',
        fontSize: '13px'
    },
    setButton: {
        margin: '0px 10px',
        height: '30px',
        display: 'inline-flex',
        position: 'absolute',
        textTransform: 'capitalize'
    },
    dayText: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: '20px',
        display: 'inline-flex',
        position: 'absolute',
        left: '5%'
    },
    iconButton: {
        position: 'absolute',
        right: '2%',
        width: 23,
        height: 23,
        '&:hover': {
            color: theme.palette.common.black
        }
    }
}));

function ProgramCreationDetails() {
    const [numButtons, setNumButtons] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [buttonTexts, setButtonTexts] = useState([]);
    const [activebuttonColor, setActiveButtonColor] = useState('#1877f2');
    const [prebuttonColor, setPreButtonColor] = useState('white');
    const [setStatus, setSetStatus] = useState(false);
    const [openTransport, setOpenTransport] = useState(false);
    const [openAccomodation, setOpenAccomodation] = useState(false);
    const [openActivites, setOpenActivites] = useState(false);
    const [openSupplements, setOpenSupplements] = useState(false);
    const [openMiscellaneous, setOpenMiscellaneous] = useState(false);
    const [openToast, setHandleToast] = useState(false);
    const [openErrorToast, setOpenErrorToast] = useState(false);
    const [mode, setMode] = useState('INSERT');
    const classes = useStyles();

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            setNumButtons(0);
        }
    };

    const handleNumButtonsChange = (event) => {
        event.preventDefault();
        const newValue = parseInt(event.target.value);
        if (newValue >= 0 && newValue <= 60) {
            setNumButtons(newValue);
        }
        console.log(numButtons);
    };

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const handleSetButtonChange = (event) => {
        event.preventDefault();
        setSetStatus(true);
    };

    const validationSchema = Yup.object().shape({
        ...Array(numButtons)
            .fill()
            .reduce((acc, _, i) => {
                acc[`input-${i}`] = Yup.string().required('This field is required');
                return acc;
            }, {})
    });

    const validate = (values) => {
        const errors = {};
        if (values.number > 60) {
            errors.number = 'The maximum you can enter is 60';
        }
        return errors;
    };

    const handleClickOpen = (type, category, data) => {
        if (type === 'VIEW_UPDATE') {
            setMode(type);
        } else if (type === 'INSERT') {
            setMode(type);
        } else {
            setMode(type);
        }

        if (category === 'Transport') {
            setOpenTransport(true);
        } else if (category === 'Accomodation') {
            setOpenAccomodation(true);
        } else if (category === 'Activities') {
            setOpenActivites(true);
        } else if (category === 'Supplements') {
            setOpenActivites(true);
        } else {
            setOpenMiscellaneous(true);
        }
    };

    const handleClose = () => {
        setOpenTransport(false);
        setOpenAccomodation(false);
        setOpenActivites(false);
        setOpenActivites(false);
        setOpenMiscellaneous(false);
    };

    const handleToast = () => {
        setHandleToast(false);
    };
    const handleErrorToast = () => {
        setOpenErrorToast(false);
    };

    const buttonArray = [];
    for (let i = 0; i < numButtons; i++) {
        if (setStatus === true) {
            buttonArray.push(
                <Button
                    className={classes.roundbutton}
                    key={i}
                    onClick={() => handleButtonClick(i)}
                    variant="contained"
                    style={{
                        backgroundColor: activeButton === i ? activebuttonColor : 'white',
                        color: activeButton === i ? 'white' : 'black'
                    }}
                >
                    {i + 1}
                </Button>
            );
        }
    }

    const formArray = [];
    for (let i = 0; i < numButtons; i++) {
        formArray.push(
            <Formik initialValues={{}} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <form key={i} style={{ display: activeButton === i ? 'block' : 'none' }}>
                        <Grid>
                            <div>
                                <Typography variant="h4" className={classes.dayText}>
                                    Day {i + 1}
                                </Typography>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '19%' }}
                                >
                                    Transport
                                    <AddCircleIcon
                                        className={classes.iconButton}
                                        onClick={() => handleClickOpen('INSERT', 'Transport', null)}
                                    />
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '39%' }}
                                >
                                    Accomodation
                                    <AddCircleIcon
                                        className={classes.iconButton}
                                        onClick={() => handleClickOpen('INSERT', 'Accomodation', null)}
                                    />
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '59%' }}
                                >
                                    Activites
                                    <AddCircleIcon
                                        className={classes.iconButton}
                                        onClick={() => handleClickOpen('INSERT', 'Activites', null)}
                                    />
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '79%' }}
                                >
                                    Supplements
                                    <AddCircleIcon
                                        className={classes.iconButton}
                                        onClick={() => handleClickOpen('INSERT', 'Supplements', null)}
                                    />
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '79%', marginTop: '60px' }}
                                >
                                    Miscellaneous
                                    <AddCircleIcon
                                        className={classes.iconButton}
                                        onClick={() => handleClickOpen('INSERT', 'Miscellaneous', null)}
                                    />
                                </Button>

                                {/* <label htmlFor={`input-${i}`}>Day {i + 1}</label>
                                 <Field
                                    id={`input-${i}`}
                                    name={`input-${i}`}
                                    value={buttonTexts[i]}
                                    //  onChange={(event) =>
                                    //    handleButtonTextChange(i, event)
                                    //  }
                                /> */}
                                {errors[`input-${activeButton}`] && touched[`input-${activeButton}`] ? (
                                    <div>
                                        {errors[`input-${activeButton}`]}
                                        {setActiveButtonColor('red')}
                                        {setPreButtonColor('red')}
                                    </div>
                                ) : !errors[`input-${activeButton}`] && touched[`input-${activeButton}`] ? (
                                    <div>
                                        {setActiveButtonColor('green')}
                                        {setPreButtonColor('green')}
                                    </div>
                                ) : !errors[`input-${activeButton}`] && !touched[`input-${activeButton}`] ? (
                                    <div>
                                        {setActiveButtonColor('#1877f2')}
                                        {setPreButtonColor('#1877f2')}
                                    </div>
                                ) : null}
                            </div>
                            <br />
                            {openTransport ? <ProgramTransport open={openTransport} handleClose={handleClose} mode={mode} /> : ''}
                            {openToast ? <SuccessMsg openToast={openToast} handleToast={handleToast} mode={mode} /> : null}
                            {openErrorToast ? <ErrorMsg openToast={openErrorToast} handleToast={setOpenErrorToast} mode={mode} /> : null}
                        </Grid>
                    </form>
                )}
            </Formik>
        );
    }

    return (
        <div>
            <MainCard>
                <Formik initialValues={{}} validate={validate}>
                    {({ errors, touched }) => (
                        <form>
                            <Grid xs={12} sm={10} item alignContent="left">
                                <br />
                                <label htmlFor="num-buttons">Number of Days:</label>
                                <Field
                                    type="number"
                                    id="num-buttons"
                                    value={numButtons}
                                    onChange={handleNumButtonsChange}
                                    onKeyDown={handleKeyDown}
                                    variant="outlined"
                                    style={{
                                        width: '10%',
                                        height: '30px',
                                        padding: '0px 2px',
                                        margin: '0px 2px'
                                    }}
                                    min={0}
                                    max={60}
                                    required
                                />
                                {/* <ErrorMessage name="number" /> */}
                                <Button
                                    className={`btnSave ${classes.setButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={handleSetButtonChange}
                                >
                                    Set
                                </Button>
                                <Button
                                    className={`btnSave ${classes.setButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: '19%', right: '2%' }}
                                    onClick={handleClickOpen}
                                >
                                    Guide
                                </Button>
                                <Button
                                    className={`btnSave ${classes.setButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: '19%', right: '22%', marginTop: '40px' }}
                                >
                                    Program Summary
                                </Button>
                                <Button
                                    className={`btnSave ${classes.setButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: '19%', right: '2%', marginTop: '40px' }}
                                >
                                    Costing
                                </Button>
                            </Grid>
                            <div className={classes.buttonArray}>{buttonArray}</div>
                            <Divider style={{ color: 'black', height: '2px' }} />
                            <br />
                            <br />
                            <div>{formArray}</div>
                            <br />
                            <br />
                            <br />
                            <div>
                                <ul style={{ textAlign: 'left' }}>
                                    {buttonTexts.map((data, index) => (
                                        <li key={index}>
                                            {' '}
                                            Day {index + 1} Activites : {data}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <br />
                        </form>
                    )}
                </Formik>
            </MainCard>
        </div>
    );
}

export default ProgramCreationDetails;
