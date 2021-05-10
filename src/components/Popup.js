import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

export default function Popup(props){
    return( <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.diagTitle}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.diagText}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose} color="primary">
                OK
            </Button>
            </DialogActions>
        </Dialog>)
}