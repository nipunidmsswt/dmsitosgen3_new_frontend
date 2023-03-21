import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function ExitAlert({ title, open, handleClose }) {
    const navigate = useNavigate();
    return (
        <Dialog
            open={true}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="sm"
            fullWidth
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <>
                    <DialogTitle id="item-delete-title">Do you want to continue ?</DialogTitle>

                    <Box position="absolute" top={0} right={0}>
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogActions sx={{ mr: 2 }}>
                        <Button variant="contained" size="small" onClick={() => handleClose(true)}>
                            Yes
                        </Button>
                        <Button
                            onClick={() => {
                                handleClose(false);
                                navigate('/master/hotelview');
                            }}
                            color="error"
                        >
                            NO
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

ExitAlert.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
};
