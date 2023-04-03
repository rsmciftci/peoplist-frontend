import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';

function UpdateCandidate(props) {

  const [] = React.useState('');
 

  const [open, setOpen] = React.useState(false);

  const [scroll, setScroll] = React.useState('body');

  const [post, setPost] = React.useState('');

  const [name, setName] = React.useState(props.candidate.name);
  const [surname, setSurname] = React.useState(props.candidate.surname);
  const [phoneNumber, setPhoneNumber] = React.useState(props.candidate.phoneNumber);
  const [email, setEmail] = React.useState(props.candidate.email);
  const [status, setStatus] = React.useState(props.candidate.status);

  

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

 

  const candidateToUpdate = {

    id : props.candidate.id,
    name : name ,
    surname : surname,
    phoneNumber : phoneNumber,
    email : email,    
    status :  status

    }

    const baseURL = "http://localhost:8080/candidate/";

    function saveCandidate(){
        
      axios
      .put(baseURL, candidateToUpdate)
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
      
      <Button align="center" variant="outlined" onClick={() => {setOpen(true)}}>Update</Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Update Candidate</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField id="surname" label="Surname" variant="outlined" value={surname} onChange={(e) => setSurname(e.target.value)} />
      <TextField id="phoneNumber" label="Phone Number" variant="outlined" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="SOURCED">SOURCED</MenuItem>
          <MenuItem value="INTERVIEWING">INTERVIEWING</MenuItem>
          <MenuItem value="OFFER_SENT">OFFER_SENT</MenuItem>
          <MenuItem value="HIRED">HIRED</MenuItem>
        </Select>
      </FormControl>
     
      

    </Box>

    <Box sx={{
        '& > :not(style)': { m: 3, width: '56ch' },
      }}>
    
    
    </Box>



        
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => saveCandidate()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateCandidate;