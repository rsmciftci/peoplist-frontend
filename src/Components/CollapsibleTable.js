import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Stack } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';
import UpdateCandidate from './UpdateCandidate';
import AlertDialogToDelete from './AlertDialogToDelete';
import AddInteraction from './AddInteraction';


function Row(props) {


    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const candidate = {
        id: row.id  ,
        name: row.name ,
        surname: row.surname ,
        phoneNumber: row.phoneNumber,
        email: row.email ,
        status: row.status 
    }

    const interactionPath  = "../../../../interactions/candidateId/" + row.id;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => { setOpen(!open);}}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name + " "   + row.surname}
        </TableCell>
        <TableCell align="left">{row.phoneNumber}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>

                <Stack sx={{ m:2, ml:19}} spacing={2} direction="row">                  
                    
                   
                      <>
                        <UpdateCandidate  candidate={row}/> 
                        <AlertDialogToDelete id={row.id}/> 
                        <AddInteraction id={row.id}/> 
                        <Button href={interactionPath} align="center" variant="outlined">Show Interactions</Button>       
                      </>
                    
                  

                     
                </Stack>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



function CollapsibleTable(props) {

    const [candidates, setCandidates] = React.useState([]);

    const [interactions, setInteraction] = React.useState([]);

    const getMatchingCandidatesUrl = () => {
        const url = "http://localhost:8080/candidate/name/"+ props.name + "/surname/" + props.surname;
        return url;
    };

    React.useEffect(() => {
        axios.get(getMatchingCandidatesUrl())
        .then( res => setCandidates(res.data)).catch(err => console.log(err))
      }, []);

   

    



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
          

            <TableCell />            
            
            
            
            <>
            <TableCell sx={{ fontWeight: 'bold'  }} >Full Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }} align="left">Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }}  align="left">Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }}  align="left">Status</TableCell>  
            </>           
            

           

         


            
          </TableRow>
        </TableHead>
        <TableBody>


          <>
            { candidates.map((candidates) => (
            <Row key={candidates.name} row={candidates} />
          ))}
          </>

       
          

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;