import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function UpdateInteraction(props) {

  const [] = React.useState('');
 

  const [open, setOpen] = React.useState(false);

  const [scroll, setScroll] = React.useState('body');

  const [post, setPost] = React.useState('');


  const [id,setId] = React.useState(props.interaction.id);
  const [candidateId,setCandidateId] = React.useState(props.candidateId);
  const [type,setType] = React.useState(props.interaction.type);
  const [content,setContent] = React.useState(props.interaction.content);
  const [date,setDate] = React.useState(props.interaction.date);
  const [candidateResponded,setCandidateResponsed] = React.useState(props.interaction.candidateResponded);

  function changeDateFormat(localdate){
    let day = localdate.slice(0, 2);
    let month = localdate.slice(3, 5);
    let year = localdate.slice(6, 10);

    return year + "-" + month + "-" + day;
  }

  function returnYYYYMMDD(year, month,day){
    
    let newMonth = parseInt(month) + 1;

    return year + "-" + returnWith2Digit(newMonth) + "-" + returnWith2Digit(day);
  }

  function convertDateToDDYYMMM(date){
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);

    return day + "/" + month + "/" + year;
  }

  function returnWith2Digit(number){
    if(number < 10){
      return "0" + number;
    } else {
      return number;
    }

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

 

  const interactionToUpdate = {

    id : id,
    candidateId : candidateId,
    type : type ,
    content : content,
    date : date,
    candidateResponded : candidateResponded

    }

    const baseURL = "http://localhost:8080/candidate-interactions/";

    function saveInteraction(){
        
      axios
      .put(baseURL, interactionToUpdate)
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
        <DialogTitle id="scroll-dialog-title">Update Interaction</DialogTitle>
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
        <InputLabel id="demo-simple-select-label2">Interaction Type</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="type"
          label="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="PHONE">PHONE</MenuItem>
          <MenuItem value="EMAIL">EMAIL</MenuItem>
        </Select>
      </FormControl>

      
   
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label1">Candidate Responded?</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="candidateResponded"
          label="CandidateResponded"
          value={candidateResponded}
          onChange={(e) => setCandidateResponsed(e.target.value)}
        >
          <MenuItem value={true}>YES</MenuItem>
          <MenuItem value={false}>NO</MenuItem>
        </Select>
      </FormControl>

      

    </Box>

    <Box sx={{
        '& > :not(style)': { m: 3, width: '56ch' },
      }}>
    <TextField fullWidth={true} id="content" value={content} label="Content" variant="outlined" multiline maxRows={10} onChange={(e) => setContent(e.target.value)}/>
    
    </Box>

    <Box sx={{
        '& > :not(style)': { m: 3, width: '56ch' },
      }}>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
        label="Date"
        value={dayjs(date)}
        onChange={(e) => setDate(returnYYYYMMDD(e.$y, e.$M,e.$D))}  
        />
       
      </DemoContainer>
    </LocalizationProvider>

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

export default UpdateInteraction;