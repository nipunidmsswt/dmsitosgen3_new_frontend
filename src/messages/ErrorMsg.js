import React from 'react';
import Alert from '@mui/material/Alert';
import './message.scss';
import Snackbar from '@mui/material/Snackbar';

function Error({ openToast, handleToast, mode }) {
    return (
        <div>
            <Snackbar
                open={openToast}
                autoHideDuration={4000}
                onClose={handleToast}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                <Alert onClose={handleToast} severity="error" sx={{ width: '100%' }}>
                    {mode === 'INSERT' ? 'INSERT UNSUCCESSFULL' : 'UPDATE UNSUCCESSFULLL'}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Error;
