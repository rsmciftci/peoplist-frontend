import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import { DatePicker, LocalizationProvider, trTR } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

function AddCandidate() {

const [] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [post, setPost] = React.useState('');


  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [type, setType] = React.useState('');
  const [content, setContent] = React.useState('');
  const [date, setDate] = React.useState(dayjs());
  const [candidateResponded, setCandidateResponded] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

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


  function changeDateFormat(localdate){
    let day = localdate.slice(0, 2);
    let month = localdate.slice(3, 5);
    let year = localdate.slice(6, 10);

    return year + "-" + month + "-" + day;
  }


  const candidateToSave = {
    name : name ,
    surname : surname,
    phoneNumber : phoneNumber,
    email : email,
    type  : type,
    content : content,
    date : date,
    candidateResponded : candidateResponded ,
    status :  status

    }

    const baseURL = "http://localhost:8080/candidate/";

    function saveCandidate(){
        
        axios
      .post(baseURL, candidateToSave)
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
      <ListItem key="Add Candidate" disablePadding onClick={handleClickOpen('body')}>
              <ListItemButton>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText  primary="Add Candidate" />
              </ListItemButton>
            </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Add Candidate</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '26ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
      <TextField id="surname" label="Surname" variant="outlined" onChange={(e) => setSurname(e.target.value)} />
      <TextField id="phoneNumber" label="Phone Number" variant="outlined" onChange={(e) => setPhoneNumber(e.target.value)} />
      <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
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

      <TextField id="date" label="Date" placeholder='DD/MM/YYYY' variant="outlined" onChange={(e) => {setDate(changeDateFormat(e.target.value));}} />

      <Box sx={{
        '& > :not(style)': { m: 0, width: '56ch' },
      }}>
    <TextField fullWidth={true} id="content" label="Content" variant="outlined" multiline maxRows={10} onChange={(e) => setContent(e.target.value)}/>
    
    </Box>
    
      
       

    </Box>

    
    


        
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => saveCandidate() }>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCandidate;