import React from 'react';
import { TextField, Typography, Grid } from '@mui/material';

function CreatedUpdatedUserDetails({ formValues, mode }) {
    return (
        <div>
            <Grid container direction="column" gap={'20px'} justifyContent="center" alignContent="center">
                {/* <Grid item>
          <Typography
            variant="subtitle1"
            component="h2"
            hidden={mode == "VIEW" ? false : true}
          >
            Created Date
          </Typography>
        </Grid> */}
                <Grid item>
                    <TextField
                        disabled
                        className="txt"
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Created Date"
                        sx={{
                            width: { sm: 200, md: 300 },
                            '& .MuiInputBase-root': {
                                height: 40
                            }
                        }}
                        type="text"
                        value={formValues.createdDate}
                    />
                </Grid>

                {/* <Grid item>
          <Typography
            variant="subtitle1"
            component="h2"
            hidden={mode == "VIEW" ? false : true}
          >
            Created User
          </Typography>
        </Grid> */}

                <Grid item>
                    <TextField
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Created User"
                        sx={{
                            width: { sm: 200, md: 300 },
                            '& .MuiInputBase-root': {
                                height: 40
                            }
                        }}
                        type="text"
                        value={formValues.createdBy}
                    />
                </Grid>
                {/* <Grid item>
          <Typography
            variant="subtitle1"
            component="h2"
            hidden={mode == "VIEW" ? false : true}
          >
            Updated Date
          </Typography>
        </Grid> */}

                <Grid item>
                    <TextField
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Updated Date"
                        sx={{
                            width: { sm: 200, md: 300 },
                            '& .MuiInputBase-root': {
                                height: 40
                            }
                        }}
                        type="text"
                        value={formValues.updatedDate}
                    />
                </Grid>

                {/* <Grid item>
          <Typography
            variant="subtitle1"
            component="h2"
            hidden={mode == "VIEW" ? false : true}
          >
            Updated User
          </Typography>
        </Grid> */}
                <Grid item>
                    <TextField
                        disabled
                        InputLabelProps={{
                            shrink: true
                        }}
                        label="Updated Date"
                        sx={{
                            width: { sm: 200, md: 300 },
                            '& .MuiInputBase-root': {
                                height: 40
                            }
                        }}
                        type="text"
                        value={formValues.updatedBy}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CreatedUpdatedUserDetails;
