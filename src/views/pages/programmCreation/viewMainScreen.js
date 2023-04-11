import { Accordion, AccordionDetails, AccordionSummary, ButtonGroup, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import MainCard from 'ui-component/cards/MainCard';
import { Button, makeStyles, Card, CardContent } from '@material-ui/core';
import { style } from '@mui/system';
import ProgramCreationDetails from './ProgramCreationDetails';

const useStyles = makeStyles((theme) => ({
    content: {
        justifyContent: 'center'
    }
}));

const ViewMainScreen = () => {
    const classes = useStyles();
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
                                    <AccordionDetails></AccordionDetails>
                                </Accordion>

                                <Accordion square>
                                    <AccordionSummary
                                        style={{
                                            background: 'linear-gradient(to right bottom, #516a9f, #1877f2)'
                                        }}
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
                                    <AccordionDetails>
                                        <ProgramCreationDetails></ProgramCreationDetails>
                                    </AccordionDetails>
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
