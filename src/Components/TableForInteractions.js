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
import axios from 'axios';
import AlertToDeleteInteraction from './AlertToDeleteInteraction';
import UpdateCandidate from './UpdateCandidate';
import UpdateInteraction from './UpdateInteraction';


function Row(props) {


    const { row } = props;
    const [open, setOpen] = React.useState(false);

    function returnIfCandidateResponded(candidateResponded){

      if(candidateResponded){
        return "YES";
      } else {
        return "NO";
      }


    }

    function convertDateToDDYYMMM(date){
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);
  
      return day + "/" + month + "/" + year;
    }



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
          {row.type}
        </TableCell>
        <TableCell align="left">{row.content}</TableCell>
        <TableCell align="left">{convertDateToDDYYMMM(row.date)}</TableCell>
        <TableCell  align="left">{returnIfCandidateResponded(row.candidateResponded)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>

                <Stack sx={{ m:2, ml:22}} spacing={2} direction="row"> 
                      <> 
                        <UpdateInteraction interaction={row} candidateId={props.candidateId} />                       
                        <AlertToDeleteInteraction id={row.id}/>                     
                      </>
                </Stack>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



function TableForInteractions(props) {


    const [interactions, setInteraction] = React.useState([]);

    const getInteractionsURL = () => {
        const url = "http://localhost:8080/candidate-interactions/find-by-candidate-id/" + props.candidateId;
        return url;
    };

    React.useEffect(() => {
        axios.get(getInteractionsURL())
        .then( res => setInteraction(res.data)).catch(err => console.log(err))
      }, []);

   

    



  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
          

            <TableCell />            
            
            
            
            <>
            <TableCell sx={{ fontWeight: 'bold'  }} >Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }} align="left">Content</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }}  align="left">Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold'  }}  align="left">Candidate Responded?</TableCell>  
            </>           
            

           

         


            
          </TableRow>
        </TableHead>
        <TableBody>


          <>
            { interactions.map((interaction) => (
            <Row key={interaction.id} row={interaction} candidateId={props.candidateId} />
          ))}
          </>

       
          

        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableForInteractions;