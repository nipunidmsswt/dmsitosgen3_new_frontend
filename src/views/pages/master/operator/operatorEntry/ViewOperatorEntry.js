import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Grid } from '@mui/material';
const ViewOperatorEntry = () => {
    return (
        <div>
            {' '}
            <MainCard title="Operator Entry">
                {/* <div style={{ textAlign: 'right' }}> Last Modified Date : {lastModifiedTimeDate}</div> */}
                <br />
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        {/* </SubCard> */}
                    </Grid>
                </Grid>
            </MainCard>
        </div>
    );
};

export default ViewOperatorEntry;
