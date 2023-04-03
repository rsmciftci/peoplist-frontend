import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, InputLabel, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';

import SearchIcon from '@mui/icons-material/Search';

function FindCandidate() {

const [] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [post, setPost] = React.useState('');


  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');

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

  function showValues(){
    console.log(

        {
            name: name,
            surname : surname
           
        }
    );
  }

  const candidateToSave = {
    name : name ,
    surname : surname

    }

    const baseURL = "http://localhost:8080/candidate/";

    function findCandidate(){
        
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
      <ListItem key="Find Candidate" disablePadding onClick={handleClickOpen('body')}>
              <ListItemButton>
                <ListItemIcon>
                <SearchIcon />
                </ListItemIcon>
                <ListItemText  primary="Find Candidate" />
              </ListItemButton>
            </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Find Candidate</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>

        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
      <TextField id="surname" label="Surname" variant="outlined" onChange={(e) => setSurname(e.target.value)} />
    </Box>



        
       
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button href={ (name && surname) ? "/candidate/name/"+ name + "/surname/" + surname : ""} >Find</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FindCandidate;