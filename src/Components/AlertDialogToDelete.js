import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function AlertDialogToDelete(props) {
  const [open, setOpen] = React.useState(false);

  const [post, setPost] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const baseURL = "http://localhost:8080/candidate/delete-by-id/" + props.id;

    function deleteCandidate(){
        
      axios
      .delete(baseURL)
      .then((response) => {
        setPost(response.data);
        setPost(response);
        handleClose();
        window.location.reload();
      }) .catch(function (error) {
        alert("Something went wrong!");
       console.log(error.response.status);
      });     
    }

  return (
    <div>

      <Button align="center"  variant="outlined" onClick={handleClickOpen}>
      Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting Candidate"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete the candidate ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => {deleteCandidate()}} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogToDelete;