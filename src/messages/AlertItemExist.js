import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export default function AlertItemExist({ title, open, handleClose }) {
    return (
        <Dialog
            open={true}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <>
                    <DialogTitle id="item-delete-title">Already Exist</DialogTitle>
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
