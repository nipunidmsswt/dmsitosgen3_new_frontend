import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { Button, makeStyles, Card, CardContent } from '@material-ui/core';
import { style } from '@mui/system';

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
        margin: '2px 10px',
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
        margin: '5px 0',
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
        width: '150px'
    },
    dayText: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: '20px',
        display: 'inline-flex',
        position: 'absolute',
        left: '5%'
    }
}));

const ViewMainScreen = () => {
    const [numButtons, setNumButtons] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [buttonTexts, setButtonTexts] = useState([]);
    const [activebuttonColor, setActiveButtonColor] = useState('#1877f2');
    const [prebuttonColor, setPreButtonColor] = useState('white');
    const [setStatus, setSetStatus] = useState(false);
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
                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '20%' }}
                                >
                                    Transport
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '40%' }}
                                >
                                    Accomodation
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '60%' }}
                                >
                                    Activites
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '80%' }}
                                >
                                    Supplements
                                </Button>

                                <Button
                                    className={`btnSave ${classes.popUpButton}`}
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ left: '80%', marginTop: '60px' }}
                                >
                                    Miscellaneous
                                </Button>

                                <Typography variant="h4" className={classes.dayText}>
                                    Day {i + 1}
                                </Typography>

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
                        </Grid>
                    </form>
                )}
            </Formik>
        );
    }

    return (
        <div>
            <MainCard title="Programm Creation">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Accordion square>
                                    <AccordionSummary
                                        style={{ background: 'linear-gradient(to right bottom, #516a9f, #1877f2)' }}
                                        // sx={{
                                        //     backgroundColor: '#1877f2'
                                        // }}
                                        classes={{ content: classes.content }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white'
                                            }}
                                        >
                                            Programm Header Creation
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <form>
                                            <Grid xs={12} sm={10} item alignContent="left">
                                                <br />
                                                <label htmlFor="num-buttons">Number of Days:</label>
                                                <input
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
                                                <Button
                                                    className="btnSave"
                                                    variant="contained"
                                                    color="primary"
                                                    type="button"
                                                    style={{
                                                        margin: '0px 10px',
                                                        height: '30px',
                                                        display: 'inline-flex'
                                                    }}
                                                    onClick={handleSetButtonChange}
                                                >
                                                    Set
                                                </Button>
                                            </Grid>

                                            <div className={classes.buttonArray}>{buttonArray}</div>
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
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion square>
                                    <AccordionSummary
                                        style={{ background: 'linear-gradient(to right bottom, #516a9f, #1877f2)' }}
                                        // sx={{
                                        //     backgroundColor: '#1877f2'
                                        // }}
                                        classes={{ content: classes.content }}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white'
                                            }}
                                        >
                                            Programm Details
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails></AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default ViewMainScreen;
