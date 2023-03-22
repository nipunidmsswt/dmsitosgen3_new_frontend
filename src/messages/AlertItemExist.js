import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogActions, DialogTitle, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export default function AlertItemExist({ title, open, handleClose }) {
    return (
        <Dialog
            open={true}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            fullWidth
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <>
                    <DialogTitle id="item-delete-title" style={{ fontSize: '15px', color: 'red', fontWeight: 'bold' }}>
                        Already Exist !!
                    </DialogTitle>
                    <Box position="absolute" top={0} right={0}>
                        <IconButton onClick={() => handleClose(true)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <DialogActions sx={{ mr: 2 }}>
                        {/* <Button onClick={() => handleClose(false)} color="error">
                            OK
                        </Button> */}
                        <Button variant="contained" size="small" onClick={() => handleClose(true)}>
                            OK
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

AlertItemExist.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
};
