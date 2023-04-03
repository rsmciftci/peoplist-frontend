import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

function AddInteraction(props) {

const [] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('body');

  const [post, setPost] = React.useState('');

  const [type, setType] = React.useState('');
  const [content, setContent] = React.useState('');
  const [date, setDate] = React.useState('');
  const [candidateResponded, setCandidateResponded] = React.useState('');
  const [status, setStatus] = React.useState(''); 

  function changeDateFormat(localdate){
    let day = localdate.slice(0, 2);
    let month = localdate.slice(3, 5);
    let year = localdate.slice(6, 10);

    return year + "-" + month + "-" + day;
  }

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



  const interactionToSave = {  
    candidateId : props.id,
    type  : type,
    content : content,
    date : date,
    candidateResponded : candidateResponded ,
    status :  status

    }

    const baseURL = "http://localhost:8080/candidate-interactions/";

    function saveInteraction(){
        
        axios
      .post(baseURL, interactionToSave)
      .then((response) => {
        setPost(response.data);
        setPost(response);
        handleClose();
      }) .catch(function (error) {
        alert("Something went wrong!");
       console.log(error.response.status);
      });     
    }

  return (
    <div>    
      

            <Button align="center" variant="outlined" onClick={() => {setOpen(true)}}>Add Interaction</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Interaction</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
     
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Interaction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="type"
          label="Interaction Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="PHONE">PHONE</MenuItem>
          <MenuItem value="EMAIL">EMAIL</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="status"
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="SOURCED">SOURCED</MenuItem>
          <MenuItem value="INTERVIEWING">INTERVIEWING</MenuItem>
          <MenuItem value="OFFER_SENT">OFFER_SENT</MenuItem>
          <MenuItem value="HIRED">HIRED</MenuItem>
        </Select>
      </FormControl>
      <TextField  id="date" label="Date" variant="outlined" placeholder='DD/MM/YYYY' onChange={(e) => setDate(changeDateFormat(e.target.value))}/>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2">Candidate Responded?</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="candidateResponded"
          label="candidateResponded"
          onChange={(e) => setCandidateResponded(e.target.value)}
        >
          <MenuItem value="TRUE">YES</MenuItem>
          <MenuItem value="FALSE">NO</MenuItem>
        </Select>
      </FormControl>   
       

    </Box>

    <Box sx={{
        '& > :not(style)': { m: 3, width: '56ch' },
      }}>
    <TextField fullWidth={true} rows="5" id="content" label="Content" variant="outlined" multiline maxRows={10} onChange={(e) => setContent(e.target.value)}/>
    
    </Box>



        
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => saveInteraction()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddInteraction;